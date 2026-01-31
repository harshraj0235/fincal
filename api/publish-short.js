/**
 * Publish a News Short to GitHub → triggers Cloudflare/Vercel rebuild.
 * POST /api/publish-short
 * Body: { password: "Harson", short: { id, slug, category, headline, ... } }
 *
 * Env (set in Vercel/Cloudflare dashboard):
 *   ADD_SHORTS_PASSWORD - must match body.password (e.g. Harson)
 *   GITHUB_TOKEN - token with repo scope (contents read/write)
 *   GITHUB_REPO - "owner/repo" (e.g. yourusername/fincal-main)
 *   GITHUB_FILE_PATH - optional, default "public/custom-shorts.json"
 */

const DEFAULT_FILE_PATH = 'public/custom-shorts.json';

async function getFile(owner, repo, path, token) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );
  if (res.status === 404) return { content: null, sha: null };
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GitHub get failed: ${res.status} ${t}`);
  }
  const data = await res.json();
  return { content: data.content, sha: data.sha };
}

function decodeBase64(str) {
  try {
    return Buffer.from(str, 'base64').toString('utf8');
  } catch {
    return atob(str);
  }
}

function encodeBase64(str) {
  try {
    return Buffer.from(str, 'utf8').toString('base64');
  } catch {
    return btoa(unescape(encodeURIComponent(str)));
  }
}

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const password = process.env.ADD_SHORTS_PASSWORD || 'Harson';
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const filePath = process.env.GITHUB_FILE_PATH || DEFAULT_FILE_PATH;

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (body.password !== password) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const short = body.short;
  if (!short || !short.headline || !Array.isArray(short.whyItMatters) || !short.whatToDo) {
    return res.status(400).json({ error: 'Missing required short fields: headline, whyItMatters, whatToDo' });
  }

  if (!token || !repo) {
    return res.status(500).json({
      error: 'Server misconfigured: set GITHUB_TOKEN and GITHUB_REPO (owner/repo) in environment',
    });
  }

  const parts = repo.split('/').filter(Boolean);
  const owner = parts[0];
  const repoName = parts[1];
  if (!owner || !repoName) {
    return res.status(500).json({ error: 'GITHUB_REPO must be owner/repo' });
  }

  try {
    const { content: existingContent, sha } = await getFile(owner, repoName, filePath, token);
    let list = [];
    if (existingContent) {
      const raw = decodeBase64(existingContent.replace(/\n/g, ''));
      try {
        list = JSON.parse(raw);
      } catch (e) {
        list = [];
      }
      if (!Array.isArray(list)) list = [];
    }

    const newShort = {
      id: short.id || `custom-${short.category}-${short.slug || Date.now()}-${Date.now()}`,
      slug: short.slug || short.id || String(Date.now()),
      category: short.category || 'economy',
      headline: short.headline,
      whyItMatters: short.whyItMatters,
      keyNumbers: short.keyNumbers,
      whatToDo: short.whatToDo,
      fullStoryLink: short.fullStoryLink || '',
      fullStoryPath: short.fullStoryPath || `/news/${short.category || 'economy'}/${short.slug || 'article'}`,
      datePublished: short.datePublished || new Date().toISOString(),
      readTimeSeconds: short.readTimeSeconds || 45,
      imageUrl: short.imageUrl,
      videoUrl: short.videoUrl,
      authorId: short.authorId,
      source: 'custom',
    };

    list.unshift(newShort);
    const json = JSON.stringify(list, null, 2);
    const encoded = encodeBase64(json);

    const updateRes = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add short: ${newShort.headline.slice(0, 50)}...`,
          content: encoded,
          sha: sha || undefined,
        }),
      }
    );

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      throw new Error(`GitHub PUT failed: ${updateRes.status} ${errText}`);
    }

    return res.status(200).json({
      ok: true,
      message: 'Short published. Deploy will update in 1–2 min.',
      id: newShort.id,
    });
  } catch (err) {
    console.error('publish-short error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to publish short',
    });
  }
}

module.exports = handler;

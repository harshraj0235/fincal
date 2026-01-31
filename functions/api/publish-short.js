/**
 * Cloudflare Pages Function: Publish News Short to GitHub.
 * POST /api/publish-short → updates public/custom-shorts.json in repo, triggers rebuild.
 *
 * Set in Cloudflare Pages → Settings → Environment variables:
 *   ADD_SHORTS_PASSWORD - e.g. Harson
 *   GITHUB_TOKEN - token with repo contents read/write
 *   GITHUB_REPO - owner/repo (e.g. yourusername/fincal-main)
 *   GITHUB_FILE_PATH - optional, default public/custom-shorts.json
 */

const DEFAULT_FILE_PATH = 'public/custom-shorts.json';

async function getFile(owner, repo, path, token) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );
  if (res.status === 404) return { content: null, sha: null };
  if (!res.ok) throw new Error(`GitHub get: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return { content: data.content, sha: data.sha };
}

function decodeBase64(str) {
  const binary = atob(str.replace(/\n/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function encodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const password = env.ADD_SHORTS_PASSWORD || 'Harson';
  const token = env.GITHUB_TOKEN;
  const repo = env.GITHUB_REPO;
  const filePath = env.GITHUB_FILE_PATH || DEFAULT_FILE_PATH;

  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: cors });
  }

  if (body.password !== password) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401, headers: cors });
  }

  const short = body.short;
  if (!short || !short.headline || !Array.isArray(short.whyItMatters) || !short.whatToDo) {
    return new Response(
      JSON.stringify({ error: 'Missing required short fields: headline, whyItMatters, whatToDo' }),
      { status: 400, headers: cors }
    );
  }

  if (!token || !repo) {
    return new Response(
      JSON.stringify({ error: 'Set GITHUB_TOKEN and GITHUB_REPO in Cloudflare env' }),
      { status: 500, headers: cors }
    );
  }

  const parts = repo.split('/').filter(Boolean);
  const owner = parts[0];
  const repoName = parts[1];
  if (!owner || !repoName) {
    return new Response(JSON.stringify({ error: 'GITHUB_REPO must be owner/repo' }), { status: 500, headers: cors });
  }

  try {
    const { content: existingContent, sha } = await getFile(owner, repoName, filePath, token);
    let list = [];
    if (existingContent) {
      try {
        list = JSON.parse(decodeBase64(existingContent));
      } catch {
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
      throw new Error(`GitHub PUT: ${updateRes.status} ${await updateRes.text()}`);
    }

    return new Response(
      JSON.stringify({ ok: true, message: 'Short published. Deploy will update in 1–2 min.', id: newShort.id }),
      { status: 200, headers: cors }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to publish short' }),
      { status: 500, headers: cors }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * Cloudflare Pages Function: Publish News Short to GitHub.
 * POST /api/publish-short → updates public/custom-shorts.json in repo, triggers rebuild.
 * Env: ADD_SHORTS_PASSWORD, GITHUB_TOKEN, GITHUB_REPO, GITHUB_FILE_PATH (optional)
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export async function onRequestPost(context) {
  const { request, env } = context;
  const password = env.ADD_SHORTS_PASSWORD || 'Harson';
  const token = env.GITHUB_TOKEN;
  const repo = env.GITHUB_REPO;
  const filePath = env.GITHUB_FILE_PATH || 'public/custom-shorts.json';

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: CORS });
  }
  if (body.password !== password) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401, headers: CORS });
  }
  const short = body.short;
  if (!short || !short.headline || !Array.isArray(short.whyItMatters) || !short.whatToDo) {
    return new Response(
      JSON.stringify({ error: 'Missing required short fields: headline, whyItMatters, whatToDo' }),
      { status: 400, headers: CORS }
    );
  }
  if (!token || !repo) {
    return new Response(
      JSON.stringify({ error: 'Set GITHUB_TOKEN and GITHUB_REPO in Cloudflare env' }),
      { status: 500, headers: CORS }
    );
  }
  const parts = repo.split('/').filter(Boolean);
  const owner = parts[0];
  const repoName = parts[1];
  if (!owner || !repoName) {
    return new Response(JSON.stringify({ error: 'GITHUB_REPO must be owner/repo' }), { status: 500, headers: CORS });
  }

  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`,
      { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } }
    );
    let list = [];
    let sha = null;
    if (getRes.status === 200) {
      const data = await getRes.json();
      sha = data.sha;
      if (data.content) {
        const raw = atob(data.content.replace(/\n/g, ''));
        const bytes = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
        try {
          const text = new TextDecoder().decode(bytes);
          const parsed = JSON.parse(text);
          list = Array.isArray(parsed) ? parsed : [];
        } catch (_) {
          list = [];
        }
      }
    } else if (getRes.status !== 404) {
      throw new Error(`GitHub get: ${getRes.status} ${await getRes.text()}`);
    }

    const newShort = {
      id: short.id || `custom-${short.category || 'economy'}-${short.slug || Date.now()}-${Date.now()}`,
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
    const encoded = btoa(unescape(encodeURIComponent(json)));

    const putRes = await fetch(
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
    if (!putRes.ok) {
      throw new Error(`GitHub PUT: ${putRes.status} ${await putRes.text()}`);
    }
    return new Response(
      JSON.stringify({ ok: true, message: 'Short published. Deploy will update in 1–2 min.', id: newShort.id }),
      { status: 200, headers: CORS }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to publish short' }),
      { status: 500, headers: CORS }
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

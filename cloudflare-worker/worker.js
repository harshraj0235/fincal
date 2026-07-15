/**
 * MoneyCal AI Proxy — Cloudflare Worker
 * 
 * This worker proxies LLM API requests to OpenRouter so the API key
 * stays server-side and is never exposed in client JavaScript.
 * 
 * SETUP:
 * 1. Install wrangler: npm install -g wrangler
 * 2. Login: wrangler login
 * 3. Set the secret: wrangler secret put OPENROUTER_API_KEY
 *    (paste your sk-or-v1-... key when prompted)
 * 4. Deploy: cd cloudflare-worker && wrangler deploy
 * 
 * The worker will be available at: https://moneycal-ai-proxy.<your-subdomain>.workers.dev
 */

const ALLOWED_ORIGINS = [
  'https://moneycal.in',
  'https://www.moneycal.in',
  'http://localhost:5173',
  'http://localhost:3000',
];

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // Allow POST and GET
    if (request.method !== 'POST' && request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Check origin
    const origin = request.headers.get('Origin') || '';
    if (!ALLOWED_ORIGINS.includes(origin) && !origin.includes('moneycal') && origin !== '') {
      // Allow empty origin for simple GET requests (direct browser visits)
      if (request.method !== 'GET') {
        return new Response('Forbidden', { status: 403 });
      }
    }

    try {
      const url = new URL(request.url);
      
      // ─── KV STORE ROUTES: /chat/:id ───
      if (url.pathname.startsWith('/chat/')) {
        const chatId = url.pathname.replace('/chat/', '');
        if (!chatId) return new Response('Chat ID missing', { status: 400, headers: corsHeaders(origin) });

        if (request.method === 'GET') {
          if (!env.MONEYCAL_CHATS) {
            return new Response(JSON.stringify({ error: 'KV Namespace not configured' }), { status: 500, headers: corsHeaders(origin) });
          }
          const chatData = await env.MONEYCAL_CHATS.get(chatId);
          if (!chatData) {
            return new Response(JSON.stringify({ error: 'Chat not found' }), { status: 404, headers: corsHeaders(origin) });
          }
          return new Response(chatData, {
            status: 200,
            headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
          });
        }

        if (request.method === 'POST') {
          if (!env.MONEYCAL_CHATS) {
            return new Response(JSON.stringify({ error: 'KV Namespace not configured' }), { status: 500, headers: corsHeaders(origin) });
          }
          const body = await request.text();
          // Save to KV (expires in 30 days optionally, but for now keep permanently)
          await env.MONEYCAL_CHATS.put(chatId, body);
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
          });
        }
      }

      // ─── LLM PROXY ROUTE (Fallback for POST) ───
      if (request.method !== 'POST') {
        return new Response('Not found', { status: 404, headers: corsHeaders(origin) });
      }

      const body = await request.json();

      // Validate required fields
      if (!body.messages || !Array.isArray(body.messages)) {
        return new Response(JSON.stringify({ error: 'Invalid request: messages array required' }), {
          status: 400,
          headers: corsHeaders(origin),
        });
      }

      // Forward to OpenRouter with the secret API key
      const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://moneycal.in',
          'X-Title': 'MoneyCal',
        },
        body: JSON.stringify({
          model: body.model || 'meta-llama/llama-4-maverick',
          messages: body.messages,
          stream: body.stream ?? true,
          temperature: body.temperature ?? 0.75,
          top_p: body.top_p ?? 0.95,
        }),
      });

      if (!openRouterResponse.ok) {
        const errText = await openRouterResponse.text();
        return new Response(JSON.stringify({ error: `OpenRouter error: ${openRouterResponse.status}`, details: errText }), {
          status: openRouterResponse.status,
          headers: corsHeaders(origin),
        });
      }

      // Stream the response back to the client
      if (body.stream) {
        return new Response(openRouterResponse.body, {
          status: 200,
          headers: {
            ...corsHeaders(origin),
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }

      // Non-streaming response
      const data = await openRouterResponse.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          ...corsHeaders(origin),
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal server error', message: error.message }), {
        status: 500,
        headers: corsHeaders(origin || '*'),
      });
    }
  },
};

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function handleCORS(request) {
  const origin = request.headers.get('Origin') || '';
  return new Response(null, {
    status: 204,
    headers: corsHeaders(ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]),
  });
}

// api/aiAssistant.js
//
// Vercel Edge Function that proxies AI Assistant requests to Groq's
// OpenAI-compatible chat completions API. The API key never touches
// the browser or the repo — it lives only in Vercel's Environment
// Variables (set in the Vercel dashboard, not committed to git).
//
// Route: this file at /api/aiAssistant.js is automatically served at
// https://your-project.vercel.app/api/aiAssistant — no config needed.

export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPTS = {
  policy: `You are an HR policy drafting assistant for Indian companies. Given a policy topic, write a complete, ready-to-use HR policy document.

Structure every policy with these sections, in this order:
1. Purpose
2. Scope
3. Policy Statement (the core rules)
4. Procedure (numbered, step-by-step)
5. Exceptions
6. Effective Date & Review

Rules:
- Reference relevant Indian labour law/acts by name only where directly relevant (e.g. Maternity Benefit Act, Payment of Gratuity Act) — never invent a specific section number, date, or figure you are not certain of.
- Use "the Company" as the placeholder name, never a specific company name.
- Be concrete (real numbers, timeframes, thresholds) rather than vague ("reasonable time", "as applicable") wherever the topic has a standard convention.
- No filler or restating the request back to the user — start directly with the policy title.`,

  resume: `You are an HR resume and job-match assistant. Given a candidate summary and a target role, evaluate the fit.

Respond in exactly this structure:
- Match Score: X/10, with one sentence justifying the number
- Key Strengths: 3-4 bullets, each tied to something specific in the candidate's background — not generic praise
- Gaps / Improvement Areas: 2-4 bullets, each naming a specific missing skill, certification, or experience
- Bottom Line: one direct sentence — strong fit / possible fit with gaps / weak fit

Be honest even when the assessment isn't flattering. A generically positive review helps no one.`,

  interview: `You are an HR interview question generator. Given a job role and experience level, generate 6-8 interview questions.

Requirements:
- Calibrate difficulty to the stated experience level — a fresher gets fundamentals-focused questions, a senior/leadership hire gets strategic and judgment-based questions.
- Span at least 3 categories: behavioral, role-specific/technical, and strategic or situational. Label the category in brackets before each question, e.g. "[Behavioral]".
- Avoid cliché questions ("greatest weakness?", "where do you see yourself in 5 years?") unless the role specifically calls for them.
- Numbered list, one question per line, no commentary before or after.`,

  laborlaw: `You are an Indian labour law explainer for HR professionals. Given a topic or act name, explain it clearly and precisely.

Rules:
- Cover: what the law requires, who it applies to (employee/employer thresholds), and any calculation formulas or numeric limits relevant to the topic.
- Indian labour law often varies by state (e.g. Shops & Establishments Act, Professional Tax) — say so explicitly when a topic is state-dependent rather than presenting one state's rule as universal.
- If you are not fully certain of a specific figure, threshold, date, or section number, say so explicitly and recommend the user verify against the official government notification. Never state an uncertain number as fact.
- End with a one-line reminder that this is not legal advice and a labour law professional should be consulted for compliance decisions with legal exposure.`,
};

// Lower temperature = more deterministic/factual, higher = more varied phrasing.
const TEMPERATURES = {
  policy: 0.5,
  resume: 0.5,
  interview: 0.8,
  laborlaw: 0.3,
};

// Policy documents run long — 1024 tokens was cutting them off mid-section.
const MAX_TOKENS = {
  policy: 2048,
  resume: 1024,
  interview: 1024,
  laborlaw: 1536,
};

// The frontend renders this reply as plain text, not Markdown — so any
// **bold**, # headers, or ``` fences the model adds show up as literal
// stray characters. This rule is appended to every mode's prompt.
const PLAIN_TEXT_RULE = 'Formatting: respond in plain text only. Do not use Markdown syntax anywhere in your reply — no **bold**, no _italics_, no # headers, no ``` code fences. For structure, put labels like "Purpose:" on their own line in plain capitalized text, and use numbered lines (1. 2. 3.) or a plain "- " dash for lists — never asterisks.';

const ALLOWED_MODES = new Set(Object.keys(SYSTEM_PROMPTS));

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let bodyJson;
  try {
    bodyJson = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { mode, promptInput } = bodyJson || {};

  if (!ALLOWED_MODES.has(mode)) {
    return new Response(JSON.stringify({ error: 'Invalid mode' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!promptInput || typeof promptInput !== 'string' || promptInput.length > 2000) {
    return new Response(
      JSON.stringify({ error: 'promptInput is required and must be under 2000 characters' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    console.error('GROQ_API_KEY environment variable is not set');
    return new Response(
      JSON.stringify({ error: 'Server misconfigured: GROQ_API_KEY is not set' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let upstream;
  try {
    upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: MAX_TOKENS[mode],
        temperature: TEMPERATURES[mode],
        stream: true,
        messages: [
          { role: 'system', content: `${SYSTEM_PROMPTS[mode]}\n\n${PLAIN_TEXT_RULE}` },
          { role: 'user', content: promptInput },
        ],
      }),
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to reach AI provider' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => '');
    console.error('Groq API error:', upstream.status, errText);
    return new Response(JSON.stringify({ error: 'AI provider request failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Re-stream plain text deltas back to the client as they arrive.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop();

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;

            try {
              const event = JSON.parse(data);
              const delta = event.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // ignore malformed SSE chunks
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}

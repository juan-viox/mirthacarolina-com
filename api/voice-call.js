/**
 * /api/voice-call — Vercel serverless proxy
 *
 * Receives webhook calls from the ElevenLabs voice agent (or its
 * `submit_inquiry` client tool) and forwards to the VioX CRM
 * voice-call-ingest endpoint, server-side, so the SITE_API_KEY stays
 * on the server.
 *
 * Required env vars on the Vercel project:
 *   CRM_URL       e.g. https://crm.mirthacarolina.com
 *   SITE_API_KEY
 *
 * Expected request body (from voice-agent client tool or webhook):
 *   {
 *     phone: string,            // required by CRM
 *     callerName?: string,
 *     duration?: number,        // seconds
 *     transcript?: string,      // partial or full
 *     agentId?: string,         // ElevenLabs agent id
 *     summary?: string,         // (optional) short LLM summary
 *     intent?: 'showing'|'question'|'callback'  // (optional)
 *   }
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const CRM_URL = process.env.CRM_URL;
  const SITE_API_KEY = process.env.SITE_API_KEY;

  if (!CRM_URL || !SITE_API_KEY) {
    console.error('[mc/api/voice-call] missing CRM_URL or SITE_API_KEY env');
    res.status(503).json({ error: 'Voice capture is temporarily unavailable.' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const {
      phone = '',
      callerName = '',
      duration,
      transcript = '',
      agentId = '',
      summary = '',
      intent = '',
    } = body;

    if (!phone || !String(phone).trim()) {
      res.status(400).json({ error: 'Phone is required.' });
      return;
    }

    // CRM transcript field has a 500-char display cap — prepend the
    // summary + intent so the CRM activity card stays informative.
    const enrichedTranscript = [
      intent   ? `Intent: ${intent}`   : null,
      summary  ? `Summary: ${summary}` : null,
      transcript ? `Transcript:\n${transcript}` : null,
    ].filter(Boolean).join('\n\n');

    const crmRes = await fetch(`${CRM_URL.replace(/\/$/, '')}/api/v1/ingest/voice-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SITE_API_KEY,
      },
      body: JSON.stringify({
        phone: String(phone).trim(),
        callerName: callerName || undefined,
        duration: duration || undefined,
        transcript: enrichedTranscript || undefined,
        agentId: agentId || undefined,
      }),
    });

    const data = await crmRes.json().catch(() => ({}));

    if (!crmRes.ok) {
      console.error('[mc/api/voice-call] CRM error', crmRes.status, data);
      res.status(502).json({ error: 'Could not record voice activity.' });
      return;
    }

    res.status(200).json({ ok: true, contactId: data.contactId || null });
  } catch (err) {
    console.error('[mc/api/voice-call] exception', err);
    res.status(500).json({ error: 'Could not record voice activity.' });
  }
}

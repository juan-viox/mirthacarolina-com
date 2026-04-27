/**
 * /api/lead — Vercel serverless proxy
 *
 * Forwards inquiry-form submissions from /contact/ to the VioX CRM
 * lead-ingest endpoint, server-side, so the SITE_API_KEY never leaves
 * the server.
 *
 * Required env vars on the Vercel project:
 *   CRM_URL       e.g. https://crm.mirthacarolina.com
 *   SITE_API_KEY  generated in Mirtha's CRM .env (also stored in
 *                 cinematic_sites.api_key in Supabase)
 */

export default async function handler(req, res) {
  // CORS for any cross-origin form posts (defensive — same-origin from
  // mirthacarolina.com is the normal case)
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
    // Don't leak which env var is missing to the client.
    console.error('[mc/api/lead] missing CRM_URL or SITE_API_KEY env');
    res.status(503).json({ error: 'Lead capture is temporarily unavailable.' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const {
      name = '',
      email = '',
      phone = '',
      neighborhood = '',
      listing = '',
      message = '',
      locale = 'en',
    } = body;

    // Basic sanity: at least name + (email OR phone)
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      res.status(400).json({ error: 'Name plus email or phone is required.' });
      return;
    }

    // Split "First Last Multi-Word" → first / last for the CRM schema.
    const trimmed = name.trim().replace(/\s+/g, ' ');
    const parts = trimmed.split(' ');
    const firstName = parts[0] || trimmed;
    const lastName = parts.slice(1).join(' ');

    // Build a structured description that captures the form's extra fields.
    const lines = [];
    if (neighborhood) lines.push(`Preferred neighborhood: ${neighborhood}`);
    if (listing)      lines.push(`Listing of interest: ${listing}`);
    if (message)      lines.push('', message);
    if (locale)       lines.push('', `(submitted via mirthacarolina.com · ${locale.toUpperCase()})`);
    const description = lines.join('\n');

    const crmRes = await fetch(`${CRM_URL.replace(/\/$/, '')}/api/v1/ingest/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SITE_API_KEY,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        emailAddress: email,
        phone,
        description,
      }),
    });

    const data = await crmRes.json().catch(() => ({}));

    if (!crmRes.ok) {
      console.error('[mc/api/lead] CRM error', crmRes.status, data);
      res.status(502).json({ error: 'Could not record inquiry. Please call 201-554-7166.' });
      return;
    }

    res.status(200).json({ ok: true, contactId: data.contactId || null });
  } catch (err) {
    console.error('[mc/api/lead] exception', err);
    res.status(500).json({ error: 'Could not record inquiry. Please call 201-554-7166.' });
  }
}

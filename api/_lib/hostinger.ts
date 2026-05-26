const HOSTINGER_API_BASE = 'https://developers.hostinger.com';
const REACH_CONTACTS_ENDPOINT = '/api/reach/v1/contacts';

interface HostingerContactPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  note?: string;
}

interface HostingerContactResult {
  ok: boolean;
  status?: number;
  error?: string;
}

const E164 = /^\+[1-9]\d{6,14}$/;

function normalizePhone(raw?: string): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  // Already in E.164
  if (E164.test(trimmed)) return trimmed;
  // Strip everything except digits, then assume Colombia (+57) if no country code
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return undefined;
  const candidate = digits.length === 10 ? `+57${digits}` : `+${digits}`;
  return E164.test(candidate) ? candidate : undefined;
}

export async function sendHostingerReachContact(
  payload: HostingerContactPayload,
): Promise<HostingerContactResult> {
  const token = process.env.HOSTINGER_API_TOKEN;

  if (!token) {
    return { ok: false, error: 'Missing HOSTINGER_API_TOKEN' };
  }
  if (!payload.email) {
    return { ok: false, error: 'Missing email' };
  }

  const body: Record<string, string> = { email: payload.email.trim() };
  if (payload.firstName?.trim()) body.name = payload.firstName.trim();
  if (payload.lastName?.trim()) body.surname = payload.lastName.trim();
  const phone = normalizePhone(payload.phone);
  if (phone) body.phone = phone;
  if (payload.note?.trim()) body.note = payload.note.trim().slice(0, 75);

  try {
    const res = await fetch(`${HOSTINGER_API_BASE}${REACH_CONTACTS_ENDPOINT}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { ok: false, status: res.status, error: text };
    }

    return { ok: true, status: res.status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

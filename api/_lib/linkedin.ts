import crypto from 'crypto';

const LINKEDIN_API_BASE = 'https://api.linkedin.com/rest/conversionEvents';
const LINKEDIN_API_VERSION = '202408';

type LinkedInUserId =
  | { idType: 'SHA256_EMAIL'; idValue: string }
  | { idType: 'LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID'; idValue: string }
  | { idType: 'ACXIOM_ID'; idValue: string }
  | { idType: 'ORACLE_MOAT_ID'; idValue: string };

interface LinkedInConversionPayload {
  email?: string;
  firstName?: string;
  lastName?: string;
  liFatId?: string;
  conversionValue?: { currencyCode: string; amount: string };
  happenedAt?: number;
}

interface LinkedInConversionResult {
  ok: boolean;
  status?: number;
  error?: string;
}

const hashSha256 = (value: string): string =>
  crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

export async function sendLinkedInConversion(
  payload: LinkedInConversionPayload,
): Promise<LinkedInConversionResult> {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const conversionId = process.env.LINKEDIN_CONVERSION_ID;

  if (!accessToken || !conversionId) {
    return { ok: false, error: 'Missing LINKEDIN_ACCESS_TOKEN or LINKEDIN_CONVERSION_ID' };
  }

  const userIds: LinkedInUserId[] = [];
  if (payload.email) {
    userIds.push({ idType: 'SHA256_EMAIL', idValue: hashSha256(payload.email) });
  }
  if (payload.liFatId) {
    userIds.push({
      idType: 'LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID',
      idValue: payload.liFatId,
    });
  }

  if (userIds.length === 0) {
    return { ok: false, error: 'No user identifiers (email or li_fat_id) provided' };
  }

  const body = {
    conversion: `urn:lla:llaPartnerConversion:${conversionId}`,
    conversionHappenedAt: payload.happenedAt ?? Date.now(),
    conversionValue: payload.conversionValue ?? { currencyCode: 'USD', amount: '0' },
    user: {
      userIds,
      ...(payload.firstName || payload.lastName
        ? {
            userInfo: {
              ...(payload.firstName ? { firstName: payload.firstName } : {}),
              ...(payload.lastName ? { lastName: payload.lastName } : {}),
            },
          }
        : {}),
    },
  };

  try {
    const res = await fetch(LINKEDIN_API_BASE, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'LinkedIn-Version': LINKEDIN_API_VERSION,
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Type': 'application/json',
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

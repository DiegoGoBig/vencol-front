import { google } from 'googleapis';

export async function appendToSheet(spreadsheetId: string, values: any[], sheetName = 'Sheet1') {
  try {
    const base64Auth = process.env.GOOGLE_SERVICE_ACCOUNT;
    if (!base64Auth) {
      console.error('[Sheets] Missing GOOGLE_SERVICE_ACCOUNT environment variable');
      return { ok: false, error: 'Missing Service Account' };
    }

    const credentials = JSON.parse(Buffer.from(base64Auth, 'base64').toString());

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return { ok: true };
  } catch (error: any) {
    console.error('[Sheets] Error:', error.message || error);
    return { ok: false, error };
  }
}

import { google } from 'googleapis';

export async function appendToSheet(spreadsheetId: string, values: any[]) {
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

    // Default range is Sheet1. We'll try to append.
    // The Service Account must have "Editor" access to the Spreadsheet ID provided.
    let range = 'Sheet1!A1';
    
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [values],
        },
      });
    } catch (err: any) {
      // Fallback for Spanish default sheet name
      if (err.message?.includes('Sheet1')) {
        range = 'Hoja 1!A1';
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [values],
          },
        });
      } else {
        throw err;
      }
    }

    return { ok: true };
  } catch (error: any) {
    console.error('[Sheets] Service Account Error:', error.message || error);
    return { ok: false, error };
  }
}


export async function appendToSheet(spreadsheetId: string, values: any[]) {
  const apiKey = process.env.PAGESPEED_API_KEY || process.env.VITE_PAGESPEED_API_KEY;
  
  if (!apiKey) {
    console.error('[Sheets] Missing Google API Key in environment variables');
    return { ok: false, error: 'Missing API Key' };
  }

  // We use Sheet1!A1 as a starting point. The append logic will find the first empty row.
  // Note: The sheet must be "Anyone with the link can edit" for an API Key to work.
  const range = 'Sheet1!A1'; 
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [values],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Sheets] Google API Error:', JSON.stringify(data));
      
      // If Sheet1 doesn't exist, it might be "Hoja 1"
      if (data.error?.message?.includes('Sheet1')) {
          const fallbackUrl = url.replace('Sheet1', 'Hoja%201');
          const fallbackRes = await fetch(fallbackUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ values: [values] }),
          });
          if (fallbackRes.ok) return { ok: true };
      }
      
      return { ok: false, error: data };
    }

    return { ok: true };
  } catch (error) {
    console.error('[Sheets] Fetch Error:', error);
    return { ok: false, error };
  }
}

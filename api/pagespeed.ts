export default async function handler(req: any, res: any) {
  const { url, strategy } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Falta proveer una URL' });
  }

  // Si no hay key configurada, usará la versión anónima (que arroja 429 fácil), pero no se rompe.
  const apiKey = process.env.PAGESPEED_API_KEY;
  const keyParam = apiKey ? `&key=${apiKey}` : '';
  const fetchUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url as string)}&strategy=${strategy || 'mobile'}${keyParam}`;

  try {
    const apiRes = await fetch(fetchUrl);
    
    if (!apiRes.ok) {
      if (apiRes.status === 429) {
         return res.status(429).json({ error: 'Google API Limit Reached' });
      }
      return res.status(apiRes.status).json({ error: 'Error fetching Google API' });
    }

    const data = await apiRes.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Pagespeed fetching error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

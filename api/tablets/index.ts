import { VercelRequest, VercelResponse } from '@vercel/node';
import { getTabletsHandler, createTabletHandler } from '../../src/integrations/neon/api/tablets';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        const getResponse = await getTabletsHandler();
        res.status(getResponse.status).json(getResponse.body);
        break;
        
      case 'POST':
        const createResponse = await createTabletHandler(req.body);
        res.status(createResponse.status).json(createResponse.body);
        break;
        
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
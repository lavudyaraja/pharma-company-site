import { VercelRequest, VercelResponse } from '@vercel/node';
import { getTabletByIdHandler, updateTabletHandler, deleteTabletHandler } from '../../src/integrations/neon/api/tablets';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        const getResponse = await getTabletByIdHandler(id as string);
        res.status(getResponse.status).json(getResponse.body);
        break;
        
      case 'PUT':
        const updateResponse = await updateTabletHandler(id as string, req.body);
        res.status(updateResponse.status).json(updateResponse.body);
        break;
        
      case 'DELETE':
        const deleteResponse = await deleteTabletHandler(id as string);
        res.status(deleteResponse.status).json(deleteResponse.body);
        break;
        
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
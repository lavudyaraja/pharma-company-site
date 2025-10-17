import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getTabletsHandler, getTabletByIdHandler, createTabletHandler, updateTabletHandler, deleteTabletHandler } from './src/integrations/neon/api/tablets.ts';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/api/tablets', async (req, res) => {
  const { status, body } = await getTabletsHandler();
  res.status(status).json(body);
});

app.get('/api/tablets/:id', async (req, res) => {
  const { id } = req.params;
  const { status, body } = await getTabletByIdHandler(id);
  res.status(status).json(body);
});

app.post('/api/tablets', async (req, res) => {
  const { status, body } = await createTabletHandler(req.body);
  res.status(status).json(body);
});

app.put('/api/tablets/:id', async (req, res) => {
  const { id } = req.params;
  const { status, body } = await updateTabletHandler(id, req.body);
  res.status(status).json(body);
});

app.delete('/api/tablets/:id', async (req, res) => {
  const { id } = req.params;
  const { status, body } = await deleteTabletHandler(id);
  res.status(status).json(body);
});

// --- Static hosting for frontend build ---
// Resolve project root (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the Vite build output from the dist folder
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// Client-side routing fallback: send index.html for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
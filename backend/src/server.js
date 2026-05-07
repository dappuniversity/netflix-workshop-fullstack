import express from 'express';
import cors from 'cors';
import {
  catalog,
  findSeries,
  getFeaturedSeries,
  getGenres,
  getMoreLikeThis,
} from './catalog.js';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// GET /api/catalog — all series
app.get('/api/catalog', (_req, res) => {
  res.json(catalog);
});

// GET /api/catalog/featured — the hero series
// NOTE: must be registered before /api/catalog/:id
app.get('/api/catalog/featured', (_req, res) => {
  res.json(getFeaturedSeries());
});

// GET /api/catalog/genres — unique sorted genres
// NOTE: must be registered before /api/catalog/:id
app.get('/api/catalog/genres', (_req, res) => {
  res.json(getGenres());
});

// GET /api/search?q= — search stub (workshop exercise)
app.get('/api/search', (req, res) => {
  const q = (req.query.q ?? '').toLowerCase();
  if (!q) return res.json(catalog);
  // TODO: implement real search logic (Workshop: full-text search exercise)
  return res.json(catalog);
});

// GET /api/catalog/:id — single series
app.get('/api/catalog/:id', (req, res) => {
  const series = findSeries(req.params.id);
  if (!series) return res.status(404).json({ error: 'Not found' });
  res.json(series);
});

// GET /api/catalog/:id/more-like-this — genre-based recommendations
app.get('/api/catalog/:id/more-like-this', (req, res) => {
  const series = findSeries(req.params.id);
  if (!series) return res.status(404).json({ error: 'Not found' });
  res.json(getMoreLikeThis(series));
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

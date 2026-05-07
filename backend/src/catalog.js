import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const catalog = require('./data/catalog.json');

export const findSeries = (id) => catalog.find((s) => s.id === id) ?? null;

export const getFeaturedSeries = () => findSeries('night-signal') ?? catalog[0];

export const getGenres = () =>
  [...new Set(catalog.flatMap((s) => s.genres))].sort();

export const getSeriesByGenre = (genre) =>
  catalog.filter((s) => s.genres.includes(genre));

export const getMoreLikeThis = (series, limit = 6) => {
  const genreSet = new Set(series.genres);
  return catalog
    .filter((c) => c.id !== series.id)
    .map((c) => ({
      series: c,
      score: c.genres.filter((g) => genreSet.has(g)).length,
    }))
    .sort((a, b) => b.score - a.score || b.series.match - a.series.match)
    .slice(0, limit)
    .map((item) => item.series);
};

export { catalog };

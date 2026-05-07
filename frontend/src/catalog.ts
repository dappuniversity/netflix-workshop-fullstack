import type { Series } from "./types";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export const fetchCatalog = () => get<Series[]>("/api/catalog");

export const fetchFeatured = () => get<Series>("/api/catalog/featured");

export const fetchGenres = () => get<string[]>("/api/catalog/genres");

export const fetchSeries = (id: string) =>
  get<Series>(`/api/catalog/${id}`).catch(() => null);

export const fetchMoreLikeThis = (id: string) =>
  get<Series[]>(`/api/catalog/${id}/more-like-this`);

export const searchCatalog = (q: string) =>
  get<Series[]>(`/api/search?q=${encodeURIComponent(q)}`);

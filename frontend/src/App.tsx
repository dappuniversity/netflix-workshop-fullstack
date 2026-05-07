import { useState, useEffect } from "react";
import { fetchFeatured, fetchCatalog } from "./catalog";
import { Nav } from "./components/Nav";
import { HomePage } from "./pages/HomePage";
import { ShowPage } from "./pages/ShowPage";
import { WatchPage } from "./pages/WatchPage";
import { useRoute } from "./router";
import type { Series } from "./types";

export default function App() {
  const route = useRoute();
  const [featured, setFeatured] = useState<Series | null>(null);
  const [catalog, setCatalog] = useState<Series[]>([]);

  useEffect(() => {
    fetchFeatured().then(setFeatured).catch(console.error);
    fetchCatalog().then(setCatalog).catch(console.error);
  }, []);

  if (route.name === "watch") {
    return <WatchPage id={route.id} />;
  }

  return (
    <div className="app-shell">
      <Nav />
      <main>
        {route.name === "show" ? (
          <ShowPage id={route.id} />
        ) : featured ? (
          <HomePage featured={featured} catalog={catalog} />
        ) : (
          <div className="loading">Loading…</div>
        )}
      </main>
    </div>
  );
}

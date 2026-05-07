export function Nav() {
  return (
    <header className="topbar">
      <a className="brand" href="#/" aria-label="StreamKit home">
        <span className="brand-mark">S</span>
        <span>StreamKit</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#/">Home</a>
        <a href="#/">Series</a>
        <a href="#/">New</a>
      </nav>

      <label className="search-shell">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>
        <input
          aria-label="Search titles"
          placeholder="Search titles"
          title="Workshop TODO: wire this input to filter the catalog"
        />
      </label>
    </header>
  );
}

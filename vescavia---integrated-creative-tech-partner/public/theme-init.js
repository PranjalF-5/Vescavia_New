// Applies the saved theme + colour palette before first paint to avoid a flash.
// Served as an external file so the production CSP can stay free of inline scripts.
(function () {
  var root = document.documentElement;

  // Light / dark (dark is the default)
  try {
    root.classList.toggle('dark', localStorage.getItem('vescavia-theme') !== 'light');
  } catch (e) {
    root.classList.add('dark');
  }

  // Colour palette: ?palette=<id> wins (and is remembered), then the saved choice,
  // otherwise the default already set on <html data-palette>.
  // Keep this list and DEFAULT in sync with content/palettes.ts.
  var PALETTES = ['aurora', 'sunset', 'acid', 'ultraviolet'];
  var DEFAULT = 'aurora';
  var KEY = 'vescavia-palette';
  try {
    var query = new URLSearchParams(location.search).get('palette');
    if (query === 'default') {
      localStorage.removeItem(KEY);
      root.setAttribute('data-palette', DEFAULT);
    } else if (PALETTES.indexOf(query) > -1) {
      localStorage.setItem(KEY, query);
      root.setAttribute('data-palette', query);
    } else {
      var saved = localStorage.getItem(KEY);
      if (PALETTES.indexOf(saved) > -1) root.setAttribute('data-palette', saved);
    }
  } catch (e) {
    /* storage blocked: keep the default palette */
  }
})();

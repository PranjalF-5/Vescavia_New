/**
 * Colour palettes. The actual colour values live in index.css (`[data-palette='…']` blocks);
 * this file only lists the ids so the UI and the pre-paint script stay in sync.
 *
 * Try one without touching code:   /?palette=sunset      (remembered on this browser)
 * Open the on-page picker:         /?lab
 * Return to the default:           /?palette=default
 *
 * To change the site's default, edit DEFAULT_PALETTE here, the `data-palette` attribute on
 * <html> in index.html, and the `:root` block in index.css (the default's colours).
 */
export const palettes = [
  { id: 'aurora', label: 'Aurora', swatch: ['#34F0B8', '#38BDF8', '#FF5FA8'] },
  { id: 'sunset', label: 'Sunset Pop', swatch: ['#FF4F7B', '#FF9A3D', '#FFD23F'] },
  { id: 'acid', label: 'Acid Lime', swatch: ['#C8FF3D', '#00E5FF', '#FF3D9A'] },
  { id: 'ultraviolet', label: 'Ultraviolet', swatch: ['#7C3AED', '#2A45F5', '#C026D3'] },
] as const;

export type PaletteId = (typeof palettes)[number]['id'];

export const DEFAULT_PALETTE: PaletteId = 'aurora';
export const PALETTE_STORAGE_KEY = 'vescavia-palette';

export const isPaletteId = (value: unknown): value is PaletteId =>
  palettes.some((p) => p.id === value);

export const getCurrentPalette = (): PaletteId => {
  const attr = document.documentElement.getAttribute('data-palette');
  return isPaletteId(attr) ? attr : DEFAULT_PALETTE;
};

export const applyPalette = (id: PaletteId): void => {
  document.documentElement.setAttribute('data-palette', id);
  try {
    window.localStorage.setItem(PALETTE_STORAGE_KEY, id);
  } catch {
    /* non-fatal: the choice just won't persist */
  }
};

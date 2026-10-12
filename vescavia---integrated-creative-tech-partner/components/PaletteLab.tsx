import React, { useState } from 'react';
import { applyPalette, getCurrentPalette, palettes, PaletteId } from '../content/palettes';

/**
 * Preview-only colour picker, shown when the URL contains `?lab`.
 * Not rendered for normal visitors. Delete this file and its import in App.tsx to remove it.
 */
const PaletteLab: React.FC = () => {
  const [active, setActive] = useState<PaletteId>(getCurrentPalette);

  const select = (id: PaletteId) => {
    applyPalette(id);
    setActive(id);
  };

  return (
    <div
      role="group"
      aria-label="Colour palette preview"
      className="glass fixed bottom-[5.5rem] left-3 z-[56] flex max-w-[calc(100vw-1.5rem)] flex-wrap gap-1 rounded-3xl p-1.5 sm:bottom-6 sm:left-6"
    >
      {palettes.map((palette) => {
        const isActive = palette.id === active;
        return (
          <button
            key={palette.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => select(palette.id)}
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-black/10 text-black dark:bg-white/15 dark:text-white'
                : 'text-gray-600 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/10'
            }`}
          >
            <span className="flex -space-x-1" aria-hidden="true">
              {palette.swatch.map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="h-3.5 w-3.5 rounded-full ring-2 ring-white/70 dark:ring-black/60"
                />
              ))}
            </span>
            {palette.label}
          </button>
        );
      })}
    </div>
  );
};

export default PaletteLab;

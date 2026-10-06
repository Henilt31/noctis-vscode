import React, { useState, useEffect, useMemo, useCallback } from 'react';

export interface ThemeBadgeProps {
  label: string;
  variant: 'default' | 'crimson' | 'violet' | 'midnight';
  active?: boolean;
  onSelect: (variant: string) => void;
}

export const NoctisVariantSelector: React.FC<ThemeBadgeProps> = ({
  label,
  variant,
  active = false,
  onSelect,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  const badgeColor = useMemo(() => {
    switch (variant) {
      case 'crimson':
        return '#FF5C77';
      case 'violet':
        return '#A855F7';
      case 'midnight':
        return '#708DF5';
      default:
        return '#8B7CFF';
    }
  }, [variant]);

  const handleClick = useCallback(() => {
    setClickCount((prev) => prev + 1);
    onSelect(variant);
  }, [variant, onSelect]);

  useEffect(() => {
    if (active) {
      document.title = `Noctis Theme: ${label} Active`;
    }
  }, [active, label]);

  return (
    <div
      className={`noctis-card ${active ? 'is-active' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered || active ? badgeColor : '#242936',
        backgroundColor: '#101319',
      }}
    >
      <header className="noctis-card-header">
        <span className="dot-indicator" style={{ backgroundColor: badgeColor }} />
        <h3 className="variant-title">{label}</h3>
      </header>

      <p className="description">
        Engineered for extended deep-work sessions with controlled contrast and zero noise.
      </p>

      <footer className="noctis-card-footer">
        <button
          type="button"
          onClick={handleClick}
          className="apply-button"
          disabled={active}
        >
          {active ? 'Active Theme' : `Activate ${label}`}
        </button>
        {clickCount > 0 && <span className="meta-info">Selected {clickCount}x</span>}
      </footer>
    </div>
  );
};

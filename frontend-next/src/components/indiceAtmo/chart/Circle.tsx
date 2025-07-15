import React from "react";

export default function Circle({ value = 0 }: { value: number }) {
  // Couleurs ATMO (à adapter selon votre thème)
  const colors = [
    '',
    '#4FCBAD', // 1
    '#F0E65F', // 2
    '#FFB400', // 3
    '#FF5354', // 4
    '#A83559', // 5
    '#7D237D', // 6
  ];
  const color = value > 0 && value < 7 ? colors[value] : '#e5e7eb';
  const opacity = value > 0 && value < 7 ? 1 : 0;
  // Rotation pour l'effet visuel (optionnel)
  const rotation = 34 * (value - 1);
  return (
    <circle
      cx="7"
      cy="66"
      r="15.6471"
      stroke="#fff"
      strokeWidth="3"
      fill={color}
      opacity={opacity}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: '71px 71.5px',
        transition: value
          ? `transform ${value * 300}ms ${300}ms ease-out, opacity 300ms 300ms ease-out`
          : undefined,
      }}
      data-value={value}
    />
  );
} 
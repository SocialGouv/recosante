import React, { useCallback } from "react";

export default function Chart({ visible, summary, value }) {
  const getStrokeColor = useCallback(
    (index) => {
      if (!visible) return "stroke-disabled";
      if (value < index) return "stroke-disabled";
      if (value < 2) return `stroke-baignades-${value}`;
      if (summary[index] > 0) return `stroke-baignades-${index}`;
      return "stroke-disabled";
    },
    [visible, value, summary]
  );

  return (
    <svg
      className="mx-auto h-12 w-auto overflow-visible"
      aria-hidden={true}
      viewBox="0 0 48 48"
    >
      <path
        style={{
          transition: visible
            ? "opacity 1200ms 900ms, stroke 400ms 900ms"
            : null,
        }}
        className={[
          "fill-none stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          getStrokeColor(2),
        ].join(" ")}
        d="M6 12C10.966 12 14.69 6 14.69 6C14.69 6 18.414 12 23.379 12C28.345 12 33.31 6 33.31 6C33.31 6 38.276 12 42 12"
      />
      <path
        style={{
          transition: visible
            ? "opacity 1200ms 600ms, stroke 400ms 600ms"
            : null,
        }}
        className={[
          "fill-none stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          getStrokeColor(1),
        ].join(" ")}
        d="M6 27C10.966 27 14.69 21 14.69 21C14.69 21 18.414 27 23.379 27C28.345 27 33.31 21 33.31 21C33.31 21 38.276 27 42 27"
      />
      <path
        style={{
          transition: visible
            ? "opacity 1200ms 300ms, stroke 400ms 300ms"
            : null,
        }}
        className={[
          "fill-none stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          getStrokeColor(0),
        ].join(" ")}
        d="M6 42C10.966 42 14.69 36 14.69 36C14.69 36 18.414 42 23.379 42C28.345 42 33.31 36 33.31 36C33.31 36 38.276 42 42 42"
      />
    </svg>
  );
}

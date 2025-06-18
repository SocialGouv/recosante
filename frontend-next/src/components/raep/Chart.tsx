"use client";

import React from "react";

interface ChartProps {
  value?: number;
  visible?: boolean;
}

export default function Chart({ value, visible = true }: ChartProps) {
  return (
    <svg
      className="mx-auto h-12 w-auto overflow-visible"
      aria-hidden={true}
      viewBox="0 0 77 111"
    >
      <circle
        style={{ transition: "opacity 1200ms 600ms, fill 400ms 600ms" }}
        className={visible && value && value > 0 ? `fill-raep-${value}` : "fill-yellow-600/10"}
        cx="23"
        cy="98"
        r="13"
      />
      <circle
        style={{ transition: "opacity 1200ms 900ms, fill 400ms 900ms" }}
        className={visible && value && value > 1 ? `fill-raep-${value}` : "fill-yellow-600/10"}
        cx="50"
        cy="78"
        r="12"
      />
      <circle
        style={{ transition: "opacity 1200ms 1200ms, fill 400ms 1200ms" }}
        className={visible && value && value > 2 ? `fill-raep-${value}` : "fill-yellow-600/10"}
        cx="16.5"
        cy="59.5"
        r="16.5"
      />
      <circle
        style={{ transition: "opacity 1200ms 1500ms, fill 400ms 1500ms" }}
        className={visible && value && value > 3 ? `fill-raep-${value}` : "fill-yellow-600/10"}
        cx="60.5"
        cy="45.5"
        r="16.5"
      />
      <circle
        style={{ transition: "opacity 1200ms 1800ms, fill 400ms 1800ms" }}
        className={visible && value && value > 4 ? `fill-raep-${value}` : "fill-yellow-600/10"}
        cx="25"
        cy="19"
        r="19"
      />
    </svg>
  );
} 
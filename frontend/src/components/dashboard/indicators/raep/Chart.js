import React from "react";

export default function Chart({ value, visible }) {
  return (
    <svg
      className="mx-auto h-12 w-auto overflow-visible"
      aria-hidden={true}
      viewBox="0 0 77 111"
    >
      <circle
        style={{ transition: "opacity 1200ms 600ms, fill 400ms 600ms" }}
        className={visible && value > 0 ? `fill-raep-${value}` : "fill-main/10"}
        index={0}
        cx="23"
        cy="98"
        r="13"
      />
      <circle
        style={{ transition: "opacity 1200ms 900ms, fill 400ms 900ms" }}
        className={visible && value > 1 ? `fill-raep-${value}` : "fill-main/10"}
        index={1}
        cx="50"
        cy="78"
        r="12"
      />
      <circle
        style={{ transition: "opacity 1200ms 1200ms, fill 400ms 1200ms" }}
        className={visible && value > 2 ? `fill-raep-${value}` : "fill-main/10"}
        index={2}
        cx="16.5"
        cy="59.5"
        r="16.5"
      />
      <circle
        style={{ transition: "opacity 1200ms 1500ms, fill 400ms 1500ms" }}
        className={visible && value > 3 ? `fill-raep-${value}` : "fill-main/10"}
        index={3}
        cx="60.5"
        cy="45.5"
        r="16.5"
      />
      <circle
        style={{ transition: "opacity 1200ms 1800ms, fill 400ms 1800ms" }}
        className={visible && value > 4 ? `fill-raep-${value}` : "fill-main/10"}
        cx="25"
        cy="19"
        r="19"
      />
    </svg>
  );
}

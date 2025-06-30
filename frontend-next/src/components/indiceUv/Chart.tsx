"use client";

import React from "react";

interface ChartProps {
  value?: number;
}

const maxValue = 11;

export default function Chart({ value = 0 }: ChartProps) {
  const normalizedValue = Math.min(value, maxValue);
  
  return (
    <svg
      className="h-16 w-auto -rotate-90 overflow-visible"
      aria-hidden={true}
      viewBox="0 0 48 48"
    >
      <circle cx="24" cy="24" r="12" className="fill-orange-600/10" />
      <circle
        className={[`stroke-indiceuv-${normalizedValue}`, "stroke-[12]"].join(" ")}
        style={{
          strokeDashoffset: 2 * Math.PI * 6 * (1 - normalizedValue / maxValue),
          strokeDasharray: 2 * Math.PI * 6,
          strokeWidth: 2 * 6,
          transition: `stroke-dashoffset ${normalizedValue > 0 ? 3 : 0}s ease-in-out`,
        }}
        cx="24"
        cy="24"
        r="6"
        fill="none"
      />
      <path // 4
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 3
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M15.6553 38.4141L13.0001 43.0529"
      />
      <path // 10
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 9
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M35 4.94727L32.3448 9.58602"
      />
      <path // 5
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 4
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M9.58691 32.3447L4.94815 34.9999"
      />
      <path // 11
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 10
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M43.0527 13L38.414 15.6552"
      />
      <path // 0
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 0
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M46 24L40.6896 24"
      />
      <path // 6
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 5
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M7.31055 24H2.00019"
      />
      <path // 1
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 0
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M43.0527 35L38.414 32.3448"
      />
      <path // 7
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 6
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M9.58691 15.6548L4.94815 12.9996"
      />
      <path // 2
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 1
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M35 43.0527L32.3448 38.414"
      />
      <path // 8
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 7
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M15.6553 9.58594L13.0001 4.94717"
      />
      <path // 9
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 8
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M24 7.31055L24 2.00019"
      />
      <path // 3
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          normalizedValue > 2
            ? `stroke-indiceuv-${normalizedValue} transition-all delay-[2000ms] duration-1000`
            : "stroke-orange-600/10",
        ].join(" ")}
        d="M24 46V40.6896"
      />
    </svg>
  );
} 
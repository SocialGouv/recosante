"use client";

import React from "react";

interface ChartProps {
  value?: number;
  visible?: boolean;
}

export default function Chart({ value = 0, visible = true }: ChartProps) {
  return (
    <svg
      className="h-16 w-auto overflow-visible"
      aria-hidden={true}
      width="162"
      height="106"
      viewBox="0 0 162 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M75.2201 19.1614L74.8686 19.7522V20.4397C74.8686 35.2422 73.0783 44.0997 66.1837 49.6182C62.6664 52.4334 57.6044 54.5601 50.2196 55.967C42.837 57.3736 33.3037 58.03 20.9932 58.03H18.4932V60.53C18.4932 75.0698 30.5882 86.8286 45.0562 86.8286H132.318C146.786 86.8286 158.881 75.0698 158.881 60.53C158.881 48.2045 150.144 37.8927 138.742 35.0245C137.85 16.9374 122.858 2.5 104.553 2.5C92.3369 2.5 81.3296 8.89376 75.2201 19.1614Z"
        style={{
          transition: visible ? "opacity 1200ms 900ms, fill 400ms 900ms" : "none",
        }}
        className={[
          "fill-green-600/10",
          "stroke-white",
          value > 2 ? "fill-gray-400" : `fill-vigilancemeteo-${value}`,
        ].join(" ")}
        strokeWidth="5"
      />
      <path
        d="M39.8779 29.6389C29.8053 29.6389 21.3465 36.6211 19.069 45.9974C9.70198 48.2678 2.5 56.6987 2.5 66.8068C2.5 78.6507 12.3477 88.2165 24.1198 88.2165H93.4555C105.228 88.2165 115.075 78.6507 115.075 66.8068C115.075 56.8977 108.148 48.5984 99.052 46.1384C98.1421 31.6719 86.0864 20.1841 71.3942 20.1841C62.3293 20.1841 54.0847 24.5342 48.9637 31.6617C46.1497 30.3378 43.0606 29.6389 39.8779 29.6389Z"
        style={{
          transition: visible ? "opacity 1200ms 600ms, fill 400ms 600ms" : "none",
        }}
        className={[
          "fill-green-600/10",
          "stroke-white",
          value > 1 ? "fill-gray-400" : `fill-vigilancemeteo-${value}`,
        ].join(" ")}
        strokeWidth="5"
      />
      <path
        d="M68.4558 54.0074C59.9952 54.0074 52.8771 59.8096 50.8549 67.6418C43.0317 69.6567 37.0459 76.7476 37.0459 85.2432C37.0459 95.3028 45.4062 103.417 55.3941 103.417H112.866C122.853 103.417 131.214 95.3028 131.214 85.2432C131.214 76.933 125.482 69.9653 117.91 67.7807C116.994 55.7092 106.882 46.1704 94.5792 46.1704C87.0473 46.1704 80.1847 49.7282 75.8474 55.5773C73.5453 54.5489 71.0364 54.0074 68.4558 54.0074Z"
        style={{
          transition: visible ? "opacity 1200ms 300ms, fill 400ms 300ms" : "none",
        }}
        className={[
          "fill-green-600/10",
          "stroke-white",
          value > 0 ? "fill-gray-400" : `fill-vigilancemeteo-${value}`,
        ].join(" ")}
        strokeWidth="5"
      />
    </svg>
  );
} 
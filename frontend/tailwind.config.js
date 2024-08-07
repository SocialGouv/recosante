/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg-atmo-1",
    "bg-atmo-2",
    "bg-atmo-3",
    "bg-atmo-4",
    "bg-atmo-5",
    "bg-atmo-6",
    "bg-raep-1",
    "bg-raep-2",
    "bg-raep-3",
    "bg-raep-4",
    "bg-raep-5",
    "fill-raep-1",
    "fill-raep-2",
    "fill-raep-3",
    "fill-raep-4",
    "fill-raep-5",
    "bg-radon-1",
    "bg-radon-2",
    "bg-radon-3",
    "fill-radon-1",
    "fill-radon-2",
    "fill-radon-3",
    "bg-vigilancemeteo-0",
    "bg-vigilancemeteo-1",
    "bg-vigilancemeteo-2",
    "bg-vigilancemeteo-3",
    "stroke-indiceuv-0",
    "stroke-indiceuv-1",
    "stroke-indiceuv-2",
    "stroke-indiceuv-3",
    "stroke-indiceuv-4",
    "stroke-indiceuv-5",
    "stroke-indiceuv-6",
    "stroke-indiceuv-7",
    "stroke-indiceuv-8",
    "stroke-indiceuv-9",
    "stroke-indiceuv-10",
    "stroke-indiceuv-11",
    "bg-baignades-0",
    "bg-baignades-1",
    "bg-baignades-2",
    "stroke-baignades-0",
    "stroke-baignades-1",
    "stroke-baignades-2",
    "w-1/5",
    "w-2/5",
    "w-3/5",
    "w-4/5",
    "w-5/5",
  ],
  theme: {
    screens: {
      // in em
      xs: "21em", // 336px
      sm: "40em", // 640px
      md: "48em", // 768px
      lg: "64em", // 1024px
      xl: "80em", // 1280px
      "2xl": "96em", // 1536px
    },
    extend: {
      animation: {
        flash: "flash 4s infinite",
        fetching: "fetching 1000ms infinite",
      },
      keyframes: {
        flash: {
          "0%, 75%, 87.5%, 100%": { opacity: "1" },
          "81.25%, 93.75%": { opacity: "0" },
        },
        fetching: {
          "0%": {
            transform: "scaleX(0)",
            "transform-origin": "left",
          },
          "50%": {
            transform: "scaleX(1)",
            "transform-origin": "left",
          },
          "50.1%": {
            transform: "scaleX(1)",
            "transform-origin": "right",
          },
          "100%": {
            transform: "scaleX(0)",
            "transform-origin": "right",
          },
        },
      },
      borderColor: {
        DEFAULT: "#000",
      },
      colors: {
        main: "#000091",
        main10: "#e5e5f4",
        background: "#fff",
        tile: "#f9f8f6",
        input: "#F0F0F0",
        title: "#1E1E1E",
        text: "#383838",
        border: "#cecece",
        footer: "#6a6a6a",
        success: "#008941",
        error: "#e10600",
        disabled: "#CCCCE9",
        episode: "#FB8371",
        atmo: {
          1: "#4BF0E6",
          2: "#4FCBAD",
          3: "#F0E65F",
          4: "#FF5354",
          5: "#A83559",
          6: "#7D237D",
        },
        raep: {
          1: "#75F94C",
          2: "#387C21",
          3: "#FFFD53",
          4: "#EF8541",
          5: "#EA3421",
        },
        radon: {
          1: "#4ba249",
          2: "#EF8541",
          3: "#cc0100",
        },
        vigilancemeteo: {
          0: "#31AA34",
          1: "#F0E65F",
          2: "#EF8541",
          3: "#EA3421",
        },
        indiceuv: {
          0: "#757575",
          1: "#207900",
          2: "#207900",
          3: "#EFD100",
          4: "#EFD100",
          5: "#EFD100",
          6: "#EB5000",
          7: "#EB5000",
          8: "#D8001D",
          9: "#D8001D",
          10: "#D8001D",
          11: "#B600AE",
        },
        baignades: {
          0: "#80FFFF",
          1: "#80FF80",
          2: "#FF8080",
        },
      },
    },
  },
  plugins: [],
};

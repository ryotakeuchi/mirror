import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mirror: {
          primary: "#D2B48C",
          secondary: "#F5F5F0",
          tertiary: "#4A4A4A",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["'Noto Sans JP'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

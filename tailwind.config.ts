import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#f7f7f7",
        secondary: "rgb(235, 235, 235)",
        light: "rgb(169, 169, 169)",
        gray: "rgb(102, 102, 102)",
        dark: "rgb(23, 23, 23)",
        },
       fontFamily: {
        mont: ["Montserrat", "sans-serif"],
        },
       animation: {
        bounce: "bounce 15s infinite",
        },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "2200px",
     },
    },
  },
  plugins: [],
};
export default config;

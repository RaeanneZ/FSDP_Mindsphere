/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "League Spartan": ["League Spartan", "sans-serif"],
      },
      colors: {
        yellow: "#DCAF27",
        lightYellow: "#FFF6E0",
        darkGrey: "#3A3A37",
        white: "#FFFFFF",
        lightBlue: "#F5F7FA",
        darkBlue: "#2F455B",
      },
    },
  },
  plugins: [],
};

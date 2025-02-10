/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: [
    "font-thonglor-semi-bold", // Safelist your custom class
  ],
  theme: {
    extend: {
      fontFamily: {
        thonglor: ['"thonglor-soi-4"', "sans-serif"], // Add custom font
        "thonglor-semi-bold": ['"thonglor-soi-4"', "sans-serif"], // Semi-bold alias
      },
      fontWeight: {
        "semi-bold": "600", // Adjust based on available font weights
        bold: "700",
      },
      screens: {
        mobile: { max: "768px" },
        tablet: { min: "769px", max: "1024px" },
        desktop: { min: "1025px" },
      },
    },
  },
  plugins: [],
};

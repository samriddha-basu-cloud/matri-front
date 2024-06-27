/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Georgia"', 'sans-serif'],
      },
      boxShadow: {
        neumorphism: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
        "neumorphism-inner": "inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
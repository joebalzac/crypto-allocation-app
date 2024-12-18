/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "body-gray": "rgb(28, 29, 31)",
        "justworks-blue": "rgb(0, 146, 246)",
        "justworks-orange": "rgb(223, 90, 49)",
        "justworks-orange-dark": "rgb(175, 44, 16)",
      },
    },
  },
  plugins: [],
};

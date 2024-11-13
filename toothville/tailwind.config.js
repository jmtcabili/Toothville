/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      nav_gray: "#f6f6f6",
      nav_blue: "#155589",
      nav_red: "#FF0000"
    },
    fontFamily: {
      anekOdia: ['var(--font-anek-odia)']
    },
    borderWidth: {
      '50': '50px', 
      '25': '25px'
    }
  },
};
export const plugins = [];
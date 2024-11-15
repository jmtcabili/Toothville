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
      nav_red: "#FF0000", 
      Normal: "#EAEAEA",
      Missing:"#000000", 
      Decayed: "#975102", 
      Impacted: "#4DB227", 
      Supernumerary:"#9DA1AA", 
      Root_Fragment:"#F5D033", 
      Unerupted: "#ed760e",
      Other: "#497E76",
      Extracted_due_to_Carries: "#7E7B52",
      Extracted_due_to_Other_Causes: "#1B5583",
      Amalgam_Filling: "#F54021",
      Composite_Filling: "#924E7D",
      Porcelain_Jacket_Crown: "#D9EC00",
      Acrylic_Jacket_Crown: "#DE4C8A",
      Abutment: "#43A9FF",
      Pontic: "#84c3be",
      Inlay: "#C7B446",
      Onlay: "#922b3e",
      Implant: "#FF00DD",
      Sealants: "#ffa8a8",
      Removable: "#9d00ff",
      Fixed_Bridge: "#78ff00",
      Veneer: "#00fbff"
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
module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white: {
          A700_7f: "#ffffff7f",
          A700_b2: "#ffffffb2",
          A700_0f: "#ffffff0f",
          A700_cc: "#ffffffcc",
          A700_33: "#ffffff33",
          A700: "#ffffff",
        },
        gray: {
          600: "#707070",
          900: "#232426",
          "900_02": "#282828",
          "900_26": "#1f1f1f26",
          "900_01": "#1e1e1e",
          "900_19": "#1f1f1f19",
          "900_7f": "#1e1e1e7f",
        },
        blue_gray: { 100: "#cccccc", 900: "#373737", "900_01": "#323232" },
        teal: { 300: "#34d399" },
        black: { 900: "#101010", "900_01": "#000000" },
        red: { A400: "#ff2020", A700: "#ff0000" },
      },
      boxShadow: {
        bs: "0px 4px  8px 0px #1f1f1f19",
        bs1: "0px 4px  8px 0px #1f1f1f26",
      },
      fontFamily: { inter: "Inter", sora: "Sora" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

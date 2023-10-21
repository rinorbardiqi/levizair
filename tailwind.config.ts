import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        montserrat: "Montserrat",
        neue: "Helvetica Neue",
      },
      colors: {
        mblue: "#3957CC",
        mlightblue: "#5D90DB",
        mgray: "#E0E0E0",
        mwhite: "#F9F9F9",
        myellow: "#FFF4BC",
        mdarkgray: "#C8C8C8",
        mred: "#F23939",
        mpink: "#F6B9B9",
      },
    },
  },
  plugins: [],
} satisfies Config;

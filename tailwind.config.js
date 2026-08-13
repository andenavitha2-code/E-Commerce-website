/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF8",
        panel: "#F1EFE9",
        ink: "#14151A",
        inkmute: "#5B5C63",
        line: "#E2DED4",
        accent: "#E8542E",
        accentdark: "#C6431F",
        teal: "#1A2E29",
        tealsoft: "#233F38",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        grain: "radial-gradient(#00000008 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}

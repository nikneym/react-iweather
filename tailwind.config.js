/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        product: "hsl(var(--product))",
      },
      fontSize: {
        "heading-hg": [
          "6rem",
          {
            fontWeight: "800",
            lineHeight: "1",
          },
        ],
        "heading-xl": [
          "3rem",
          {
            fontWeight: "800",
            lineHeight: "1.2",
          },
        ],
        "heading-lg": [
          "2rem",
          {
            fontWeight: "700",
            lineHeight: "1.4",
          },
        ],
        "heading-md": [
          "1.25rem",
          {
            fontWeight: "700",
            lineHeight: "1.4",
          },
        ],
        "heading-sm": [
          "1rem",
          {
            fontWeight: "700",
            lineHeight: "1.4",
          },
        ],
        "heading-xs": [
          "0.875rem",
          {
            fontWeight: "700",
            lineHeight: "1.4",
          },
        ],
      },
      dropShadow: {
        light: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
    colors: {
      gray: {
        900: "hsl(var(--gray-900))",
        800: "hsl(var(--gray-800))",
        700: "hsl(var(--gray-700))",
        600: "hsl(var(--gray-600))",
        500: "hsl(var(--gray-500))",
        400: "hsl(var(--gray-400))",
        300: "hsl(var(--gray-300))",
        200: "hsl(var(--gray-200))",
        100: "hsl(var(--gray-100))",
      },
    },
    fontSize: {
      lg: [
        "1.25rem",
        {
          fontWeight: "400",
          lineHeight: "1.4",
        },
      ],
      md: [
        "1rem",
        {
          fontWeight: "400",
          lineHeight: "1.4",
        },
      ],
      sm: [
        "0.875rem",
        {
          fontWeight: "400",
          lineHeight: "1.4",
        },
      ],
      xs: [
        "0.750rem",
        {
          fontWeight: "400",
          lineHeight: "1.4",
        },
      ],
      "xs-bold": [
        "0.750rem",
        {
          fontWeight: "700",
          lineHeight: "1.4",
        },
      ],
    },
  },
  plugins: [],
};

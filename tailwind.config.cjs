const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        poppins: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        white: "var(--color-white)",
        black: "var(--color-black)",
      },
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        "primary-inverse": "var(--bg-primary-inverse)",
        "secondary-inverse": "var(--bg-secondary-inverse)",
      },
      borderColor: {
        DEFAULT: "var(--border-primary)",
        secondary: "var(--border-secondary)",
      },
      boxShadow: {
        sm: "0px 1px 2px rgba(0, 0, 0, 0.05)",
        lg: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)",
      },
      gridTemplateColumns: {
        layout: "250px 1fr 200px",
      },
      textColors: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text-primary)",
            "--tw-prose-headings": "var(--text-primary)",
            "--tw-prose-links": "var(--text-blue)",
            "--tw-prose-bold": "var(--text-primary)",
            "--tw-prose-counters": "var(--text-primary)",
            "--tw-prose-bullets": "var(--text-primary)",
            "--tw-prose-hr": "var(--border-primary)",
            "--tw-prose-quotes": "var(--text-primary)",
            "--tw-prose-quote-borders": "var(--border-secondary)",
            "--tw-prose-code": "var(--text-primary)",
            "--tw-prose-th-borders": "var(--border-secondary)",
            "--tw-prose-td-borders": "var(--border-primary)",
            p: {
              lineHeight: "24px",
              marginBottom: "1em",
            },
            a: {
              textDecoration: "none",
              fontWeight: "default",
            },
            img: {
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            h1: {
              fontWeight: "600",
              fontSize: "28px",
              lineHeight: "32px",
            },
            h2: {
              fontWeight: "600",
              fontSize: "24px",
              lineHeight: "28px",
              marginTop: "1em",
            },
            h3: {
              fontSize: "20px",
              lineHeight: "24px",
            },
            h4: {
              fontSize: "16px",
              lineHeight: "24px",
            },
            h5: {
              fontSize: "16px",
              lineHeight: "24px",
            },
            h6: {
              fontSize: "16px",
              lineHeight: "24px",
            },
            li: {
              lineHeight: "24px",
              marginTop: "0.25em",
              marginBottom: "0.25em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

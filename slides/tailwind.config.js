/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#1a1a1a',
        primary: '#22c55e',
        secondary: '#3b82f6',
        destructive: '#ef4444',
        muted: '#a1a1aa',
      },
    },
  },
  plugins: [],
}

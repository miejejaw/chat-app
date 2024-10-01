/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        'iceberg-blue': "#8BABD8",
        'light-green': "#78E378",
        'custom-red': "#F71735",      // Renamed to avoid overriding default 'red'
        'custom-blue': "#1A9CFF",     // Renamed to avoid overriding default 'blue'
        'rich-black': "#011627",
        'navy-grey': "#707991",
        'light-grey': "#F5F5F5",
        'light-purple': "#AFB3FF",
        'dark-purple': "#656ED3"
      },
    },
  },
  plugins: [],
};

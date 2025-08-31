/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#320A6B',
            secondary: '#065084',
            accent: '#0F828C',
            soft: '#78B9B5'
        }
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files in the `src` directory
  ],
  theme: {
    extend: {
      colors: {
        MyBrown: "#330F02", // You can name it anything you like
        MyBeat: "#60001C", // You can name it anything you like
      },
    },
  },
  plugins: [],
};

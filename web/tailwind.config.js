/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files in the `src` directory
  ],
  theme: {
    extend: {
      colors: {
        myBgWhite : "#F9F9F9",
        MyBrown: "#330F02", // You can name it anything you like
        MyBeat: "#60001C",
        MyCream : "#E99233",
        MyYello : "#facc15" // You can name it anything you like
      },
    },
  },
  plugins: [],
};

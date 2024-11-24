export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg-color' : '#212529',
        'btn-ccolor' : '#0d6efd'
      },
      boxShadow: {
        'custom-shadow': '0 0 0.5rem rgba(0, 0, 0, 0.6)',
      },
      screens :{
        'tablets' : '520px',
        'largerScreen' : '1330px'
        

      }
    },
  },
  plugins: [],
}


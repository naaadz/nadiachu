/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app.vue",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
      ],
    theme: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1480px'
      },
      extend: {
        fontSize:{
          '5xl': ['3rem', '1.25'],
          '6xl': ['3.75rem', '1.5']
         },
         colors: {
          transparent: 'transparent',
          current: 'currentColor',
          'primary-blue': '#003E7E',
          'primary-red': '#CE202D',
          'default-light': '#ffffff',
        },
        container: {
            padding: {
              DEFAULT: '2rem'
            }
        },
        screens: {
          'max-phone': {'max': '639px'},
      },
      },
    },
    plugins: [],
  }
  
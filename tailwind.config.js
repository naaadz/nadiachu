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
        fontFamily: {
            lato: ["Lato", "sans-serif"],
            corinthia: ["Corinthia", "cursive"]
        },
        fontSize:{
            'base': '.94rem',
            '5xl': ['3rem', '1.25'],
            '6xl': ['3.75rem', '1.5']
         },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'default-light': '#FFFEEB',
            'default-dark': '#051833',
            'cornflower': '#7596DD',
            'light-blue': '#8BCFE4',
            'muted-blue': '#7DAEC7',
            'bright-blue': '#2FAFE9',
            'light-pink': '#FDD8EC',
            'dark-1' : '#030C1A'
        },
        container: {
            padding: {
              DEFAULT: '2rem'
            }
        },
        screens: {
          'max-phone': {'max': '450px'},
      },
      },
    },
    plugins: [],
  }
  
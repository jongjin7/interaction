// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: [...defaultTheme.fontFamily.sans],
            },
            colors:{
                primary: {
                    light: '#3AB0FF',
                    DEFAULT: '#ffe6da',
                    dark: '#0056b3'
                },
            }
        },
    },
    plugins: [],
}


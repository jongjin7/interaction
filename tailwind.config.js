// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['pretendard',...defaultTheme.fontFamily.sans],
            },
            colors:{
                primary: {
                    light: '#3AB0FF',
                    DEFAULT: '#0056b3',
                    dark: '#000010'
                },

            }
        },
    },
    plugins: [],
}


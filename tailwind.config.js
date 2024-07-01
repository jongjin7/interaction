// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['pretendard-variable',...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                instagram: {
                    primary: '#E1306C',
                    gradient1: '#405DE6',
                    gradient2: '#5851DB',
                    gradient3: '#833AB4',
                    gradient4: '#C13584',
                    gradient5: '#E1306C',
                    gradient6: '#FD1D1D',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

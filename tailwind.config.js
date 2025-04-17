/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
              'fade-in': 'fadeIn 1s ease-in-out',
              'fade-in-up': 'fadeInUp 1s ease-in-out',
              'pulse-slow': 'pulseSlow 2s infinite',
              'gradient-text': 'gradientText 4s ease infinite',
            },
            keyframes: {
              fadeIn: {
                'from': { opacity: 0 },
                'to': { opacity: 1 },
              },
              fadeInUp: {
                'from': { opacity: 0, transform: 'translateY(20px)' },
                'to': { opacity: 1, transform: 'translateY(0)' },
              },
              pulseSlow: {
                '0%, 100%': { opacity: 0.8 },
                '50%': { opacity: 1 },
              },
              gradientText: {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              },
            },
          },
    },
    plugins: [],
}
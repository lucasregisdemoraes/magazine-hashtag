/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}", "./*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          'from': { transform: 'translateY(30px)', filter: 'opacity(0)' },
        }
      }
    },
  },
  plugins: [],
}


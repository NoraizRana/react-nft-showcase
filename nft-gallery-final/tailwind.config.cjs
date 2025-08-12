module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { accent: '#7c3aed' },
      boxShadow: { card: '0 8px 30px rgba(2,6,23,0.35)' },
      keyframes: { shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } } },
      animation: { shimmer: 'shimmer 1.6s linear infinite' }
    }
  },
  plugins: [],
}

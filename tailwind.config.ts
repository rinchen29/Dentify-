import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dentify: {
          bg: '#030712',
          'bg-secondary': '#0f172a',
          cyan: '#06b6d4',
          violet: '#8b5cf6',
          'cyan-light': '#22d3ee',
          'violet-light': '#a78bfa',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
        'glow-cyan-sm': '0 0 10px rgba(6, 182, 212, 0.3)',
        'glow-violet-sm': '0 0 10px rgba(139, 92, 246, 0.3)',
        'card-hover': '0 0 30px rgba(6, 182, 212, 0.2), 0 20px 40px rgba(0,0,0,0.4)',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        'blob-delay-2': 'blob 7s 2s infinite',
        'blob-delay-4': 'blob 7s 4s infinite',
        float: 'float 3s ease-in-out infinite',
        'float-delay': 'float 3s 1.5s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'slide-down': 'slide-down 0.3s ease-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-dentify': 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
        shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
      },
    },
  },
  plugins: [],
}

export default config

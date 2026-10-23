import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { ink: '#070B14', panel: '#0F1729', line: '#22304F', fg: '#E6ECF8', mute: '#8EA0C0', shop: '#2563EB', rider: '#EA580C' } } },
} satisfies Config;


import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom theme colors
				serenity: {
					50: '#F7F4FF',
					100: '#E5DEFF',
					200: '#C7BDFF',
					300: '#A99CFF',
					400: '#9B87F5',
					500: '#7E69AB',
					600: '#5D4E7F',
					700: '#3D3353',
					800: '#1E1927',
					900: '#0F0C13',
				},
				calm: {
					50: '#F0F7FF',
					100: '#D3E4FD',
					200: '#A7C9FB',
					300: '#7BAEF9',
					400: '#5092F7',
					500: '#2977F5',
					600: '#1C5FC2',
					700: '#13458F',
					800: '#0A2C5C',
					900: '#05162E',
				},
				nature: {
					50: '#F2FCE2',
					100: '#E4F9C5',
					200: '#C9F18B',
					300: '#AEE950',
					400: '#94E116',
					500: '#77B412',
					600: '#5A870D',
					700: '#3D5A09',
					800: '#1F2D04',
					900: '#101602',
				},
				warmth: {
					50: '#FFF8F4',
					100: '#FDE1D3',
					200: '#FBC3A7',
					300: '#F9A57B',
					400: '#F7874F',
					500: '#F56923',
					600: '#C4541C',
					700: '#933F15',
					800: '#622A0E',
					900: '#311507',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0", opacity: "0" },
					to: { height: "var(--radix-accordion-content-height)", opacity: "1" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
					to: { height: "0", opacity: "0" }
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				"fade-out": {
					"0%": {
						opacity: "1",
						transform: "translateY(0)"
					},
					"100%": {
						opacity: "0",
						transform: "translateY(10px)"
					}
				},
				"pulse-slow": {
					"0%, 100%": {
						opacity: "1"
					},
					"50%": {
						opacity: "0.5"
					}
				},
				"breathing": {
					"0%, 100%": {
						transform: "scale(1)"
					},
					"50%": {
						transform: "scale(1.05)"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-out": "fade-out 0.5s ease-out",
				"pulse-slow": "pulse-slow 4s ease-in-out infinite",
				"breathing": "breathing 6s ease-in-out infinite"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

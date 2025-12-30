import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {

            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                background: '#030303',
                surface: '#0A0A0A',
                border: '#1F1F1F',
                primary: '#FFFFFF',
                secondary: '#A1A1AA',
                accent: '#3B82F6',
            },
            animation: {
                aurora: "aurora 60s linear infinite",
                shimmer: "shimmer 2s linear infinite",
                "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
                marquee: "marquee var(--duration) linear infinite",
                "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
                spotlight: "spotlight 2s ease .75s 1 forwards",
                blob: "blob 7s infinite",
                "background-shine": "background-shine 2s linear infinite",
            },
            keyframes: {
                aurora: {
                    "0%": {
                        backgroundPosition: "50% 50%, 50% 50%",
                    },
                    "100%": {
                        backgroundPosition: "350% 50%, 350% 50%",
                    },
                },
                shimmer: {
                    from: {
                        backgroundPosition: "0 0",
                    },
                    to: {
                        backgroundPosition: "-200% 0",
                    },
                },
                "border-beam": {
                    "100%": {
                        "offset-distance": "100%",
                    },
                },
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(calc(-100% - var(--gap)))" },
                },
                "marquee-vertical": {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(calc(-100% - var(--gap)))" },
                },
                spotlight: {
                    "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
                    "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
                },
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                "background-shine": {
                    "from": {
                        "backgroundPosition": "0 0"
                    },
                    "to": {
                        "backgroundPosition": "-200% 0"
                    }
                }
            },
        },
    },
    plugins: [],
};
export default config;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      // 🌈 Custom Colors (Gen-Z vibes)
      colors: {
        neonBlue: "#3b82f6",
        neonPurple: "#a855f7",
        neonPink: "#ec4899",
      },

      // ✨ Animations
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out",
        float: "float 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s infinite",
      },

      // 🎬 Keyframes
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },

        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(59,130,246,0.5)",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(168,85,247,0.8)",
          },
        },
      },

      // 🌟 Box Shadow Glow
      boxShadow: {
        neon: "0 0 20px rgba(59,130,246,0.5)",
        neonPurple: "0 0 25px rgba(168,85,247,0.6)",
      },

      // 🔮 Backdrop blur strong
      backdropBlur: {
        xs: "2px",
      },

    },
  },
  plugins: [],
};
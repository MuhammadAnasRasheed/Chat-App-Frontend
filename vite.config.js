import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  darkMode: "class", // we toggle with the 'dark' class
  theme: {
    extend: {},
  }
})


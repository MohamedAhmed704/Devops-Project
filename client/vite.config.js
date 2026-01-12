import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('recharts')) return 'charts';
            if (id.includes('jspdf') || id.includes('xlsx')) return 'pdf-excel';
            if (id.includes('framer-motion') || id.includes('sweetalert2') || id.includes('lucide-react')) return 'ui-libs';
          }
        }
      }
    }
  }
})

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

// Vite plugin to duplicate index.html as 404.html for GitHub Pages SPA client-side routing
function githubPagesSpa() {
  return {
    name: 'github-pages-spa',
    closeBundle() {
      const dist = path.resolve('dist')
      const indexPath = path.join(dist, 'index.html')
      const notFoundPath = path.join(dist, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/E-commerce-website/',
  plugins: [react(), githubPagesSpa()],
})

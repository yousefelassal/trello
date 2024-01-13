import path from "path"
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { remarkCodeHike } from '@code-hike/mdx'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup')
  return {
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
    plugins: [
      mdx.default({
        remarkPlugins: [[remarkCodeHike, { theme: 'github-dark' }]],
      }),
      react()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})

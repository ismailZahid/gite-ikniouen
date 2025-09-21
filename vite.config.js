import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying at https://<USER>.github.io/<REPO>/ keep base as '/<REPO>/'.
// If deploying to https://<USER>.github.io with this as the repo, set base to '/'.
export default defineConfig({
  base: '/gite-ikniouen/',
  plugins: [react()],
})

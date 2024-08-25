import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      [
        'src/http/controllers/tests/**',
        './prisma/vitest-environment-prisma/prisma-test-envirionment.ts',
      ],
    ],
    dir: 'src',
  },
})

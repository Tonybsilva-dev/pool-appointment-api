import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      provider: 'v8',
      exclude: [
        'test/setup.ts', // setup de testes
        '**/index.ts', // arquivos que apenas reexportam
        '**/esbuild.config.js',
        '**/vitest.config.ts',
        '**/src/index.ts',
        '**/config/**',
        '**/core/routes/**',
        '**/core/types/**',
        '**/core/middlewares/error-handling.ts',
        '**/infra/repositories/prisma-user-repository.ts', // se você só quiser testar com in-memory
        '**/presentation/controllers/**',
        '**/presentation/routes/**',
        '**/presentation/validators/**',
      ],
    },
  },
});
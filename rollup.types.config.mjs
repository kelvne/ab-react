import dts from 'rollup-plugin-dts'

export default {
  input: './src/index.tsx',
  output: [{ file: 'dist/ab-react.d.ts', format: 'es' }],
  plugins: [
    dts({
      compilerOptions: {
        baseUrl: 'src',
      },
    }),
  ],
}
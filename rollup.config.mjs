import ts from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import progress from 'rollup-plugin-progress';
import typescript from 'typescript';

const builds = [
  {
    file: 'dist/ab-react.mjs',
    format: 'esm',
  },
  {
    file: 'dist/ab-react.cjs',
    format: 'cjs',
  },
];

const commonPlugins = [
  progress(),
  resolve(),
  commonjs({
    include: 'node_modules/**',
  }),
  ts({
    typescript,
    tsconfig: './tsconfig.json',
    noEmitOnError: false,
  }),
];

const minifiedBundles = builds.map(({ file, ...obj }) => ({
  file: file.replace(/(\.[cm]?js)$/, '.min$1'),
  ...obj,
  plugins: [terser({ compress: { directives: false } }), filesize()],
}));

export default [...builds, ...minifiedBundles].map(
  ({ file, format, plugins: buildPlugins }) => {
    const plugins = [...commonPlugins, ...(buildPlugins ?? [])];

    return {
      input: 'src/index.tsx',
      output: {
        file,
        format,
      },
      plugins,
      external: ['react', 'react-dom'],
    };
  },
);

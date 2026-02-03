import { brotliCompress } from 'zlib';
import { promisify } from 'util';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import gzipPlugin from 'rollup-plugin-gzip';
import copy from 'rollup-plugin-copy';

const brotliPromise = promisify(brotliCompress);

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

/**
 * @typedef {{
 *  folder: string,
 *  format: string
 * }} OutputConfig
 */

/**
 * @typedef {{
 *  (arg: OutputConfig) => import('rollup').OutputOptions
 * }} ConfigMapper
 */

/**
 * @typedef {{(
 *  collected: import('rollup').RollupOptions[],
 *  config: {
 *    external: string[],
 *    name: string
 *  }
 * ) => import('rollup').RollupOptions[]}} ConfigReducer
 */

/** @type {OutputConfig[]} */
const outputConfig = [{
  folder: 'cjs',
  format: 'cjs'
}, {
  folder: 'esm',
  format: 'es'
}];

export default [{
  external: ['react'],
  name: 'react',
}, {
  external: ['solid-js', 'solid-js/web'],
  name: 'solid',
}].reduce(/** @type {ConfigReducer} */(collected, config) => [
  ...collected,  {
    external: config.external,
    input: `src/libs/${config.name}/index.js`,
    output: outputConfig.map(/** @type {ConfigMapper} */(c) => ({
      compact: true,
      sourcemap: !isProd,
      file: `${config.name}/${c.folder}/index.js`,
      format: c.format
    })),
    plugins: [
      nodeResolve({
        extensions: ['.js']
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(nodeEnv)
      }),
      isProd && terser({
        mangle: { toplevel: true },
        compress: {
          toplevel: true,
          drop_debugger: isProd
        },
        format: {
          comments: /^\*\s@/,
          quote_style: 1
        }
      }),
      isProd && gzipPlugin({
        customCompression: (content) => brotliPromise(Buffer.from(content)),
        fileName: '.br'
      }),
      copy({
        targets: outputConfig.map((c) => ({
          src: `src/libs/${config.name}/index.d.ts`,
          dest: `${config.name}/${c.folder}`
        })),
      })
    ],
    cache: !isProd,
    strictDeprecations: true,
    watch: {
      clearScreen: false,
      exclude: 'node_modules/**'
    }
  }
], []);

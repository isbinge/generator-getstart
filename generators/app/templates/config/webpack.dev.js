const path = require('path');
const glob = require('glob');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');
const common = require('./webpack.common');

console.log('print:', __dirname, __filename);
module.exports = merge([
  common,
  {
    mode: 'development',
    node: false,
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  parts.generateSourceMap('cheap-module-eval-source-map'),
  parts.loadTypeScript({
    include: path.resolve(parts.appDirectory, 'src'),
  }),
  parts.loadImages({
    options: {
      limit: 10000,
      name: '[name].[hash:5].[ext]',
    },
  }),
  parts.loadCSS({
    test: /\.(sc|sa|c)ss$/,
    include: path.resolve(parts.appDirectory, 'src'),
    miniCssExtractConfig: {
      hmr: true,
      reloadAll: true,
    },
    cssLoaderOptions: {
      modules: {
        localIdentName: '[folder]_[name]_[hash:5]',
      },
      sourceMap: true,
    },
    use: [parts.autoprefix(), parts.parseScss({})],
  }),
  //   parts.extractCSS({}),
  parts.purgeCSS({
    paths: glob.sync(`${path.resolve(parts.appDirectory, 'src')}/**/*.tsx`, { nodir: true }),
  }),
  parts.setFreeVariable('process.env.NODE_ENV', 'development'),
  parts.devServer({
    port: process.env.port,
    host: process.env.host,
  }),
  parts.page({
    output: {
      filename: '[name].[hash:5].hash.js',
      chunkFilename: '[name].[contenthash:5].contenthash.js',
      path: path.resolve(parts.appDirectory, 'dist'),
      publicPath: '/',
    },
    title: 'demo2',
    filename: 'index.html',
    options: {
      inject: true,
      cdn: [
        'https://unpkg.com/react@16.13.1/umd/react.development.js',
        'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
      ],
    },
  }),
  parts.useDll(),
  parts.enableProgressBar(),
  parts.clean(),
]);

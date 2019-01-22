const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins:
    [['import', { libraryName: 'antd-mobile', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  proxy : {
    "/api": {
      "target": "http://localhost:8080/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "/api" }
    }
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
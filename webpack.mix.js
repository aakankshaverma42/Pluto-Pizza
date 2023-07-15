let mix = require('laravel-mix');

mix.js('Resources/js/app.js', 'public/js/app.js').sass('Resources/scss/app.scss', 'public/css/app.css');
// webpack.config.js
const nodePolyfills = require('fs-extra');

module.exports = {
  // ... your other webpack configuration options
  resolve: {
    fallback: {
      fs: nodePolyfills,
    },
  },
};

let mix = require('laravel-mix');

mix.js('Resources/js/app.js', 'public/js/app.js').sass('Resources/scss/app.scss', 'public/css/app.css');
let mix = require('laravel-mix');

mix.js('resources/ts/app.ts', 'public/js/app.js')
    .sass('resources/scss/app.scss', 'public/css/app.css');
const { src, dest, series } = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

function compileJavascript() {
    return src(['./assets/**/*.js', '!./assets/vendor/dontUseMe.js'])
        .pipe(concat('scripts.js')) //combine sream into scripts.js
        .pipe(dest(`./dist/js`)) //send unminified combined file to dist/js
        .pipe(uglify()) //minify stream
        .pipe(rename('scripts.min.js')) //rename stream to scripts.min.js
        .pipe(dest('./dist/js')) //send minified stream to dist/js
}

exports.default = series(compileJavascript)
const { src, dest, series } = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

function compileJavascript() {
    return src(['./assets/**/*.js', '!./assets/vendor/dontUseMe.js'])
        .pipe(concat('scripts.js'))
        .pipe(dest(`./dist/js`))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(dest('./dist/js'))
}

exports.default = series(compileJavascript)
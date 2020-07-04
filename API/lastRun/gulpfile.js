const { src, series, dest, lastRun, watch } = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

function compileJavascript() {
    return src('./js/*.js', { since: lastRun(compileJavascript) })
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(dest('./dist'));
}

function watchJS() {
    watch('./js/*.js', { delay: 500 }, compileJavascript)
}

exports.default = series(compileJavascript, watchJS);
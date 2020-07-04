const { series, parallel, dest, src, watch, lastRun } = require('gulp'),
    sass = require('gulp-dart-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

function compileSass() {
    return src('./assets/sass/styles.scss', { sourcemaps: true })
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('styles.min.css'))
        .pipe(dest('./dist/', { sourcemaps: './maps' }))
}

function compileJavascript() {
    return src('./assets/js/*.js', { since: lastRun(compileJavascript), sourcemaps: true })
        .pipe(concat('scripts.js'))
        .pipe(dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(dest('./dist/', { sourcemaps: './maps' }))
}

function logChange(filetype, path, stats) {
    console.log(`
[\x1b[2m${stats.mtime.getHours()}:${stats.mtime.getMinutes()}:${stats.mtime.getSeconds()}\x1b[0m] ${filetype} file change: \x1b[35m ${path}\x1b[0m`);
}

function watchFiles() {
    const sassWatch = watch('./assets/sass/*.scss', { delay: 500 }, compileSass),
        jsWatch = watch('./assets/js/*.js', { delay: 500 }, compileJavascript);

    //using chokidar instances to say what file was changed.
    sassWatch.on('change', function(path, stats) {
        logChange('SASS', path, stats)
    })
    jsWatch.on('change', function(path, stats) {
        logChange('JavaScript', path, stats)
    })
}

exports.default = series(parallel(compileSass, compileJavascript), watchFiles)
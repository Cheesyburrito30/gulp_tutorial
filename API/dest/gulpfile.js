const { src, dest, parallel, lastRun } = require('gulp'),
    sass = require('gulp-dart-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

function compileJavascript() {
    return src('./js/*.js', { sourcemaps: true }) //match .js files in /js/ and enable sourcemaps
        .pipe(concat('scripts.min.js')) //put all sourced files into one file
        .pipe(uglify()) //minify streamed files
        // output files to ./dist/ folder
        // enable external sourcemaps at ./dist/maps/
        .pipe(dest('./dist/', { sourcemaps: './maps' })); 
}

function compileSass() {
    return src('./sass/*.scss', { sourcemaps: true })
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // output files to ./dist/ folder
        // enable inline sourcemaps on the files
        .pipe(dest('./dist/css', { sourcemaps: true }))
}

exports.default = parallel(compileJavascript, compileSass);
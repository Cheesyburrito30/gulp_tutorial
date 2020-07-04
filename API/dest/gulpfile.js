const { src, dest, series, lastRun } = require('gulp'),
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

exports.default = series(compileJavascript);
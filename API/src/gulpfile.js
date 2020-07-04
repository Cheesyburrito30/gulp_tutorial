const { src, dest, series, lastRun } = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

function sourceTest() {
    // source glob to find all .js files in /js/
    // source options to enable sourcemaps, allow empty files, and only stream files since this task was last ran
    return src(['./js/*.js', './js/fileDoesNotExist.js'], { sourcemaps: true, allowEmpty: true, since: lastRun(sourceTest) })
        .pipe(concat('scripts.min.js')) //put all sourced files into one file
        .pipe(uglify()) //minify streamed files
        .pipe(dest('./dist/', { sourcemaps: './maps' })); //move files into dist directory
}

exports.default = series(sourceTest);
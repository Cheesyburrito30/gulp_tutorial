const { src, dest, series, watch } = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

function compileJS() {
    return src('./assets/js/*.js', { sourcemaps: true } )
        .pipe(babel({
	        presets: ['@babel/env']
        }))
	.pipe(concat('scripts.js'))
	.pipe(uglify())
	.pipe(rename('scripts.min.js'))
	.pipe(dest('./dist/js', { sourcemaps: './maps/' } ));
}

function watchJS() {
    watch('./assets/js/*.js', { delay:500 }, compileJS)
}

exports.default = series(compileJs, watchJS)

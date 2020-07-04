const { src, dest, series } = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

function compileSass() {
    return src('./scss/*.scss') 
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //gulp-sass
        .pipe(rename('style.min.css')) //gulp-rename
        .pipe(dest('./css/')); //output combined file to ./css/
}

exports.default = series(compileSass)
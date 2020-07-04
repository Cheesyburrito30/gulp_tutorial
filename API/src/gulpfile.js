const { src, dest, series } = require('gulp');

function sourceTest() {
    return src('./js/*.js') //source glob searching js directory for any file that ends in .js
        .pipe(dest('./dist/')); //move files into dist directory
}

exports.default = series(sourceTest);
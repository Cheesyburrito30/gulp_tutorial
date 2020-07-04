const { src, series, dest, watch, lastRun, parallel } = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-dart-sass');

// create basic js Gulp task
function compileJS() {
    return src('./js/*.js')
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(dest('./dist/js/'));
}

//create basic sass Gulp task
function compileSass() {
    return src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('styles.min.css'))
        .pipe(dest('./dist/css'))
}

// basic watch task for sass files
function watchSass() {
    watch(
        './sass/*.scss', // glob 
        { // options,
            delay: 500, // set delay to 500ms
            events: 'all' // run on all events
        }, 
        compileSass // run compileJS on event trigger
    )
}

// watch task for sass using watcher instance
function watchJS() {
    const jsWatch = watch(
        './js/*.js', // glob
        { // options,
            delay: 500, // set delay to 500ms
            events: 'all' // run on all events
        }, 
        compileJS // run compileSass on event trigger
    ),
    // create function to add a message to Gulp console log
    logEvent = (eventType, path, stats, ) => {
        console.log(`
[\x1b[2m${stats.mtime.getHours()}:${stats.mtime.getMinutes()}:${stats.mtime.getSeconds()}\x1b[0m] JavaScript file ${eventType}: \x1b[35m ${path}\x1b[0m`);
    }

    // on file change event
    jsWatch.on('change', function(path, stats) {
        logEvent('change', path, stats)
    })

    // on file added event
    jsWatch.on('add', function(path, stats) {
        logEvent('created', path, stats)
    })

    // on file deleted event
    jsWatch.on('unlink', function(path, stats) {
        console.log(`
        JavaScript file deleted: \x1b[35m ${path}\x1b[0m`)
    })
}


exports.default = parallel(series(compileJS, watchJS), series(compileSass, watchSass));
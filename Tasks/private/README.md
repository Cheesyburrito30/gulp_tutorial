# Gulp Private Tasks Overview
Lets take a look at what Gulp tasks are, the pieces that make them up, and
how to build a simple task.

## The Anatomy of a private Gulp Task

### The Base
The most basic building block of a private Gulp task is a named JavaScript function. 
This function's name specifies the name of the task and it's block contains 
the entirety of the task's pipeline. The function's name should accurately 
describe what the task's purpose is.

```javascript
function taskName() {

}
``` 
**NOTE** - Older versions of Gulp used the Gulp API function `task()`
to build private tasks. This is no longer recommended and all your 
private tasks should be built as named functions.

### The Source
For private tasks to run, they need a source of files to use. We can tell Gulp where
to find the files we want to work with using the Gulp API function `src()`. 

`src()` takes either a single glob, or an array of globs as it's parameter. Gulp
will then use the supplied globs to create a vinyl file stream that the pipeline
can use.

```javascript
function singleFile() {
    return src('/path/to/*.scss'); //single glob
}

function fileArray() {
    return src(['/path/to/*.scss','/different/sass/*.scss']); //array of globs
}
```

**NOTE** - Always put a `return` before your source.

### The Pipeline
Private Gulp tasks run on pipelines. The task pipeline takes the file stream from
our `src()` and leads it through various plugins, Gulp API functions, or 
custom functions that read and manipulate the stream.

`pipe()` is a Gulp API function that requires a callback (usually a plugin or
Gulp API function) as a parameter. The pipe takes the file stream and passes it
to it's callback, once the callback is finished, the pipe then lets the stream
continue down the pipeline, with any changes made by the callback present.

Each `pipe()` is chained to the `src()`.

```javascript
function pipeline() {
    return src('/path/to/file.js')
        .pipe(doThis())
        .pipe(doThat());
}
``` 

# Putting Everything Together
Let's take our building blocks and create a private Gulp task that compiles scss files,
minifies them, and creates a new style.min.css file.

## Building the base
First, we have to start with the base. For this task we're going to create a
function named "compileSass". 
```javascript
function compileSass() {

}
```
## Adding a source
Second, we need to add a `src()` with a glob to tell Gulp what files to use.
```javascript
function compileSass() {
    return src('./scss/*.scss');
}
```

## Building the pipeline
Lastly, we need to create the pipeline. 

For this task, we'll need 3 pipes to compile sass using the plugin gulp-sass,
rename the file using the plugin gulp-rename, and one to output the final 
stream to our css folder using the Gulp API function `dest()`

```javascript
function compileSass() {
    return src('./sass/*.scss') 
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //gulp-sass
        .pipe(rename('style.min.css')) //gulp-rename
        .pipe(dest('./css/')); //output combined file to ./css/
}
```
Congratulations! We just built a private Gulp task to take care of our scss. You can use
the same process that we used here to create any private Gulp tasks for your projects.
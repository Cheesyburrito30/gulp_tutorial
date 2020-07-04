# Public Gulp Tasks
Public Gulp tasks are the functions that we export to and call with Gulp CLI. These tasks tell Gulp what order to run private tasks, and what order to run them in. These tasks are defined by `series(...tasks)`, `parallel(...tasks)`, or a single private task.

## Exporting Public Tasks
A public Gulp task needs to be exported and declared for the Gulp CLI to be able to run the task. To export a public task, use `exports.<taskName>` and then tell Gulp what should be run each time that task is called.

`exports.publicTaskName = series() || parallel() || privateTaskName`

## Series()
A public Gulp task that uses `series(...tasks)` to define how it runs will run each task one after another. No tasks in a series will run at the same time as another task. This should be used when a task relies on other task's outputs to run properly and we need to make sure that the tasks are ran in a specific order to accommodate this requirement. 

`exports.default = series(taskOne, taskTwo)`

## Parallel()
A public Gulp task that uses `parallel(...tasks)` to define how it runs will run it's tasks siumultaneously. This should be used when each task doesn't rely on other task's outputs, and don't overlap in what files they are streaming.

`exports.default = parallel(taskOne, taskTwo)`

## Single tasks
A public Gulp task that is defined by calling a single private task will run that task, and only that task. This should be used for single one-off tasks that aren't needed on a regular basis, but are still beneficial to have Gulp do for us. 

`exports.single = taskOne`


# Putting it all Together
Public Gulp tasks can be extremely powerful and robust tools for your workflow; `series()` and `parallel()` are able to be nested an infinite amount of times and in any order to make your public Gulp tasks able to do just about anything. For example, we'll build a single public Gulp task that can compile Sass, combine then minify JavaScript, and once that is all done, watch for changes to our files.

`exports.default = series(parallel(compileSass, compileJavascript), watchFiles)`

Lets break this down from the inside to see what each nested section is doing.


`parallel(compileSass, compileJavascript)` - This tells Gulp to run the compileSass task at the same time as it runs the compileJavaScript task. We're using parallels for this because these tasks have nothing to do with eachother and can be ran simultaneously without issue.

`series(parallel(...), watchFiles)` - This tells gulp to run our Sass and JavaScript tasks simultaneously, then run the watchFiles task after all other tasks are completed. We use series here because watchFiles checks for changes in our files, and we don't want it to be running while our other tasks are changing our files. 

`exports.default` - This is setting the default task that will run when the `gulp` command is used. Each time we run `gulp` in this project's terminal, the tasks will all run in the order that we specified. 
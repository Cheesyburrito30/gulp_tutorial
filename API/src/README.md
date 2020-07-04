# Gulp API src()
`src()` is a function built into Gulp that takes a glob (or an array of globs) and an options object as parameters. `src()` takes the globs given and turns the found files into an in-memory file stream that the rest of the task pipeline can use to read or manipulate files as needed.

## Adding options to src()
To add options to a task's `src()`, add a `,` after the glob parameter and add a JavaScript object with the options set as a parameter.

`src('/glob/path/*.js', { options: value })`

## Common Options
Lets explore some common options for src that can change the way that your task runs and when you want to use them.

### since
The `since` option on `src` further controls what files are put into the task's file stream. When `since` is set it will only allow files that have changed since the time specified. `since` is most commonly used in conjunction with `watch()` and `lastRun()`. 

The since, watch, and lastRun work together to tell Gulp that when a watched file is changed, only stream the file that has changed since the last time a task was ran. This use case can help to reduce the amount of time spent on doing tasks that are repeated on a regular basis.

Option Type: Date
Default: none

### sourcemaps
The `sourcemaps` option on `src` tells the stream to pay attention to what files are used and what happens to the files. When `sourcemaps` is set to `true` the task will start a sourcemap for the streamed files and update it when the files are manipulated. `sourcemaps` is most commonly used when you're combining and minifying files in your project, but still need to know what is doing what.

Sourcemaps helps in debugging issues with your code because they function as a map to tell you where each line in the outputted file was sourced from. 

Option Type: boolean
Default: false

### allowEmpty
The `allowEmpty` option on `src` tells the stream to allow globs that could only match one file (`./js.file.js`) to not find any file. When `allowEmpty` is set to `true`, the task will not throw an error if the specified file is not found. This can be helpful at the beginning of your project when creating tasks that you know you'll need later on. 

Option Type: boolean
Default: false
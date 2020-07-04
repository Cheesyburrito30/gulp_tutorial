# Gulp API lastRun()
`lastRun()` is a function built into Gulp that returns the datetime that a function was last ran at. `lastRun()` takes a task, and an optional precision number (to round the returned result) as parameters. 

## Using lastRun()
`lastRun()` is most commonly used in tasks that are being completed regularly using watcher tasks. you can use `lastRun()` in conjunction with `src()`'s `since` option to tell a task to only stream files that have been changed since the last time the function was ran.

```javascript
function watchedTask() {
    return src('./path/to/file.js', { since: lastRun(watchedTask) })
        // body omitted
}
```
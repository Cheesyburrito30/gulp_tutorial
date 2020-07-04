# Gulp API watch()
`watch()` is a function built into Gulp that watches files or directories and on an event (changed, removed, etc), runs a private Gulp task. `watch()` takes a glob (or an array of globs), an optional options object, and a private task as parameters. 

## Building a watcher
```javascript 
//single glob
watch('./path/to/*.js', { option: value }, taskName)

//glob array
watch(['./path/to/*.js', './different/path/*.js'], { option: value }, taskName)
```

## Common Options
Some Common options for `watch()` and how to use them
### delay
The Delay option allows us to set a millisecond delay between an event and the task running. This can be helpful to make a task not repeat itself if making batch changes like a find and replace search.

Option type: number

Default: `200`

### queue
The queue option allows us to tell Gulp to not run the task if it's already running. If enabled, Gulp will add the task to a running queue if the task is called while it's running. This keeps tasks from overlapping and causing potential issues.

Option type: boolean

Default: `true`

### events
The events options allows us to tell Gulp what file events we want to trigger the task to start on. Changing the events option lets us better fine tune our tasks for our workflows.

Option type: string or string array

Default: `['add', 'change', 'unlink']`

Options:  `'all', 'add', 'addDir', 'change', 'unlink', 'unlinkDir', 'ready', 'error'`

# Using Watcher Instance
`watch()` allows us to also bind and make other changes on an event. By making the watcher a variable, we're able to call it later and run other functions as needed. 

*Note that when using `watch()` in this way, you **don't have access to other gulp tasks, streams, or functions.***
```javascript
const watcher = watch('files/*.js', taskName)
watcher.on('change', function(path, stats) {
    // body omitted
})
```

## Methods available on a watch instance

### on
Run a callback function when a specified event happens. 
On takes the following parameters: an event name string, and an event handler function

You can pass the path of the file affected by the event, and the stats for the event to the event handler. 
```javascript
watcher.on('eventName', function(path, stats) {
    // body omitted
})
```

### close
Ends the watcher. No parameters
```javascript
watcher.close() 
```

### add
Adds additional globs to be watched to the watcher. Takes a string or array of strings as a parameter.
```javascript
watcher.add('./path/to/*.js') 
```

### unwatch
Removes globs to be watched to the watcher. Takes a string or array of strings as a parameter.
```javascript
watcher.unwatch('./path/to/*.js') 
```
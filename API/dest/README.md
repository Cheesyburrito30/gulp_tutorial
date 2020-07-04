# Gulp API dest()
`dest()` is a function built into Gulp that tells a task to output the stream to a specified destination. `dest()` takes a directory string and an options object as parameters, and outputs the file stream to the directory parameter. 

## adding options to dest()
To add options to a task's `dest()`, add a `,` after the directory parameter and add a JavaScript object with each option needed.

`dest('./path/to/destination/', { option: value })`

## Common Options

### sourcemaps
The `sourcemaps` option on `dest` tells the task how to output the sourcemaps generated from a `src()` with sourcemaps enabled. This can either be an inline sourcemap, or an external sourcemap. If `sourcemaps` is set to true, the sourcemap will be added inline to the files and if set to a string, it will output the files to the directory specified.

Option Type: boolean or string
Default: false
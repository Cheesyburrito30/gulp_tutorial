
# Gulp Globs
Explaining what globs are in Gulp, and how to use them.

## What is a Glob?
In Gulp, a glob is a file path that can be specific to a single file, or can match multiple files using special glob symbols. These are very handy for being able to source many files without having to specify every single path. 

## Glob Symbols

`/` - Segment Separator

`\\` - Escape symbol

`**` - Multi-Segment glob

`*` - Single-Segment glob

`!` - Exclusion glob


### Glob Segments
Globs are built very similarly to file paths, with each folder in a path being a segment. Regardless of what operating system you're using, glob segments are all separated by a `/`.

### Glob Escapes
Glob escapes are used to tell Gulp to treat any of the gulp symbols as literal characters. `\\*` will find any file that has a * in it.

### Glob Catch-alls 
Glob Catch-alls tells Gulp to match any amount of characters (including none!) in different segments. 

`*` This single-segment glob will only find matches in one segment, it WILL NOT match files that are in nested directories. Using `sass/*.scss` will not include `sass/nested/file.scss`

`**` This multi-segment glob will find matches in any nested directories, no matter how nested. Since this catch-all has no nested limit, it's important that you specify the first directory for the glob. `firstDir/**/*.scss`

### Glob Exclusions
Glob exclusions are used to say "Don't search these segments". `!dont/use/this/*.js` 


## Using Globs
In Gulp, we primarily use globs in the source portion of tasks. The glob segments and catch-alls allow us to group together files all in the same directory paths without having to make arrays with each file's name inputted manually. For our example, we'll use the following file structure:
```
assets
    |-js
        |-main.js
        |-nav.js
    |-vendor
        |-dontUseMe.js
        |-useMe.js
    |-css
        |-cssFile.css
index.html
```

To build a glob, the first thing we need to know is the path for the files we want to use. For this example, we are going to use all the JavaScript files located inside of our `assets` directory. 

The next item we need to know is if there are any files we want to NOT use. For this example, we don't want to use the file named `dontUseMe.js`

Now that we know what files we want to use, and which we don't, lets start building the glob. To start, we'll scaffold a basic Gulp Task named `compileJavascript` and add the start of the path we want `./assets/`. This tells Gulp to start looking for files in the assets folder.

```javascript
function compileJavascript() {
    return src('./assets/')
    //body omitted
}
```
Next, we need to either continue the path, or start using catch alls for additional segments. For this example, we know that we are wanting to include files in multiple directories inside of assets so we will want to use the multi-segment glob, `**`, to tell gulp to look for files in all the directories that exist inside of our assets directory.

```javascript
function compileJavascript() {
    return src('./assets/**/')
    //body omitted
}
```
Now, Gulp will be looking at all files in the assets directory... but that includes our CSS files, which we don't want. Our next step then is to tell Gulp to use a single-segment glob, `*`, to match any file name and then tell Gulp the file type it should match.

```javascript
function compileJavascript() {
    return src('./assets/**/*.js')
    //body omitted
}
```
Our glob now tells Gulp to search every folder inside of the assets directory and use ANY file that ends with `.js`. 

Our final step to complete our example is to make sure that Gulp will not use the `dontUseMe.js` file. To exclude files, we need to add an additional glob into the task's source. To do this, we need to convert the parameter from a single string, to an array of strings, and then include a specific glob with an exclusion symbol in front of it. 

```javascript
function compileJavascript() {
    return src(['./assets/**/*.js', '!./assets/vendor/dontUseMe.js'])
    //body omitted
}
```

Our Gulp glob is now complete. We have told Gulp to use any .js file located in our assets directory except for our `dontUseMe.js` file.
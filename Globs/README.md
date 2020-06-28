
# Gulp Globs
Explaining what globs are in gulp, and how to use them.

## What is a Glob?
In Gulp, a glob is a file path that can be specific to a single file, or can match multiple files using special glob symbols. These are very handy for being able to source many files without having to specify every single path. 

### Glob Symbols

`/` - Segment Separator

`\\` - Escape symbol

`**` - Multi-Segment glob

`*` - Single-Segment glob

`!` - Exclusion glob


### Glob Segments
Globs are built very similarly to file paths, with each folder in a path being a segment. Regardless of what operating system you're using, glob segments are all separated by a `/`.

### Glob Catch-alls 
Glob Catch-alls tells Gulp to match any amount of characters (including none!) in different segments. 

`*` This single-segment glob will only find matches in one segment, it WILL NOT match files that are in nested directories. Using `sass/*.scss` will not include `sass/nested/file.scss`

`**` This multi-segment glob will find matches in any nested directories, no matter how nested. Since this catch-all has no nested limit, it's important that you specify the first directory for the glob. `firstDir/**/*.scss`
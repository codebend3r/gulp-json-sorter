Gulp JSON Sorter
====================
![gulp-json-sorter build status](https://travis-ci.org/crivas/gulp-json-sorter.svg?branch=master)

> Sorts JSON files alphabetically and optionally renames underscores to be hyphens.

NPM Install
```sh
npm i gulp-json-sorter
```

Basic Example
```js
var jsonSorter = require('gulp-json-sorter');

gulp.task('sort', function () {

  return gulp.src(['file1.json', 'file2.json'])
    .pipe(jsonSorter())
    .pipe(gulp.dest('/output'))

});
```

With Rename Enabled
```js
var jsonSorter = require('gulp-json-sorter');

gulp.task('sort', function () {

  return gulp.src(['file1.json', 'file2.json'])
    .pipe(jsonSorter({
        rename: true
      }))
    .pipe(gulp.dest('/output'))

});
```

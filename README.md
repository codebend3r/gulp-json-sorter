Gulp JSON Sorter
====================

# Sorts JSON files alphabetically and optionally renames underscores to be hyphens.

Basic Example

    var jsonSorter = require('gulp-json-sorter');

    gulp.task('sort', function () {

      return gulp.src(['file1.json', 'file2.json''])
        .pipe(jsonSorter())
        .pipe(gulp.dest('/output'))

    });

With Rename Enabled

    var jsonSorter = require('gulp-json-sorter');

    gulp.task('sort', function () {

      return gulp.src(['file1.json', 'file2.json''])
        .pipe(jsonSorter({
            rename: true
          }))
        .pipe(gulp.dest('/output'))

    });

sorts JSON files alphabetically and optionally renames underscores to be hyphens.

1. Basic Example

    var jsonSorter = require('gulp-json-sorter');

    gulp.task('sort', function () {

      return gulp.src(['file1.json', 'file2.json''])
        .pipe(jsonSorter())
        .pipe(gulp.dest('/output'))

    });

2. With Rename Enabled

    gulp.task('sort', function () {

      return gulp.src(['file1.json', 'file2.json''])
        .pipe(jsonSorter({
            rename: true
          }))
        .pipe(gulp.dest('/output'))

    });

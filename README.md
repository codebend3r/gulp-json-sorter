Sorts JSON files alphabetically and recursively

    var jsonSorter = require('gulp-json-sorter');
    
    gulp.task('sort', function () {
    
      return gulp.src(['file1.json', 'file2.json''])
        .pipe(jsonSorter())
        .pipe(gulp.dest('/output'))
    
    });

Sorts JSON files alphabetically

    var jsonSorter = require('ute-gulp-json-sorter');
    
    /**
     * sorts json alphabetically
     */
    gulp.task('sort', function () {
    
      return gulp.src(['ute-tags.json'])
        .pipe(jsonSorter())
        .pipe(gulp.dest('/output'))
    
    });

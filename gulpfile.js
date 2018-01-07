var gulp = require('gulp');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('compress', function() {
    gulp.src('src/*.js')
        .pipe(minify({
            noSource : true
        }))
        .pipe(gulp.dest('dist')); 

    gulp.src('src/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '-min'
          }))
        .pipe(gulp.dest('dist'));
});
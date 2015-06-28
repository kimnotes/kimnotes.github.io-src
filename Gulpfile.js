var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');
var path = require('path');

gulp.task('less', function () {
  return gulp.src(['./node_modules/bootstrap/less/bootstrap.less', './less/**/*.less'])
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      //.pipe(uglify())
      .pipe(concat('app.css'))
      .pipe(gulp.dest('./build/css'));

});

gulp.task('js', function() {

  return gulp.src('./js/app.js')
      .pipe(browserify({
        insertGlobals : true,
        debug : 1
      }))
      .pipe(gulp.dest('./build/js'))
});

gulp.task('watch', ['js', 'less'], function() {
  livereload.listen({start:1, reloadPage:"index.html", basePath:"./build/"});
  gulp.watch('less/*.less', ['less']);
  gulp.watch('js/*.js', ['js']);
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('buildreact', function() {
  return browserify({
      entries: 'app-ui/components/app.jsx',
      extensions: ['.jsx'],
      debug: true
    })
    .transform('babelify', {
      presets: ['es2015', 'react']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('adventures/static/js/build'));
});

gulp.task('sass', function() {
  return gulp.src('app-ui/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('adventures/static/css'));
});

gulp.task('watch', function() {
  gulp.watch('app-ui/scss/*.scss', ['sass']);
  gulp.watch('app-ui/components/*.jsx', ['buildreact']);
});

gulp.task('default', function(callback) {
  runSequence(['sass', 'buildreact', 'watch'],
    callback
  );
});

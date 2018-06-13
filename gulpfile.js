
const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');

gulp.task('webpack', (callback) => {
  webpack(require('./webpack.config.js'), (err, stats) => {
    if( err ) {
      console.error(err);
    }
    if( stats.errors && stats.errors.length > 0 ) {
      console.log(stats);
    }
    callback();
  });
});

gulp.task('icon', (callback) => {
  callback();
});

gulp.task('less', () => {
  return gulp.src('./client/style/app.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['less', 'webpack']);

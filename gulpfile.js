var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var cleanCss = require('gulp-clean-css');
var plumber = require('gulp-plumber');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    port: 8092,
    ghost: true,
    notify: true,
    server: "./src"
  });
  // Watch changes
  gulp.watch("src/sass/**/*.sass", ['sass']);
  gulp.watch("src/css/**/*.css", ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/sass/**/*.sass")
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(concatCss("style.css"))
  .pipe(gulp.dest("src/css"))
  .pipe(browserSync.stream());
});

// Minify css for production
gulp.task('build', ['build-html', 'build-fonts', 'build-img'], function() {
  return gulp.src('src/css/*.css')
  .pipe(cleanCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('build-html', function () {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('build-fonts', function () {
  return gulp.src('src/fonts/*.*')
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build-img', function () {
  return gulp.src('src/img/*.*')
  .pipe(gulp.dest('dist/img'));
});

gulp.task('build-js', function () {
  return gulp.src('src/js/*.*')
  .pipe(gulp.dest('dist/js'));
});

gulp.task('build-audio', function () {
  return gulp.src('src/content/audio/*.*')
  .pipe(gulp.dest('dist/content/audio'));
});

// Watch changes
// gulp.task('watch', function () {
//   gulp.watch("src/sass/**/*.sass", ['sass']);
// });

gulp.task('default', ['serve']);
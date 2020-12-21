var gulp        = require('gulp');
var browserSync = require('browser-sync');
var prefix      = require('gulp-autoprefixer');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
 
// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  //watch files
  var files = [
  './sass/*.scss',
  './*.php'
  ];

  //initialize browsersync
  browserSync.init(files, {
  //browsersync with a php server
  proxy: "http://localhost/wordpress",
  notify: true
  });
});
 
// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
  return gulp.src([
      'sass/main.sass',
    ])
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream:true}));
});
 
// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync'], function () {
  gulp.watch("sass/**/*.scss", ['sass']);
});
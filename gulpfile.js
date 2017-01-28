var gulp          = require('gulp');
var notify        = require('gulp-notify');
var nodemon       = require('gulp-nodemon');
var livereload    = require('gulp-livereload');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var cleanCSS      = require('gulp-clean-css');
var merge         = require('merge-stream');

// Where our files are located
var jsFiles   = "client/assets/js/**/*.js";
var cssFiles   = "client/assets/css/**/*.css";
var viewFiles = "client/assets/js/**/*.html";

var vendorFiles = [   
                    "client/assets/vendor/js/jquery/dist/jquery.js", 
                    "client/assets/vendor/js/qrcode.js",
                    "client/assets/vendor/js/jquery-qrcode-0.14.0/jquery-qrcode-0.14.0.js",
                  ];

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('browserify', ['views'], function() {
  return browserify('./client/assets/js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
  return gulp.src("client/index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/'));
});

gulp.task('minify-css', function() {
  return gulp.src(cssFiles)
    .pipe(cleanCSS({compatibility: 'ie8', processImport:false}))
    .pipe(gulp.dest('./build/'));
});

gulp.task('vendor', function(){
  var jq = gulp.src(vendorFiles, {base: 'client/vendor/js/'})
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('./build'))
      .pipe(rename('vendor.min.js'))
      .pipe(uglify('vendor.min.js'))
      .pipe(gulp.dest('./build'));
  var map = gulp.src('./client/vendor/js/jquery/dist/jquery.min.map')
      .pipe(gulp.dest('./build'));

  return merge(jq, map);
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./client/assets/js/config/'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'browserify', 'vendor', 'minify-css'], function() {
  var html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./dist/'));

  var js = gulp.src(["build/vendor.min.js","build/main.js"], {base: 'build'})
               .pipe(concat('vendor.js'))
               .pipe(uglify())
               .pipe(rename('vendor.min.js'))
               .pipe(gulp.dest('./dist/'));
  var css = gulp.src('build/main.css')
               .pipe(gulp.dest('./dist/'));

  return merge(html,js);
});

gulp.task('default', ['build'], function() {
  gulp.src(cssFiles)
    .pipe(cleanCSS({compatibility: 'ie8', processImport:false}))
    .pipe(gulp.dest('./dest/'));
  // listen for changes
  livereload.listen();
  // configure nodemon
  nodemon({
    // the script to run the app
    script: './bin/www'
  }).on('restart',['build', function(){
    gulp.src('./bin/www')
      .pipe(livereload())
      .pipe(notify('Reloading page, please wait...'));
    }]);
});
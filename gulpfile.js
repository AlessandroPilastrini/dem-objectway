var gulp = require('gulp'),
connect = require('gulp-connect'),
livereload = require('gulp-livereload'),
runSequence = require('run-sequence'),
gutil = require('gulp-util'),
jshint = require('gulp-jshint'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
del = require('del'),
jade = require("gulp-jade"),
uglify = require("gulp-uglify"),
minifyCSS = require('gulp-minify-css'),
imagemin = require('gulp-imagemin');

//CLEAN BUILD
gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");

  //return gulp.src(['build'], { read: false }).pipe(clean());
  return del('./build');
});

//SCRIPTS
gulp.task('lint', function() {
    return gulp.src('./app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    var scriptOrder = ['./app/js/global.js', './app/js/ie.js', './app/js/libs/*.js'];

    return gulp.src(scriptOrder)
        .pipe(concat('site.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(livereload())
        .on('error', gutil.log);
});

gulp.task('json', function() {
    return gulp.src('./app/js/ajax/*')
        .pipe(gulp.dest('build/js/ajax'));
});

gulp.task('vendors', function() {
    return gulp.src('./app/js/vendors/**/*')
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('build/js'));
});

//SERVER
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: ['./build']
  });
});


//STYLES
gulp.task('styles', function() {
	return gulp.src('./app/sass/**/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(concat('site.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('build/css'))
        .pipe(livereload())
        .on('error', gutil.log);
});


//IMAGES

gulp.task('images', function () {
    return gulp.src('./app/images/**/*')
        //Compressione immagini - eventualmente in deploy
        //.pipe(imagemin({ progressive: true })) 
        .pipe(livereload()) 
        .pipe(gulp.dest('build/images'));
});

//VIEWS
gulp.task('views',function() {
	gulp.src('./app/views/*.jade')
		.pipe(jade({
			'pretty': false
		}))
		.pipe(gulp.dest('build'))
        .pipe(livereload())
        .on('error', gutil.log);
});

//TASKS
gulp.task('watch', function() {
    livereload.listen();
	gulp.watch('app/**/*.js', [ 'scripts' ]);
    gulp.watch('app/**/**/*.js', [ 'vendors' ]);
	gulp.watch('app/**/*.scss', [ 'styles' ]);
	gulp.watch('app/images/*', [ 'images' ]);
	gulp.watch('app/**/*.jade', [ 'views' ]);
});

gulp.task('build', ['clean'], function(callback) {
	runSequence(['scripts','json','vendors','styles','images'], 'views', callback);
});

gulp.task('default', [ 'build', 'webserver', 'watch' ]);

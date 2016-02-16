//  Plugins
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    cssnano      = require('gulp-cssnano'),
    htmlmin      = require('gulp-htmlmin'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    reload       = browserSync.reload;

//  HTML
gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload({
            stream: true
        }));
});

//  SASS
gulp.task('sass', function() {
    gulp.src('./src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers:  ['last 2 versions'],
            cascade:   false
        }))
        //  .pipe(cssnano())
        .pipe(gulp.dest('./src/css'))
        .pipe(reload({
            stream: true
        }));
});

//  Serve
gulp.task('serve', ['sass','html'], function() {
    browserSync.init({
        server: "./",
        notify: false
    });
});

//  Watch
gulp.task('watch', ['serve'], function() {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

//  Default
gulp.task('default', ['watch']);

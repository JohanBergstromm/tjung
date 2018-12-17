'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var order = require('gulp-order');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('scss', function() {
    return gulp.src('./static/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./static/dist'));
});

gulp.task('scss:watch', function() {
    gulp.watch('./static/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('js', function() {
    return gulp.src('./static/script/**/*.js')
        // .pipe(order(['vendor/**/*.js', 'modules/**/*.js']))
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./static/dist'));
});

gulp.task('js:watch', function() {
    gulp.watch('./static/script/**/*.js', gulp.series('js'));
});

gulp.task('watch:all', function() {
    gulp.watch('./static/script/**/*.js', ['js']);
    gulp.watch('./static/scss/**/*.scss', ['scss']);
});
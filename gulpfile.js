const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
    return gulp.src('./app/styles/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./app/styles/css'));
}

exports.style = style;

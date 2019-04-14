const { gulp, series } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
    return gulp.src('./app/styles/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./app/styles/css'))
            .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });

    gulp.watch('./app/styles/scss/**/*.scss', style);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/scripts/js/**/*.js').on('change', browserSync.reload);
}

function cleanDist(done) {
    del.sync('dist');
    done();
}

function createDist(done) {


    done();
}

exports.style = style;
exports.watch = watch;
exports.clean = cleanDist;
exports.build = series(cleanDist, createDist);

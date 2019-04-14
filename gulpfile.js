const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
    return gulp.src('./app/styles/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./app/styles/css'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });

    const browserSyncStyle = () => style().pipe(browserSync.stream());

    gulp.watch('./app/styles/scss/**/*.scss', browserSyncStyle);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/scripts/js/**/*.js').on('change', browserSync.reload);
}

function cleanDist(done) {
    del.sync('dist');
    done();
}

function createDist(done) {
    gulp.src('./app/index.html').pipe(gulp.dest('./dist'));
    gulp.src('./app/styles/**/*.css').pipe(gulp.dest('./dist/styles'));
    done();
}

exports.style = style;
exports.watch = watch;
exports.clean = cleanDist;

exports.build = gulp.series(
    cleanDist,
    style,
    createDist,
    );

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const path = {
    app: 'app',
    dist: 'dist',
};

function style() {
    return gulp.src(`./${path.app}/styles/scss/**/*.scss`)
            .pipe(sass())
            .pipe(gulp.dest(`./${path.app}/styles/css`));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: path.app
        }
    });

    const browserSyncStyle = () => style().pipe(browserSync.stream());

    gulp.watch(`./${path.app}/styles/scss/**/*.scss`, browserSyncStyle);
    gulp.watch(`./${path.app}/*.html`).on('change', browserSync.reload);
    gulp.watch(`./${path.app}/scripts/js/**/*.js`).on('change', browserSync.reload);
}

function cleanDist(done) {
    del.sync(path.dist);
    done();
}

function createDist(done) {
    gulp.src(`./${path.app}/index.html`).pipe(gulp.dest(`./${path.dist}`));
    gulp.src(`./${path.app}/styles/**/*.css`).pipe(gulp.dest(`./${path.dist}/styles`));
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

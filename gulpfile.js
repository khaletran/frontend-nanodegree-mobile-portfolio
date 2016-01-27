var gulp = require('gulp'),
    uglify = require('gulp-uglify'), //minify JS
    minifyCSS = require('gulp-minify-css'), //minify CSS
    htmlmin = require('gulp-htmlmin'); //minify HTML
imagemin = require('gulp-imagemin'), //optimize images
    pngquant = require('imagemin-pngquant'); //optimize .png
inlineCSS = require('gulp-inline-css'); // inline CSS
imageResize = require('gulp-image-resize'); //resize image
browserSync = require('browser-sync');

var paths = {
    scripts: ['src/js/*.js'],
    styles: ['src/css/*.css'],
    images: ['src/img/*', 'src/views/images/*'],
    contents: ['src/index.html']
};

// Minify JS files
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

// Minify CSS files
gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css/'));
});

// Inline CSS
gulp.task('inlinecss', function() {
    return gulp.src(paths.contents)
        .pipe(inlineCSS())
        .pipe(gulp.dest('dist/'));
});

// Optimize images
gulp.task('images1', function() {
    return gulp.src(paths.images[0])
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img/'));

});

gulp.task('images2', function() {
    return gulp.src(paths.images[1])
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(imageResize({
            width: 115,
            height: 55,
            crop: true,
            upscale: false
        }))
        .pipe(gulp.dest('dist/views/images/'));

});

// Minify HTML files
gulp.task('contents', ['scripts', 'styles', 'inlinecss', 'images1', 'images2'], function() {
    return gulp.src('dist/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist/'));
});

// Execute the gulp
//gulp.task('default', ['scripts', 'styles', 'inlinecss', 'images1', 'images2', 'contents']);


gulp.task('contents-watch', ['contents', 'scripts', 'styles', 'inlinecss', 'images1', 'images2'], browserSync.reload);

gulp.task('scripts-watch', ['contents', 'scripts', 'styles', 'inlinecss', 'images1', 'images2'], browserSync.reload);
gulp.task('styles-watch', ['contents', 'scripts', 'styles', 'inlinecss', 'images1', 'images2'], browserSync.reload);
gulp.task('inlinecss-watch', ['contents', 'scripts', 'styles', 'inlinecss', 'images1', 'images2'], browserSync.reload);
gulp.task('images1-watch', ['contents', 'scripts', 'styles', 'inlinecss', 'images1', 'images2'], browserSync.reload);
gulp.task('image2-watch', ['contents', 'scripts', 'styles', 'inlinecss', 'images1', 'images2'], browserSync.reload);

gulp.task('browse', function() {
    browserSync({
        port: 8080,
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(paths.contents, ['contents-watch']);

    gulp.watch(paths.scripts, ['scipts-watch']);
    gulp.watch(paths.styles, ['styles-watch']);
    gulp.watch(paths.contents, ['inlinecss-watch']);
    gulp.watch(paths.images[0], ['images1-watch']);
    gulp.watch(paths.images[1], ['images2-watch']);
});


gulp.task('default', ['scripts', 'styles', 'inlinecss', 'images1', 'images2', 'contents', 'browse']);
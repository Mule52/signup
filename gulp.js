var gulp = require('gulp');
var inject = require('gulp-inject');
var path = require('path');
var es = require('event-stream');

var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');

var paths = {
    src: {
        styles: 'content/css/**/*.less',
        html: 'client/views/index.html',
        clientJs: 'client/js/**/*.js'
    },
    dest: {
        styles: 'content/css',
        html: 'client/views',
        clientJs: 'client/js'
    }
};

gulp.task('styles', function() {
    return gulp.src(paths.src.styles)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.styles));
});

gulp.task('clientJs', function() {
    var appStream = gulp.src(paths.src.clientJs)
        .pipe(gulp.dest(paths.dest.clientJs));

    return gulp.src(paths.src.html)
        .pipe(inject(appStream))
        .pipe(gulp.dest(paths.dest.html));
});

gulp.task('dependencies', function() {
    //var target = gulp.src(paths.src.html);
    //var sources = gulp.src(['./bower_components/**/*.js', './bower_components/**/*.css'], {read: false});
    //return target.pipe(inject(sources))
    //    .pipe(gulp.dest('./client/views'));
});

gulp.task('watch', function() {
    gulp.watch(paths.src.styles, ['styles']);
});

gulp.task('default', ['styles', 'clientJs', 'dependencies']);

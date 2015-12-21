var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    bower        = require('gulp-bower'),
    bourbon      = require('node-bourbon'),
    neat         = require('node-neat'),
    minifyCss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify');

var config = {
    bowerDir: './bower_components'
}

var scssDependencies = [
    config.bowerDir + '/normalize-css/normalize.css',
    './app/resources/sass/application.scss'
]

var jsDependencies = [
    config.bowerDir + '/jquery/dist/jquery.js',
    './app/resources/js/application.js'
]

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('sass', function() {
    return gulp.src(scssDependencies)
        .pipe(sass({
            includePaths: neat.includePaths
        }))
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
    return gulp.src(jsDependencies)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
    gulp.watch('./app/resources/js/**.*', ['js']);
    gulp.watch('./app/resources/sass/**.*', ['sass']);
});

gulp.task('default', ['bower', 'sass', 'js']);

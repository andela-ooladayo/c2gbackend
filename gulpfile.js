var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    exit = require('gulp-exit'),
    nodemon = require('gulp-nodemon');


gulp.task('lint', function() {
    gulp.src(['index.js','./app/**/*.js','gulpfile.js']).pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('nodemon', function () {
  nodemon({ script: './bin/www', stdout: true })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('>> node restart');
    });
});



gulp.task('production', ['nodemon']);
gulp.task('default', ['nodemon', 'lint']);

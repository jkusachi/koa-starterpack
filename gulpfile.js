'use strict';

var gulp          = require('gulp');
var gutil         = require('gulp-util');
var webpack       = require('gulp-webpack');
var runSequence   = require('run-sequence');
var nodemon       = require('gulp-nodemon');
var sass          = require('gulp-sass');
var livereload    = require('gulp-livereload');

const SASS_PATH = './public/styles/**/*.scss';


gulp.task('development', function(){
  runSequence('build',  'sass', 'server', 'watch');
});

gulp.task('build', function() {
  return gulp.src('./public/scripts/entry.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('sass', function () {
  gulp.src(SASS_PATH)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('server', function(){
  nodemon({
    script: './server.js',
    ext: 'js html css hbs',
    env: { 'NODE_ENV': 'development' },
    ignore: ['dist','public/*'],
    nodeArgs: ['--harmony']
  });
});

gulp.task('watch', function(){

  livereload.listen({
    port: 15050
  });
  gulp.watch('app/**/*').on('change', function(file) {
    livereload.changed(file.path);
  });

  gulp.watch(SASS_PATH, ['sass']);
});

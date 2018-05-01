/**
 * @author fanwtf 20180501
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/**
 * module YYIMSDK
 */
var YYIMSDKFileList = [
    /* sdk lib */
    './src/lib/customize/**/*.js',

    './src/lib/extention/**/*.js',
    './src/lib/prototypeExtention/**/*.js',
    './src/util/YYIMCommonUtil.js',

    './src/lib/upload/**/*.js',
    './src/lib/jump/**/*.js',

    './src/lib/jsjac/xmlextras.js',
    './src/lib/jsjac/**/*.js',
    '!./src/lib/jsjac/JSJaC.js',
    './dist/YYIMSDK.esm.js'
];

gulp.task('dev', function() {
    gulp.src(YYIMSDKFileList)
        .pipe(concat('YYIMSDK.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function() {
    gulp.src(YYIMSDKFileList)
        .pipe(concat('YYIMSDK.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


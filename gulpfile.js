/**
 * @author fanwtf 20180501
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var webpack = require('webpack-stream');
var named = require('vinyl-named');
var webpackConfig = require("./webpack.config.js");

/**
 * 用webpack-stream处理es6模块
 */
gulp.task('webpack', function() {
    return gulp.src('./src/index.js')
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(rename('YYIMSDK.esm.js'))
    .pipe(gulp.dest('./dist/esm/'));
});

/**
 * 全部的资源文件
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
    './dist/esm/YYIMSDK.esm.js'
];

/**
 * js合并
 */
gulp.task('fordev', function() {
    gulp.src(YYIMSDKFileList)
        .pipe(concat('YYIMSDK.js'))
        .pipe(gulp.dest('./dist'));
});

/**
 * js合并和压缩
 */
gulp.task('forbuild', function() {
    gulp.src(YYIMSDKFileList)
        .pipe(concat('YYIMSDK.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

/**
 * 监控任务，自动执行dev的任务
 */
gulp.task('devWatcher', function() {
    gulp.watch('./src/**/*.js', ['webpack', 'fordev']);
});

gulp.task('dev', [
    'webpack',
    'fordev'
], function(){
    gulp.run(['devWatcher']);
});

gulp.task('build', [
    'webpack',
    'forbuild'
]);
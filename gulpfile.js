/**
 * @author rongqb 20170208
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/**
 * module YYIMSDK base
 */
var YYIMSDKBASEFileList = [
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

    /* sdk ai */
    './src/util/YYAIAbility.js',

    /* sdk core */
    './src/core/sdk.prefix',
    './src/util/YYIMJIDUtil.js',
    './src/util/YYIMConsoleLogger.js',
    './src/config/**/*.js',
    './src/connection/**/*.js',
    './src/core/manager.js',
    './src/core/sdk.suffix'
];

gulp.task('YYIMSDKBASE', function() {
    gulp.src(YYIMSDKBASEFileList)
        .pipe(concat('YYIMSDK.js'))
        .pipe(gulp.dest('./dist/base'))
        .pipe(rename('YYIMSDK.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/base'));
});

gulp.task('YYIMSDKBASEWatcher', function() {
    gulp.watch(YYIMSDKBASEFileList, ['YYIMSDKBASE']);
});


/**
 * module YYIMSDK final
 */
var YYIMSDKFileList = [
    './dist/base/YYIMSDK.js',
    './dist/module/**/*.js',
    '!./dist/module/**/*.min.js'
];

gulp.task('YYIMSDK', function() {
    gulp.src(YYIMSDKFileList)
        .pipe(concat('YYIMSDK.js'))
        .pipe(gulp.dest('./dist/sdk'))
        .pipe(rename('YYIMSDK.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/sdk'));
});

gulp.task('YYIMSDKWatcher', function() {
    gulp.watch(YYIMSDKFileList, ['YYIMSDK']);
});

/**
 * module digest
 */
var digestModuleFileList = [
    './src/core/sdkExtend.prefix',
    './src/module/digest/Manager.js',
    './src/module/digest/Extender.js',
    './src/core/sdkExtend.suffix'
];

gulp.task('digest', function() {
    gulp.src(digestModuleFileList)
        .pipe(concat('YYIMDigest.js'))
        .pipe(gulp.dest('./dist/module/digest'))
        .pipe(rename('YYIMDigest.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/digest'));
})

gulp.task('digestWatcher', function() {
    gulp.watch(digestModuleFileList, ['digest']);
})

/**
 * module roster
 */
var rosterModuleFileList = [
    './src/core/sdkExtend.prefix', 
    './src/module/roster/Manager.js', 
    './src/module/roster/Extender.js', 
    './src/core/sdkExtend.suffix'
];

gulp.task('roster', function() {
    gulp.src(rosterModuleFileList)
        .pipe(concat('YYIMRoster.js'))
        .pipe(gulp.dest('./dist/module/roster'))
        .pipe(rename('YYIMRoster.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/roster'));
})

gulp.task('rosterWatcher', function() {
    gulp.watch(rosterModuleFileList, ['roster']);
})

/**
 * module group
 */
var groupModuleFileList = [
    './src/core/sdkExtend.prefix', 
    './src/module/group/Manager.js', 
    './src/module/group/Extender.js', 
    './src/core/sdkExtend.suffix'
];

gulp.task('group', function() {
    gulp.src(groupModuleFileList)
        .pipe(concat('YYIMGroup.js'))
        .pipe(gulp.dest('./dist/module/group'))
        .pipe(rename('YYIMGroup.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/group'));
})

gulp.task('groupWatcher', function() {
    gulp.watch(rosterModuleFileList, ['group']);
})

/**
 * module pubaccount
 */
var pubaccountModuleFileList = [
    './src/core/sdkExtend.prefix', 
    './src/module/pubaccount/Manager.js', 
    './src/module/pubaccount/Extender.js', 
    './src/core/sdkExtend.suffix'
];

gulp.task('pubaccount', function() {
    gulp.src(pubaccountModuleFileList)
        .pipe(concat('YYIMPubaccount.js'))
        .pipe(gulp.dest('./dist/module/pubaccount'))
        .pipe(rename('YYIMPubaccount.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/pubaccount'));
})

gulp.task('pubaccountWatcher', function() {
    gulp.watch(pubaccountModuleFileList, ['pubaccount']);
})

/**
 * module extend
 */
var extendModuleFileList = [
    './src/core/sdkExtend.prefix', 
    './src/module/extend/Manager.js', 
    './src/module/extend/Extender.js', 
    './src/core/sdkExtend.suffix'
];

gulp.task('extend', function() {
    gulp.src(extendModuleFileList)
        .pipe(concat('YYIMExtend.js'))
        .pipe(gulp.dest('./dist/module/extend'))
        .pipe(rename('YYIMExtend.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/extend'));
})

gulp.task('extendWatcher', function() {
    gulp.watch(extendModuleFileList, ['extend']);
})

/**
 * module profile
 */
var profileModuleFileList = [
    './src/core/sdkExtend.prefix', 
    './src/module/profile/Manager.js', 
    './src/module/profile/Extender.js', 
    './src/core/sdkExtend.suffix'
];

gulp.task('profile', function() {
    gulp.src(profileModuleFileList)
        .pipe(concat('YYIMProfile.js'))
        .pipe(gulp.dest('./dist/module/profile'))
        .pipe(rename('YYIMProfile.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/profile'));
})

gulp.task('profileWatcher', function() {
    gulp.watch(profileModuleFileList, ['profile']);
})

/**
 * module message
 */
var messageModuleFileList = [
    './src/core/sdkExtend.prefix', 
    './src/module/message/Manager.js', 
    './src/module/message/Extender.js', 
    './src/core/sdkExtend.suffix'
];

gulp.task('message', function() {
    gulp.src(messageModuleFileList)
        .pipe(concat('YYIMMessage.js'))
        .pipe(gulp.dest('./dist/module/message'))
        .pipe(rename('YYIMMessage.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/message'));
})

gulp.task('messageWatcher', function() {
    gulp.watch(messageModuleFileList, ['message']);
})

/**
 * module upload
 */
var uploadModuleFileList = [
    './src/core/sdkExtend.prefix',
    './src/module/upload/FileUpload.js',
    './src/module/upload/YYIMUploader.js',
    './src/module/upload/Extender.js',
    './src/core/sdkExtend.suffix'
];

gulp.task('upload', function() {
    gulp.src(uploadModuleFileList)
        .pipe(concat('YYIMUpload.js'))
        .pipe(gulp.dest('./dist/module/upload'))
        .pipe(rename('YYIMUpload.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/upload'));
})

gulp.task('uploadWatcher', function() {
    gulp.watch(uploadModuleFileList, ['upload']);
})

/**
 * module download
 */
var downloadModuleFileList = [
    './src/core/sdkExtend.prefix',
    './src/module/download/Manager.js',
    './src/module/download/Extender.js',
    './src/core/sdkExtend.suffix'
];

gulp.task('download', function() {
    gulp.src(downloadModuleFileList)
        .pipe(concat('YYIMDownload.js'))
        .pipe(gulp.dest('./dist/module/download'))
        .pipe(rename('YYIMDownload.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/download'));
})

gulp.task('downloadWatcher', function() {
    gulp.watch(downloadModuleFileList, ['download']);
})


/**
 * module input_state
 */
var InputStateModuleFileList = [
    './src/core/sdkExtend.prefix',
    './src/module/input_state/Manager.js',
    './src/module/input_state/Extender.js',
    './src/core/sdkExtend.suffix'
];

gulp.task('input_state', function() {
    gulp.src(InputStateModuleFileList)
        .pipe(concat('YYIMInputState.js'))
        .pipe(gulp.dest('./dist/module/input_state'))
        .pipe(rename('YYIMInputState.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/input_state'));
})

gulp.task('input_stateWatcher', function() {
    gulp.watch(InputStateModuleFileList, ['input_state']);
})

/**
 * module todo
 */
var TodoModuleFileList = [
    './src/core/sdkExtend.prefix',
    './src/module/todo/Manager.js',
    './src/module/todo/Extender.js',
    './src/core/sdkExtend.suffix'
];

gulp.task('todo', function() {
    gulp.src(TodoModuleFileList)
        .pipe(concat('YYIMTodo.js'))
        .pipe(gulp.dest('./dist/module/todo'))
        .pipe(rename('YYIMTodo.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/todo'));
})

gulp.task('todoWatcher', function() {
    gulp.watch(TodoModuleFileList, ['todo']);
})

/**
 * module aiability
 */
var AIAbilityModuleFileList = [
    './src/core/sdkExtend.prefix',
    './src/module/aiability/Manager.js',
    './src/module/aiability/Extender.js',
    './src/core/sdkExtend.suffix'
];

gulp.task('aiability', function() {
    gulp.src(AIAbilityModuleFileList)
        .pipe(concat('YYIMAIAbility.js'))
        .pipe(gulp.dest('./dist/module/aiability'))
        .pipe(rename('YYIMAIAbility.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/module/aiability'));
})

gulp.task('aiabilityWatcher', function() {
    gulp.watch(AIAbilityModuleFileList, ['aiability']);
})

gulp.task('dev', [
    'YYIMSDKBASE', 'YYIMSDKBASEWatcher',
    'message', 'messageWatcher',
    'upload', 'uploadWatcher',
    'download', 'downloadWatcher',
    'digest', 'digestWatcher',
    'roster', 'rosterWatcher',
    'group', 'groupWatcher',
    'pubaccount', 'pubaccountWatcher',
    'extend', 'extendWatcher',
    'todo', 'todoWatcher',
    'profile', 'profileWatcher',
    'aiability', 'aiabilityWatcher'
], function() {
    gulp.run('YYIMSDK', 'YYIMSDKWatcher');
});

gulp.task('build', [
    'YYIMSDKBASE',
    'message',
    'upload',
    'download',
    'digest',
    'roster',
    'group',
    'pubaccount',
    'extend',
    'todo',
    'profile',
    'aiability',
    'YYIMSDK'
], function() {
    // gulp.run('YYIMSDK', 'YYIMSDKWatcher');
});

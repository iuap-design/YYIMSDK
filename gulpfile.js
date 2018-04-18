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
    '../source/lib/customize/**/*.js',

    '../source/lib/extention/**/*.js',
    '../source/lib/prototypeExtention/**/*.js',
    '../source/util/YYIMCommonUtil.js',

    '../source/lib/upload/**/*.js',
    '../source/lib/jump/**/*.js',

    '../source/lib/jsjac/xmlextras.js',
    '../source/lib/jsjac/**/*.js',
    '!../source/lib/jsjac/JSJaC.js',

    /* sdk ai */
    '../source/util/YYAIAbility.js',

    /* sdk core */
    '../source/core/sdk.prefix',
    '../source/util/YYIMJIDUtil.js',
    '../source/util/YYIMConsoleLogger.js',
    '../source/config/**/*.js',
    '../source/connection/**/*.js',
    '../source/core/manager.js',
    '../source/core/sdk.suffix'
];

gulp.task('YYIMSDKBASE', function() {
    gulp.src(YYIMSDKBASEFileList)
        .pipe(concat('YYIMSDK.js'))
        .pipe(gulp.dest('../publish/base'))
        .pipe(rename('YYIMSDK.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/base'));
});

gulp.task('YYIMSDKBASEWatcher', function() {
    gulp.watch(YYIMSDKBASEFileList, ['YYIMSDKBASE']);
});


/**
 * module YYIMSDK final
 */
var YYIMSDKFileList = [
    '../publish/base/YYIMSDK.js',
    '../publish/module/**/*.js',
    '!../publish/module/**/*.min.js'
];

gulp.task('YYIMSDK', function() {
    gulp.src(YYIMSDKFileList)
        .pipe(concat('YYIMSDK.js'))
        .pipe(gulp.dest('../publish/sdk'))
        .pipe(rename('YYIMSDK.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/sdk'));
});

gulp.task('YYIMSDKWatcher', function() {
    gulp.watch(YYIMSDKFileList, ['YYIMSDK']);
});

/**
 * module digest
 */
var digestModuleFileList = ['../source/core/sdkExtend.prefix', '../source/module/digest/Manager.js', '../source/module/digest/Extender.js', '../source/core/sdkExtend.suffix'];

gulp.task('digest', function() {
    gulp.src(digestModuleFileList)
        .pipe(concat('YYIMDigest.js'))
        .pipe(gulp.dest('../publish/module/digest'))
        .pipe(rename('YYIMDigest.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/digest'));
})

gulp.task('digestWatcher', function() {
    gulp.watch(digestModuleFileList, ['digest']);
})

/**
 * module roster
 */
var rosterModuleFileList = ['../source/core/sdkExtend.prefix', '../source/module/roster/Manager.js', '../source/module/roster/Extender.js', '../source/core/sdkExtend.suffix'];

gulp.task('roster', function() {
    gulp.src(rosterModuleFileList)
        .pipe(concat('YYIMRoster.js'))
        .pipe(gulp.dest('../publish/module/roster'))
        .pipe(rename('YYIMRoster.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/roster'));
})

gulp.task('rosterWatcher', function() {
    gulp.watch(rosterModuleFileList, ['roster']);
})

/**
 * module group
 */
var groupModuleFileList = ['../source/core/sdkExtend.prefix', '../source/module/group/Manager.js', '../source/module/group/Extender.js', '../source/core/sdkExtend.suffix'];

gulp.task('group', function() {
    gulp.src(groupModuleFileList)
        .pipe(concat('YYIMGroup.js'))
        .pipe(gulp.dest('../publish/module/group'))
        .pipe(rename('YYIMGroup.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/group'));
})

gulp.task('groupWatcher', function() {
    gulp.watch(rosterModuleFileList, ['group']);
})

/**
 * module pubaccount
 */
var pubaccountModuleFileList = ['../source/core/sdkExtend.prefix', '../source/module/pubaccount/Manager.js', '../source/module/pubaccount/Extender.js', '../source/core/sdkExtend.suffix'];

gulp.task('pubaccount', function() {
    gulp.src(pubaccountModuleFileList)
        .pipe(concat('YYIMPubaccount.js'))
        .pipe(gulp.dest('../publish/module/pubaccount'))
        .pipe(rename('YYIMPubaccount.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/pubaccount'));
})

gulp.task('pubaccountWatcher', function() {
    gulp.watch(pubaccountModuleFileList, ['pubaccount']);
})

/**
 * module extend
 */
var extendModuleFileList = ['../source/core/sdkExtend.prefix', '../source/module/extend/Manager.js', '../source/module/extend/Extender.js', '../source/core/sdkExtend.suffix'];

gulp.task('extend', function() {
    gulp.src(extendModuleFileList)
        .pipe(concat('YYIMExtend.js'))
        .pipe(gulp.dest('../publish/module/extend'))
        .pipe(rename('YYIMExtend.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/extend'));
})

gulp.task('extendWatcher', function() {
    gulp.watch(extendModuleFileList, ['extend']);
})

/**
 * module profile
 */
var profileModuleFileList = ['../source/core/sdkExtend.prefix', '../source/module/profile/Manager.js', '../source/module/profile/Extender.js', '../source/core/sdkExtend.suffix'];

gulp.task('profile', function() {
    gulp.src(profileModuleFileList)
        .pipe(concat('YYIMProfile.js'))
        .pipe(gulp.dest('../publish/module/profile'))
        .pipe(rename('YYIMProfile.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/profile'));
})

gulp.task('profileWatcher', function() {
    gulp.watch(profileModuleFileList, ['profile']);
})

/**
 * module message
 */
var messageModuleFileList = ['../source/core/sdkExtend.prefix', '../source/module/message/Manager.js', '../source/module/message/Extender.js', '../source/core/sdkExtend.suffix'];

gulp.task('message', function() {
    gulp.src(messageModuleFileList)
        .pipe(concat('YYIMMessage.js'))
        .pipe(gulp.dest('../publish/module/message'))
        .pipe(rename('YYIMMessage.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/message'));
})

gulp.task('messageWatcher', function() {
    gulp.watch(messageModuleFileList, ['message']);
})

/**
 * module upload
 */
var uploadModuleFileList = [
    '../source/core/sdkExtend.prefix',
    '../source/module/upload/FileUpload.js',
    '../source/module/upload/YYIMUploader.js',
    '../source/module/upload/Extender.js',
    '../source/core/sdkExtend.suffix'
];

gulp.task('upload', function() {
    gulp.src(uploadModuleFileList)
        .pipe(concat('YYIMUpload.js'))
        .pipe(gulp.dest('../publish/module/upload'))
        .pipe(rename('YYIMUpload.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/upload'));
})

gulp.task('uploadWatcher', function() {
    gulp.watch(uploadModuleFileList, ['upload']);
})

/**
 * module download
 */
var downloadModuleFileList = [
    '../source/core/sdkExtend.prefix',
    '../source/module/download/Manager.js',
    '../source/module/download/Extender.js',
    '../source/core/sdkExtend.suffix'
];

gulp.task('download', function() {
    gulp.src(downloadModuleFileList)
        .pipe(concat('YYIMDownload.js'))
        .pipe(gulp.dest('../publish/module/download'))
        .pipe(rename('YYIMDownload.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/download'));
})

gulp.task('downloadWatcher', function() {
    gulp.watch(downloadModuleFileList, ['download']);
})


/**
 * module input_state
 */
var InputStateModuleFileList = [
    '../source/core/sdkExtend.prefix',
    '../source/module/input_state/Manager.js',
    '../source/module/input_state/Extender.js',
    '../source/core/sdkExtend.suffix'
];

gulp.task('input_state', function() {
    gulp.src(InputStateModuleFileList)
        .pipe(concat('YYIMInputState.js'))
        .pipe(gulp.dest('../publish/module/input_state'))
        .pipe(rename('YYIMInputState.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/input_state'));
})

gulp.task('input_stateWatcher', function() {
    gulp.watch(InputStateModuleFileList, ['input_state']);
})

/**
 * module todo
 */
var TodoModuleFileList = [
    '../source/core/sdkExtend.prefix',
    '../source/module/todo/Manager.js',
    '../source/module/todo/Extender.js',
    '../source/core/sdkExtend.suffix'
];

gulp.task('todo', function() {
    gulp.src(TodoModuleFileList)
        .pipe(concat('YYIMTodo.js'))
        .pipe(gulp.dest('../publish/module/todo'))
        .pipe(rename('YYIMTodo.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/todo'));
})

gulp.task('todoWatcher', function() {
    gulp.watch(TodoModuleFileList, ['todo']);
})

/**
 * module aiability
 */
var AIAbilityModuleFileList = [
    '../source/core/sdkExtend.prefix',
    '../source/module/aiability/Manager.js',
    '../source/module/aiability/Extender.js',
    '../source/core/sdkExtend.suffix'
];

gulp.task('aiability', function() {
    gulp.src(AIAbilityModuleFileList)
        .pipe(concat('YYIMAIAbility.js'))
        .pipe(gulp.dest('../publish/module/aiability'))
        .pipe(rename('YYIMAIAbility.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../publish/module/aiability'));
})

gulp.task('aiabilityWatcher', function() {
    gulp.watch(AIAbilityModuleFileList, ['aiability']);
})

gulp.task('default', [
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

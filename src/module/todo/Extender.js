import { YYIMManager } from '../../core/manager';
import {
    getTodoDigset,
    getHistoryTodo,
    sendToDoReceipts,
    sendToDoReadedReceipts
} from './Manager';

/**
 * 拉取代办通知摘要 rongqb 20170831
 * @param {Object} arg {
 * 	success: function,
 *  error: function
 * }
 */
YYIMManager.prototype.getTodoDigset = function(arg) {
    getTodoDigset(arg);
};

/**
 * 发送代办回执 rongqb 20171114
 * @param {Object} arg
 */
YYIMManager.prototype.sendToDoReceipts = function(arg) {
    sendToDoReceipts(arg);
};


/**
 * 发送代办已读回执 rongqb 20180504
 * @param {Object} arg
 */
YYIMManager.prototype.sendToDoReadedReceipts = function(arg) {
    if (arg &&
        arg.qz_id &&
        arg.appId &&
        arg.businessKey &&
        (arg.accessToken || arg.sessionId)) {

        sendToDoReadedReceipts(arg);
    } else {
        arg && arg.error && arg.error();
    }
};

/**
 * 拉取代办通知历史 nizhja 20170831
 * @param {Object} arg {
 *  success: function,
 *  error: function,
 *  beforeTs: Number, //历史结束时间，不填时取当前时间
 *  todoState: 0/1 //0: 未处理待办 1:已处理待办
 *  pageSize：Number //default: 10
 * }
 */
YYIMManager.prototype.getHistoryTodo = function(arg) {
	getHistoryTodo(arg);
};

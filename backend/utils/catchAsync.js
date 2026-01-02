// backend/src/utils/catchAsync.js
module.exports = function (fn) {
    return function (req, res, next) {
        // 確保 fn 執行的結果會被 Promise 化並正確轉發錯誤
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
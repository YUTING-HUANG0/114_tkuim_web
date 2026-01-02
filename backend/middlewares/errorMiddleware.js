// backend/src/middlewares/errorMiddleware.js
const AppError = require('../utils/AppError');

// 必須使用標準 function 宣告，確保 Express 正確識別 4 個參數
module.exports = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // 預設為開發環境，除非明確設定為 production
    const isDev = (process.env.NODE_ENV || 'development').trim() === 'development';

    if (isDev) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // 生產環境
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            console.error('ERROR', err);
            res.status(500).json({
                status: 'error',
                message: '伺服器發生異常，請稍後再試'
            });
        }
    }
};
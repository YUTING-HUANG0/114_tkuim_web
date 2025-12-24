const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

/**
 * 簽發 JWT Token
 * @param {string} id - 使用者 ID
 */
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d'
    });
};

/**
 * 註冊新使用者
 */
exports.register = async (userData) => {
    const { username, password } = userData;

    // 1. 檢查使用者是否已存在 (User.js 已設定 unique，此處可做預檢提供更友善錯誤)
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new AppError('該用戶名已被使用', 400);
    }

    // 2. 建立使用者 (注意：不要在這裡 hash，User.js 的 pre-save 會自動處理)
    const newUser = await User.create({
        username,
        password
    });

    // 3. 簽發 Token
    const token = signToken(newUser._id);

    return {
        user: newUser,
        token
    };
};

/**
 * 使用者登入
 */
exports.login = async (username, password) => {
    // 1. 檢查是否輸入帳密
    if (!username || !password) {
        throw new AppError('請提供用戶名和密碼', 400);
    }

    // 2. 尋找使用者
    const user = await User.findOne({ username });

    // 3. 比對密碼 (使用 bcrypt 比較明文與資料庫中的 hash 值)
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError('用戶名或密碼錯誤', 401);
    }

    // 4. 簽發 Token
    const token = signToken(user._id);

    return {
        user,
        token
    };
};
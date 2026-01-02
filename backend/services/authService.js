const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d'
    });
};

exports.register = async (userData) => {
    const { username, password } = userData;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new AppError('該用戶名已被使用', 400);
    }

    // User.js 的 pre-save 會處理 hash
    const newUser = await User.create({
        username,
        password
    });

    const token = signToken(newUser._id);

    return {
        user: newUser,
        token
    };
};

exports.login = async (username, password) => {
    if (!username || !password) {
        throw new AppError('請提供用戶名和密碼', 400);
    }

    // 強制選取 password 欄位以供比對
    const user = await User.findOne({ username }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError('用戶名或密碼錯誤', 401);
    }

    const token = signToken(user._id);

    return {
        user,
        token
    };
};
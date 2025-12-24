const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
    const { user, token } = await authService.register(req.body);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: {
                id: user._id,
                username: user.username
            }
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const { user, token } = await authService.login(username, password);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: {
                id: user._id,
                username: user.username
            }
        }
    });
});

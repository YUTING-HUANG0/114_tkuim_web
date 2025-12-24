const confessionService = require('../services/confessionService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createConfession = catchAsync(async (req, res, next) => {
    const { content } = req.body;

    if (!content) {
        return next(new AppError('Content is required', 400));
    }

    const newConfession = await confessionService.createConfession(req.user._id, content);

    res.status(201).json({
        status: 'success',
        data: {
            confession: newConfession
        }
    });
});

exports.getRandomConfession = catchAsync(async (req, res, next) => {
    const confession = await confessionService.getRandomConfession(req.user._id);

    if (!confession) {
        return res.status(200).json({
            status: 'success',
            message: '目前沒有其他人的秘密可供讀取，請稍後再試。',
            data: null
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            confession
        }
    });
});

exports.getMyConfessions = catchAsync(async (req, res, next) => {
    const confessions = await confessionService.getUserConfessions(req.user._id);

    res.status(200).json({
        status: 'success',
        results: confessions.length,
        data: {
            confessions
        }
    });
});

exports.updateConfession = catchAsync(async (req, res, next) => {
    const { content } = req.body;

    if (!content) {
        return next(new AppError('Content is required', 400));
    }

    const updatedConfession = await confessionService.updateConfession(req.user._id, req.params.id, content);

    res.status(200).json({
        status: 'success',
        data: {
            confession: updatedConfession
        }
    });
});

exports.deleteConfession = catchAsync(async (req, res, next) => {
    await confessionService.deleteConfession(req.user._id, req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

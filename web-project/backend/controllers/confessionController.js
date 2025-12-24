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
            message: 'No confessions found from other users.',
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

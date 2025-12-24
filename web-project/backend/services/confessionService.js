const Confession = require('../models/Confession');
const AppError = require('../utils/AppError');

exports.createConfession = async (userId, content) => {
    const newConfession = await Confession.create({
        content,
        author: userId
    });
    return newConfession;
};

exports.getRandomConfession = async (userId) => {
    // Aggregate to get one random confession that is NOT authored by the current user
    const confession = await Confession.aggregate([
        { $match: { author: { $ne: userId } } },
        { $sample: { size: 1 } }
    ]);

    if (!confession || confession.length === 0) {
        return null;
    }

    return confession[0];
};

exports.getUserConfessions = async (userId) => {
    const confessions = await Confession.find({ author: userId }).sort({ createdAt: -1 });
    return confessions;
};

exports.updateConfession = async (userId, confessionId, content) => {
    const confession = await Confession.findOne({ _id: confessionId, author: userId });

    if (!confession) {
        throw new AppError('找不到該告解紀錄或您沒有權限編輯', 404);
    }

    confession.content = content;
    await confession.save();

    return confession;
};

exports.deleteConfession = async (userId, confessionId) => {
    const confession = await Confession.findOneAndDelete({ _id: confessionId, author: userId });

    if (!confession) {
        throw new AppError('找不到該告解紀錄或您沒有權限刪除', 404);
    }

    return null;
};

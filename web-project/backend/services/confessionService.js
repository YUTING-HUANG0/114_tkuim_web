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

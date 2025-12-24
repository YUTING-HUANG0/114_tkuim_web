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
        // Fallback if no other confessions exist (or only own exist)
        // Maybe return null or a specific message? 
        // For MVP, if empty, we might just look for ANY or return null.
        // Let's try to get ANY if the filtered one is empty strictly for testing purposes if user is alone
        // But logically, "Confession" implies hearing others.
        return null;
    }

    return confession[0];
};

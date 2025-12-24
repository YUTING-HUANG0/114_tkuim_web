const express = require('express');
const confessionController = require('../controllers/confessionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes after this middleware
router.use(authMiddleware.protect);

router.post('/', confessionController.createConfession);
router.get('/random', confessionController.getRandomConfession);
router.get('/my', confessionController.getMyConfessions);

module.exports = router;

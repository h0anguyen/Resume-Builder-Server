const express = require('express');
const { evaluateUserProfile } = require('../controller/openai.controller');

const router = express.Router();

// đánh giá profile của người dùng
router.post('/profile/evaluate/:id', evaluateUserProfile);

module.exports = router;

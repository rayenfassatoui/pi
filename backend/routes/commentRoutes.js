const express = require('express');
const router = express.Router({ mergeParams: true });
const { addComment, deleteComment } = require('../controllers/recipeController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addComment);
router.delete('/:commentId', auth, deleteComment);

module.exports = router;

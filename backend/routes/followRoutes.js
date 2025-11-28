const express = require('express');
const router = express.Router();
const { followUser, unfollowUser, getFollowers, getFollowing } = require('../controllers/followController');
const auth = require('../middleware/authMiddleware');

router.put('/:id/follow', auth, followUser);
router.put('/:id/unfollow', auth, unfollowUser);
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);

module.exports = router;

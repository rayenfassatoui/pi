const User = require('../models/User');

const followUser = async (req, res) => {
    try {
        if (req.user.id === req.params.id) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToFollow) return res.status(404).json({ message: 'User not found' });

        if (!currentUser.following.includes(req.params.id)) {
            await currentUser.updateOne({ $push: { following: req.params.id } });
            await userToFollow.updateOne({ $push: { followers: req.user.id } });
            res.json({ message: 'User followed' });
        } else {
            res.status(400).json({ message: 'You already follow this user' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const unfollowUser = async (req, res) => {
    try {
        if (req.user.id === req.params.id) {
            return res.status(400).json({ message: 'You cannot unfollow yourself' });
        }

        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToUnfollow) return res.status(404).json({ message: 'User not found' });

        if (currentUser.following.includes(req.params.id)) {
            await currentUser.updateOne({ $pull: { following: req.params.id } });
            await userToUnfollow.updateOne({ $pull: { followers: req.user.id } });
            res.json({ message: 'User unfollowed' });
        } else {
            res.status(400).json({ message: 'You do not follow this user' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getFollowers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers', 'name avatar');
        res.json(user.followers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('following', 'name avatar');
        res.json(user.following);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { followUser, unfollowUser, getFollowers, getFollowing };

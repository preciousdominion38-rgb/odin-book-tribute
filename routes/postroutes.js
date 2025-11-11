const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postcontroller');

// feed
router.get('/feed', postCtrl.getFeed);

// create post
router.post('/posts', postCtrl.createPost);

// delete post (form POST)
router.post('/posts/:id/delete', postCtrl.deletePost);

// toggle like (AJAX)
router.post('/posts/:id/toggle-like', postCtrl.toggleLike);

module.exports = router;

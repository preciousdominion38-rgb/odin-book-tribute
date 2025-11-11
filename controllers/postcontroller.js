const Post = require('../models/post');
const authCtrl = require('./authcontroller');

exports.getFeed = async (req, res) => {
  const user = await authCtrl.getCurrentUser(req);
  const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'username');
  res.render('feed', { user, posts });
};

exports.createPost = async (req, res) => {
  try {
    const user = await authCtrl.getCurrentUser(req);
    if (!user) return res.redirect('/auth/login');
    const { content } = req.body;
    if (!content || !content.trim()) return res.redirect('/feed');
    await Post.create({ author: user._id, authorName: user.username, content: content.trim() });
    res.redirect('/feed');
  } catch (err) {
    console.error(err);
    res.redirect('/feed');
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const user = await authCtrl.getCurrentUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });

    const idx = post.likes.findIndex(id => id.toString() === user._id.toString());
    if (idx === -1) post.likes.push(user._id);
    else post.likes.splice(idx, 1);

    await post.save();
    res.json({ likesCount: post.likes.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const user = await authCtrl.getCurrentUser(req);
    if (!user) return res.redirect('/auth/login');
    const post = await Post.findById(req.params.id);
    if (!post) return res.redirect('/feed');
    if (post.author.toString() !== user._id.toString()) return res.redirect('/feed');
    await post.remove();
    res.redirect('/feed');
  } catch (err) {
    console.error(err);
    res.redirect('/feed');
  }
};

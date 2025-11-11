import User from "../models/user.js";
import Post from "../models/post.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });

// Render pages
export const getLogin = (req, res) => res.render("login");
export const getRegister = (req, res) => res.render("register");
export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name").sort({ createdAt: -1 });
    res.render("feed", { posts });
  } catch (err) {
    console.log(err);
    res.render("feed", { posts: [] });
  }
};

// Auth actions
export const postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
};

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.redirect("/login");

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) return res.redirect("/login");

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/login");
  }
};

export const postFeed = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;
    if (!userId) return res.redirect("/login");

    await Post.create({ user: userId, content });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

export const getLogout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

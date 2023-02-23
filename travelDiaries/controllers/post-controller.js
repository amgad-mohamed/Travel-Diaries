const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

const geAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (error) {
    return console.log(error);
  }
  if (!posts) {
    return res.status(500).json({ message: "Unexpected Error Pccurred" });
  }
  return res.status(200).json(posts);
};

const addPost = async (req, res) => {
  const { title, description, location, date, image, user } = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !image &&
    image.trim() === "" &&
    !user
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found" });
  }

  let post;
  try {
    post = new Post({
      title,
      description,
      image,
      location,
      user,
      date: new Date(`${date}`),
    });

    const session = await mongoose.startSession();

    session.startTransaction();
    existingUser.posts.push(post);
    await existingUser.save({ session });
    post = await post.save(session);
    session.commitTransaction();
  } catch (error) {
    console.log(error);
  }
  if (!post) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(201).json({ post });
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  let post;
  try {
    post = await Post.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!post) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ post });
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, description, location, date, image } = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !image &&
    image.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let post;
  try {
    post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
    });
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(500).json({ message: "Unable To Update" });
  }
  return res.status(200).json({ message: "Updated Successfully" });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  let post;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    post = await Post.findById(id).populate("user");
    post.user.posts.pull(post);
    await post.user.save({ session });
    post = await Post.findByIdAndRemove(id);
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  res.status(200).json({ message: "Deleted Successfully" });
};

module.exports = { geAllPosts, addPost, getPostById, updatePost, deletePost };

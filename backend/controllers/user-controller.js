const { hashSync, compareSync } = require("bcryptjs");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ users });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (
    (!name && name.trim() === "",
    !email && email.trim() === "",
    !password && password.lenght < 6)
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  const hashPassword = hashSync(password);
    let user;
    try {
      user = new User({ email, name, password: hashPassword });
      user.save();
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(201).json({ user });
  };  

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.lenght < 6) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "No user found" });
  }
  const isPasswordCorrect = compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({ id: existingUser._id, message: "Login Successfull" });
};

module.exports = { getAllUsers, signup, login };

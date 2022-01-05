const userCtrl = {};

const User = require("../models/user.model");

userCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

userCtrl.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  res.json({ message: "User created" });
};

userCtrl.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuario deleted" });
};

module.exports = userCtrl;

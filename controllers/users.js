const { response } = require("express");
const bcryptjs = require("bcrypt");
const User = require("../models/user");

const userGet = async (req, res = response) => {
  const { limit = 5 } = req.query;

  const users = await User.find().limit(Number(limit));

  res.json({
    users,
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, email, _id, ...data } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findOneAndUpdate(id, data);

  res.json({
    user,
  });
};

const userPost = async (req, res = response) => {
  const { user_name, email, password, rol } = req.body;

  //if user_name is all ready taken return error
  const userName = await User.findOne({ user_name });

  if (userName) {
    return res.status(400).json({
      msg: "Nombre de usuario existente, por favor intente uno diferente.",
    });
  }

  const user = new User({ user_name, email, password, rol });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { user_active: false });
  const authUser = req.user;

  res.json({ user, authUser });
};

module.exports = {
  userGet,
  userDelete,
  userPost,
  userPut,
};

const { response } = require("express");
const bcryptjs = require("bcrypt");
const User = require("../models/user");
const { generateJwt } = require("../helpers/JWT");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "user/email incorrectos",
      });
    }

    if (!user.user_active) {
      return res.status(400).json({
        msg: "user/email incorrectos",
      });
    }

    const pass = bcryptjs.compareSync(password, user.password);

    if (!pass) {
      return res.status(400).json({
        msg: "user/email incorrectos",
      });
    }

    const token = await generateJwt(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Ha ocurrido un error",
    });
  }
};

module.exports = { login };

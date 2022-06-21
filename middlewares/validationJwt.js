const { response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validationJwt = async (req, res = response, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).json({
      msg: "Token invalido",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.KEY);

    const user = await User.findById(payload.uid);

    if (!user) {
      return res.status(401).json({
        msg: "Usuario no existe",
      });
    }

    if (!user.user_active) {
      return res.status(401).json({
        msg: "Usuario no existe",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: "Token invalido",
    });
  }
};

module.exports = {
  validationJwt,
};

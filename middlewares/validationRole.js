const { response } = require("express");

const validationRole = (req, res = response) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Ha ocurrido un error",
    });
  }

  const { rol, user_name } = req.user;

  if (rol !== "ADMIN") {
    return res.status(401).json({
      msg: ` el usuario "${user_name}" no autorizado`,
    });
  }
};

module.exports = {
  validationRole,
};

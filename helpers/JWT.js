const jwt = require("jsonwebtoken");

const options = {
  expiresIn: "365d",
};

const generateJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.KEY, options, (err, token) => {
      if (err) {
        console.log(err);
        reject("Token no generado");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generateJwt,
};

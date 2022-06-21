const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validationJwt } = require("../middlewares/validationJwt");

const { validation } = require("../middlewares/validations");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),

    validation,
  ],
  login
);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");

const { emailValidate, idValidate } = require("../helpers/validate-data")

const {validation} = require("../middlewares/validations")

const {
  userGet,
  userDelete,
  userPost,
  userPut,
} = require("../controllers/users");
const { validationJwt } = require("../middlewares/validationJwt");
const { validationRole } = require("../middlewares/validationRole");

const router = Router();

router.get("/", userGet);

router.put("/:id", [

  check( 'id', "id invalido" ).isMongoId(),
  check( 'id' ).custom(idValidate),

  validation
] , userPut);

router.post(
  "/", [

    check('user_name', 'El nombre es obligatorio').not().isEmpty(),
    check('email').custom( emailValidate ),
    check('password', 'El password debe de ser más de 8 caracteres').isLength({ min: 8 }),
    check('rol', 'No es un rol válido').isIn(['ADMIN','USER']),
    
    validation
],
  userPost
);

router.delete("/:id", [
  validationJwt,
  validationRole,
  
  check( 'id', "id invalido" ).isMongoId(),
  check( 'id' ).custom(idValidate),

  validation
], userDelete);

module.exports = router;

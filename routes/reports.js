const { Router } = require("express");
const { check } = require("express-validator");

const { validation } = require("../middlewares/validations");
const { validationJwt } = require("../middlewares/validationJwt");

const {
  reportsPost,
  reportsGetAll,
  reportsByUser,
  repotsById,
  repotsDelete,
  reportUpdate,
} = require("../controllers/reports");


const router = Router();

router.get("/", reportsGetAll);

router.get("/:id", validationJwt, reportsByUser);

router.get("/:id", repotsById);

router.post(
  "/newReport",
  [
    validationJwt,

    check("name", "nombre obligatorio").not().isEmpty(),
    check("message", "message obligatorio").not().isEmpty(),
    check("user", "el user es obligatorio").not().isEmpty(),

    validation,
  ],
  reportsPost
);

router.delete(
  "/:id",
  [
    validationJwt,
    check("reasonForDelete", "el motivo es obligatorio").not().isEmpty(),
    validation,
  ],
  repotsDelete
);

router.put("/:id", [validationJwt, validation], reportUpdate);

module.exports = router;

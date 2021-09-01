const express = require("express");

const router = express.Router();
const { body } = require("express-validator");

const { signIn, signOut, signUp, currentUser } = require("../controllers/auth");
const {
  verifyUser,
  validateRequest,
  validation,
} = require("../middlewares/auth");

router.post(
  "/users/signup",
  [
    body("email").isEmail().withMessage("Email Must Be Valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("email and password must be between 4 and 20 characters"),
  ],
  validateRequest,
  signUp
);
router.post(
  "/users/signin",
  [
    body("email").isEmail().withMessage("Email Must Be Valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("email and password must be between 4 and 20 characters"),
  ],
  validateRequest,
  signIn
);

router.post("/users/signout", validateRequest, signOut);
router.get("/users/currentuser", verifyUser, currentUser);

module.exports = router;

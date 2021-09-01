const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
  console.log(req.session.jwt);

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    req.currentUser = payload;

    next();
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.validateRequest = async (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const message = errors[1] ? errors[0].msg + errors[1].msg : errors[0].msg;
    res.send({ message: message.toString() });
    return;
  }

  next();
};

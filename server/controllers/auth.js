const User = require("../models/user");
const jwt = require("jsonwebtoken");
const PasswordHasher = require("../services/passwordHasher");

// Sign Out
exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.send({ message: "Email In Use" });
  }

  const user = await User.build({ email, password }).save();

  // generate json web token

  const jwtUser = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY
  );

  // store it on session object

  req.session = {
    jwt: jwtUser,
  };

  return res.send(user);
};

// Sign In

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.send({ message: "Please Provide valid Email" });
  }

  const matchPassword = await PasswordHasher.compare(
    existingUser.password,
    password
  );

  if (!matchPassword) {
    return res.send({ message: "Invalid Password" });
  }

  const jwtUser = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_KEY
  );

  console.log(jwtUser);

  // store it on session object

  req.session = {
    jwt: jwtUser,
  };

  return res.send(existingUser);
};

// sign out

exports.signOut = async (req, res) => {
  req.session = null;

  res.send({ message: "Sign Out Successful" });
};

exports.currentUser = async (req, res) => {
  res.send({ currentUser: req.currentUser || null });
};

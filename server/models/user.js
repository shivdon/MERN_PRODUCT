const mongoose = require("mongoose");
const PasswordHasher = require("../services/passwordHasher");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "merchant"],
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordHasher.toHash(this.get("password"));
    this.set("password", hashed);
  }
});

userSchema.statics.build = (attrs) => new User(attrs);

const User = mongoose.model("User", userSchema);

module.exports = User;

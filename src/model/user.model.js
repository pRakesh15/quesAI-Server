import mongoose from "mongoose";
import validator from "validator";
import { createHmac, randomBytes } from "crypto";
import crypto from "crypto";
//creactin the schema for the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
      },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minLength: [6, "Password must Be greater then 6"],
  },

  salt: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//this is a pre function use for hassing the password..

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
    // console.log(user);

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

//writing a vertual function for matching the hashed password and the user provided password..

userSchema.static("matchPassword", async function (email, password) {
//   console.log(email);
  const user = await this.findOne({ email }).select("+password");
//   console.log(user);
  if (!user) return false;
  const salt = user.salt;
  const hashedPassword = user.password;
//   console.log(hashedPassword);
  const userProvidedhashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
//   console.log(userProvidedhashedPassword);
  if (hashedPassword != userProvidedhashedPassword) return false;
  const thisUser = { ...user.toObject(), password: undefined, salt: undefined };

  return thisUser;
});

userSchema.static("getResetToken", async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  return resetToken;
});

export const User = mongoose.model("User", userSchema);

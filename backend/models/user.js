const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    minlength: 4,
    unique: true,
    lowercase: true,
    maxlength: 50,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
});

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    userName: Joi.string().min(4).max(50).required().lowercase(),
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().max(255).required().lowercase().email(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
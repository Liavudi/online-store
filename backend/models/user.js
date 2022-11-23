const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { string } = require("joi");

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
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
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
    minlength: 6,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  role: {
    type: String,
    default: 'user'
  }
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

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
}

const User = mongoose.model("User", UserSchema);

function validateNewUser(user) {
  const schema = Joi.object({
    userName: Joi.string().min(4).max(50).required().lowercase(),
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().max(255).required().lowercase().email(),
    password: Joi.string().required().max(50).min(6),
    age: Joi.number().required().min(18),
    role: Joi.string(),
  });
  return schema.validate(user);
}
function validateUser(user) {
  const schema = Joi.object({
    userName: Joi.string().min(4).max(50).required().lowercase(),
    password: Joi.string().required().max(50).min(6),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateNewUser = validateNewUser;
exports.validateUser = validateUser;
const { User, validateNewUser, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();

const callback = (err, res) => console.log("Error: ", err, "Result: ", res);

router.get("/", async (req, res) => {
  const Users = await User.find().sort("name");
  res.send(Users);
});

router.post("/", async (req, res) => {
  const { error } = validateNewUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ userName: req.body.userName });
  if (user) return res.status(400).send("User already exists.");
  let email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).send("Email already exists.");

  user = new User({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
  });
  user = await user.save();

  res.send(user);
});

// TODO Check if it works at expected (need to implement that it checks both password if they got the same hash)
router.put("/:id", async (req, res) => {
  const { error } = validateNewUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      userName: req.body.userName,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.email,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send("user was successfully removed");
});

router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ userName: req.body.userName }).exec(function (
    error,
    user
  ) {
    if (error) {
      callback({ error: true });
    } else if (!user) {
      callback({ error: true });
    } else {
      user.comparePassword(req.body.password, function (matchError, isMatch) {
        if (matchError) {
          callback({ error: true });
        } else if (!isMatch) {
          callback({ error: true });
        } else {
          callback({ success: true });
        }
      });
    }
  });

  if (user === null) return res.status(400).send("Username doesn't exists.");
  // if (user) return res.status(400).send('Wrong password')
  res.send(user);
});

module.exports = router;

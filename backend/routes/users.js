const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const Users = await User.find().sort("name");
  res.send(Users);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ catalog: req.body.catalog });
  if (user) return res.status(400).send("User already exists.");

  user = new User({
    userName: req.body.userName,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user = await user.save();

  res.send(user);
});

// TODO Check if it works at expected (need to implement that it checks both password if they got the same hash)
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      userName: req.body.userName,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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

module.exports = router;

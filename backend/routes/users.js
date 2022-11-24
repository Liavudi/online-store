const { User, validateNewUser, validateUser, validateUpdatedUser } = require("../models/user");
const express = require("express");
const router = express.Router();

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
  const { error } = validateUpdatedUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      userName: req.body.userName,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      role: req.body.role
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

router.get("/login", (req, res) => {
  if (req.session.userId) {
    return res.send({ loggedIn: true, user: req.session.userId, role: req.session.userRole });
  } else {
    return res.send({ loggedIn: false });
  }
});

router.post("/login", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  User.findOne({ userName: req.body.userName }).exec(function (err, user) {
    if (err) throw err;
    if (user === null) {
      return res.status(400).send("Username doesn't exists.");
    }
    user.comparePassword(req.body.password, function (matchError, isMatch) {
      if (matchError) {
        return console.log(matchError);
      }
      if (!isMatch) {
        return res.status(400).send("Invalid password, please try again.");
      }
      if (isMatch) {
        req.session.userId = user.userName;
        req.session.userRole = user.role
        return res.status(200).send('Logged in successfully!');
      }
    });
  });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end()
  }
});

module.exports = router;

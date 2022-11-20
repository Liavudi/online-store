const { Item, validate } = require("../models/item");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await Item.find().sort("name");
  res.send(items);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let item = await Item.findOne({ catalog: req.body.catalog });
  if (item) return res.status(400).send("Item already exists.");

  item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    catalog: req.body.catalog,
    category: req.body.category,
    image: req.body.image,
  });
  item = await item.save();

  res.send(item);
});


module.exports = router;
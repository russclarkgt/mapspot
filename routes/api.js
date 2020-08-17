const parser = require("body-parser");
const express = require("express");
const router = express.Router();

// access to .env variables
require("dotenv").config();

router.post("/addmap", parser.json(), (req, res) => {
  // todo: add necessary logic
  res.status(200).end();
});

module.exports = router;

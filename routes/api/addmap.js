const fs = require("fs");
const parser = require("body-parser");
const express = require("express");
const router = express.Router();

// access to .env variables
require("dotenv").config();

router.post("/addmap", parser.json(), (req, res) => {
  // form data passed through request body
  const { mapname, styleurl, password } = req.body;

  // helper response functions
  const accept = (msg) => res.status(200).send(msg);
  const reject = (err) => res.status(400).send(err);

  // load previously-uploaded data
  const file = fs.readFileSync("data/maps.json", "utf-8");
  const data = JSON.parse(file);

  // checks for input-related errors
  if (!mapname || !styleurl || !password) {
    reject("Please fill out all required information.");
  } else if (password !== process.env.password) {
    reject("Password is incorrect. Try again.");
  } else if (data[mapname]) {
    reject(`"${mapname}" has already been uploaded.`);
  } else {
    // append new data
    data[mapname] = {
      url: styleurl,
      date: Date.now(),
      approved: false,
      active: false
    };

    // apply formatting & overwrite existing json
    let appended = JSON.stringify(data, null, 2);
    fs.writeFile("data/maps.json", appended, () => {});
    accept("Your map is pending approval.");
  }
});

module.exports = router;

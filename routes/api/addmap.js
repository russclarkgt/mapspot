const fs = require("fs");
const parser = require("body-parser");
const express = require("express");
const router = express.Router();

// access to .env variables
require("dotenv").config();

router.post("/addmap", parser.json(), (req, res) => {
  // form data passed through request body
  const { mapname, path, ...args } = req.body;

  // load previously-uploaded data
  const file = fs.readFileSync(path, "utf-8");
  const data = JSON.parse(file);

  // check for input-related errors
  if (Object.values(req.body).some(a => a === null || a === "")) {
    res.status(400).send("Please fill out all required information.");
  } else if (data[mapname]) {
    res.status(400).send(`"${mapname}" has already been uploaded.`);
  } else {
    // append new data
    data[mapname] = args;
    // apply formatting & overwrite existing json
    let appended = JSON.stringify(data, null, 2);
    fs.writeFile(path, appended, () => {});
    res.status(200).send("Your map is pending approval.");
  }
});

module.exports = router;

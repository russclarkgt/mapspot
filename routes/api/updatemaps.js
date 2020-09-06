const fs = require("fs");
const parser = require("body-parser");
const express = require("express");
const router = express.Router();

require("dotenv").config()

router.post("/updatemaps", parser.json(), (req, res) => {
  // relevant info from request body
  const { updates, password } = req.body;

  // load previously-uploaded maps
  const file = fs.readFileSync("data/maps.json", "utf-8");
  const data = JSON.parse(file);

  if (password == process.env.update_password) {
    // update provided map values
    for ([map, props] of Object.entries(updates))
      for ([key, value] of Object.entries(props))
        if (data[map] && data[map][key] !== null)
          data[map][key] = updates[map][key];

    // apply formatting & overwrite existing json
    let newdata = JSON.stringify(data, null, 2);
    fs.writeFile("data/maps.json", newdata, () => { });
    res.status(200).send("Maps have been updated!");
  } else {
    res.status(400).send("Password is incorrect. Try again.");
  }
});

module.exports = router;

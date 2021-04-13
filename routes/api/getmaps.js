const fs = require("fs");
const parser = require("body-parser");
const express = require("express");
const router = express.Router();

// determines whether object has matching
// values for the passed-in properties
const hasProps = (obj, props) => {
  for (key in props)
    if (obj[key] !== props[key])
      return false;
  return true;
};

router.post("/getmaps", parser.json(), (req, res) => {
  // load previously-uploaded maps
  const file = fs.readFileSync("data/mapbox.json", "utf-8");
  const maps = JSON.parse(file);

  // remove maps not matching specified criteria
  for (mapname in maps)
    if (!hasProps(maps[mapname], req.body))
      delete maps[mapname];

  // send remaining maps
  res.status(200).json(maps);
});

module.exports = router;

const express = require("express");
const router = express.Router();

// temporary endpoint @ /api/placeholder
router.get("/placeholder", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello!"
  });
});

module.exports = router;

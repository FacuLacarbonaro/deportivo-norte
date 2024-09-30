const express = require("express");
const router = express.Router();

// Player Routes

router.get("/", (req, res) => {
  res.send("players route");
});

module.exports = router;

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Express server");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Route Files
const playersRoute = require("./routes/players");

// Use routes
app.use("/players", playersRoute);

const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { connectDb } = require("./config/database");
const port = process.env.PORT || 3000;

dotenv.config();

app.get("/", (req, res) => {
  res.send("Express server");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Initialized Database Config
connectDb();
app.use(express.json());

// Route Files
const playersRoute = require("./routes/players");
const userRouter = require("./routes/user.Routes.js");

// Use routes
app.use("/players", playersRoute);
app.use("/user", userRouter);

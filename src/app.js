const express = require("express");
const { connectToDatabase } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const pokemonRoutes = require("./routes/pokemonRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

connectToDatabase();

app.use("/auth", authRoutes);
app.use("/pokemon", pokemonRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

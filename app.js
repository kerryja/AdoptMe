require("dotenv").config();

console.log(process.env);

const express = require("express");
const ejsMate = require("ejs-mate");
const morgan = require("morgan");

const app = express();
const petfinder = require("@petfinder/petfinder-js");
const petfinderClient = new petfinder.Client({
  apiKey: process.env.API_KEY,
  secret: process.env.SECRET,
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/animals", async (req, res) => {
  try {
    const result = await petfinderClient.animal.search();
    const animals = result.data.animals;
    res.render("animals/index", { animals });
  } catch (e) {
    console.log(e);
  }
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

const express = require("express");
app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./models/student");

mongoose
  .connect("mongodb://localhost:27017/studentDB")
  .then(() => console.log("success"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
// routes to list all the students
app.get("/students/insert", (req, res) => {
  res.render("studentInsert.ejs");
});

app.listen(3000);

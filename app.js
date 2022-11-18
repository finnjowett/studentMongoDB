const express = require("express");
app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./models/student");

mongoose.connect("mongodb://localhost:27017/studentDB");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
// routes to list all the students

app.get("/students", async (req, res) => {
  let data = await Student.find();
  res.render("students.ejs", { data });
});
app.get("/students/insert", (req, res) => {
  res.render("studentInsert.ejs");
});
app.post("/students/insert", (req, res) => {
  let { id, name, age, merit, other } = req.body;
  const newStudent = new Student({
    id,
    name,
    age,
    scholarship: { merit, other },
  });
  newStudent
    .save()
    .then(() => {
      res.render("success.ejs");
    })
    .catch((e) => {
      res.render("reject.ejs");
    });
});

app.listen(3000);

const express = require("express");
app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/studentDB");
const Student = require("./models/student");

app.set("view engine", "ejs");
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
  // put data into mongodb datatbase
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
app.get("/students/:id", async (req, res) => {
  let { id } = req.params;
  // findone return an object, find return an array
  let data = await Student.findOne({ id });
  if (data !== null) {
    res.render("studentPage", { data });
  } else {
    res.send("sorry, cannot complete your request");
  }
});
app.listen(3000);

/**
 * Author: Philipp Fleischer, Emil Biedowicz, Tom Lenhard, Lukas Dieth
 * email: philipp.fleischer0@gmail.com
 */

const express = require("express");
const app = express();
var path = require("path");
const port = 3000;

const comments = [];

//static css files inclusion
app.use("/static", express.static(__dirname + "/static"));
app.use("/img", express.static(__dirname + "/img"));

app.post("/login", (req, res) => {
  console.log("I am in /login");
  alert("I am in /login");
  if (req.body !== undefined && res.cookie("username") === req.body.username) {
    alert("Hallo" + req.body.username);
    res.redirect("/");
    res.send();
  } else {
    console.log(req);
    if (req.body !== undefined) {
      res.cookie("username", req.body.username);
    }
    res.redirect("/");
    res.send();
  }
});

app.post("/postComment", (req, res) => {
  // store comment to backend
  comments.push(req.body.comment);
  res.send();
});

//hard coded routing
app.get("/", function (req, res) {
  console.log("I am in /index");
  // redirect to /login if no username set
  if (res.cookies === undefined || res.cookies.username === undefined) {
    res.redirect("/login");
    res.send();
  }
  res.sendFile(path.join(__dirname + "/html/index.html"));
});

app.get("/rezept", function (req, res) {
  res.cookie("visitcounter1", res.cookies.visitcounter1++);
  res.sendFile(path.join(__dirname + "/html/Rezept.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/login.html"));
});

app.get("/rezept", function (req, res) {
  res.cookie("visitcounter1", res.cookies.visitcounter1++);
  res.sendFile(path.join(__dirname + "/html/Rezept.html"));
});

app.get("/spinach", function (req, res) {
  res.cookie("visitcounter2", res.cookies.visitcounter2++);
  res.sendFile(path.join(__dirname + "/html/spinach_strawberry_salad.html"));
});

app.get("/mostvisited", function (req, res) {
  var mostvisitedPage = "Spaghetti Carbonara";
  if (res.cookies.visitcounter1 > res.cookies.visitcounter2) {
    mostvisitedPage = "Spinach Strawberry Salad";
  }
  res.send("<p>foobar</p>");
});

//debug info for developers
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

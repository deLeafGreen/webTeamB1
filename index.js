/**
 * Author: Philipp Fleischer, Emil Biedowicz, Tom Lenhard, Lukas Dieth
 * email: philipp.fleischer0@gmail.com
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
var path = require("path");
const port = 3000;
const { v4: uuidv4 } = require("uuid");

const comments = [];

app.use(cookieParser());
app.use(bodyParser());

//static css files inclusion
app.use("/static", express.static(__dirname + "/static"));
app.use("/img", express.static(__dirname + "/img"));

app.post("/login", (req, res) => {
  console.log(
    "I am in /login. Username from form data is: " + req.body.username
  );
  //console.log(req.body);
  if (
    req.body !== undefined &&
    req.cookies !== undefined &&
    req.cookies.username === req.body.username
  ) {
    //alert("Hallo" + req.body.username);
    console.log("redirect");
    res.redirect("/");
    return res.send();
  } else {
    if (req.body !== undefined) {
      console.log("Setting cookie...");
      res.cookie("username", req.body.username);
      console.log("Set cookie: " + req.cookies.username);
    }
    res.redirect("/");
    return res.send();
  }
});

//hard coded routing
app.get("/", function (req, res) {
  console.log("I am in root /.");
  //console.log("Username is: " + req.cookies.username);
  // redirect to /login if no username set
  if (req.cookies === undefined || req.cookies.username === undefined) {
    res.redirect("/login");
    return res.send();
  }
  console.log(
    "Will display main page. User is logged in. Username is: " +
      req.cookies.username
  );

  // init visit counter cookies
  if (req.cookies.visitcounter1 === undefined) {
    //if (true) {
    res.cookie("visitcounter1", 0);
    res.cookie("visitcounter2", 0);
  } else {
    console.log(
      "Visitcounter cookies: " +
        req.cookies.visitcounter1.toString() +
        ", " +
        req.cookies.visitcounter2.toString()
    );
  }

  res.sendFile(path.join(__dirname + "/html/index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/html/login.html"));
});

app.get("/rezept", function (req, res) {
  res.cookie("visitcounter1", parseInt(req.cookies.visitcounter1, 10) + 1);
  console.log(
    "Will display Spaghetti page. Increased visitcounter to " +
      req.cookies.visitcounter1 +
      "."
  );
  res.sendFile(path.join(__dirname + "/html/Rezept.html"));
});

app.get("/spinach", function (req, res) {
  res.cookie("visitcounter2", parseInt(req.cookies.visitcounter2, 10) + 1);
  console.log(
    "Will display Spinach page. Increased visitcounter to " +
      req.cookies.visitcounter2 +
      "."
  );
  res.sendFile(path.join(__dirname + "/html/spinach_strawberry_salad.html"));
});

app.get("/mostvisited", function (req, res) {
  var mostvisitedPage = "";
  var spaghettiVisits = parseInt(req.cookies.visitcounter1, 10);
  var spinachVisits = parseInt(req.cookies.visitcounter2, 10);
  if (spaghettiVisits == 0 && spinachVisits == 0) {
    mostvisitedPage = "(n/a)";
  } else if (spaghettiVisits === spinachVisits) {
    mostvisitedPage = "Spaghetti Carbonara, Spinach Strawberry Salad";
  } else if (spinachVisits > spaghettiVisits) {
    mostvisitedPage = "Spinach Strawberry Salad";
  } else {
    mostvisitedPage = "Spaghetti Carbonara";
  }
  console.log(
    "Getting most visited page... visitcounters: " +
      req.cookies.visitcounter1 +
      ", " +
      req.cookies.visitcounter2 +
      " => Most visited page: " +
      mostvisitedPage
  );
  res.send(mostvisitedPage);
});

app.post("/comment", (req, res) => {
  // store comment to backend
  const comment = {};
  comment.commentText = req.body.commentText;
  comment.recipePage = req.body.recipePage;
  comment.author = req.cookies.username;
  comment.id = uuidv4();
  console.log("Storing comment to backend: " + comment);
  comments.push(comment);
  console.log("Stored comment. List of all comments:");
  console.log(comments);
  res.redirect("/");
  res.send();
});

app.get("/comment", (req, res) => {
  // get all comments from backend
  res.send(comments);
});

app.get("/comment/:recipePage", (req, res) => {
  // get comments with specified recipePage from backend
  console.log("I am in /comment/:recipePage.");

  var commentsToReturn = [];
  for (var comment in comments) {
    if (comment.recipePage === req.params.recipePage) {
      commentsToReturn.push(comment);
    }
  }

  console.log("Sending the following comment data:");
  console.log(commentsToReturn);
  res.send(commentsToReturn);
});

app.get("/comment/:author", (req, res) => {
  // get comments with specified author from backend
  const author = req.params.author;
  const commentsToReturn = comments.find((listenElement) => {
    return listenElement.author === author;
  });
  res.send(commentsToReturn);
});

//debug info for developers
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

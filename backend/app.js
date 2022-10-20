const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const notesRoute = require("./routes/notes");
const userRoute = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://collegitesadmin:admincollegites@collegitescluster.y5br8a2.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to db"))
  .catch(() => console.log("Connection Failed"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/notes", notesRoute);
app.use("/api/users", userRoute);

module.exports = app;

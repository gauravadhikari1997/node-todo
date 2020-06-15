const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todo_db", {
  useNewUrlParser: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to mongodb");
});

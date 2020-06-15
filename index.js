const express = require("express");
const port = 8000;
const path = require("path");

const app = express();

app.set(("view engine", "ejs"));
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

const db = require("./config/mongoose");
const Todo = require("./models/todo");

app.get("/", function (req, res) {
  Todo.find({}, function (err, success) {
    if (err) {
      console.log(err);
      return;
    }
    return res.render("home.ejs", { title: "Todo Home", todos: success });
  });
});

app.post("/create-todo", function (req, res) {
  if (req.body.name) {
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      currentdate.getMonth() +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    Todo.create(
      {
        name: req.body.name,
        createdAt: datetime,
        completed: false,
      },
      function (err, success) {
        if (err) {
          return console.error(err);
        }
      }
    );
  }

  return res.redirect("back");
});

app.get("/completed", async function (req, res) {
  await Todo.updateOne({ _id: req.query.id }, { completed: true });
  return res.redirect("back");
});

app.get("/delete", async function (req, res) {
  await Todo.deleteOne({ _id: req.query.id });
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("Server is up and running on port: ", port);
});

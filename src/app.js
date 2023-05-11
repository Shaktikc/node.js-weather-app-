const geocode = require("./utils/geocode");
const foreCast = require("./utils/forecast");

const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// setup handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

// used for making the contain dynamic by using hbs
app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "shakti",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "shakti kc" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    msg: "How can I help you?",
    name: "shakti",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "please provide the address" });
  }

  geocode(address, (error, { longitude, latitude, results } = {}) => {
    if (!address) {
      return console.log("please enter the place name");
    }
    if (error) {
      res.send({ error });
    }

    foreCast(longitude, latitude, (error, foreCastData) => {
      if (error) {
        res.send(error);
        console.log("error1", error);
      }
      res.send({ foreCastData, address });
      // console.log("data2", data.results);
      console.log(foreCastData);
    });
  });
});

app.get("/product", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({ error: "you must provide search term" });
  }
  res.send({ product: [] });
});
app.get("/help/*", (req, res) => {
  res.render("errorMessage", {
    title: "404",
    message: "help article not found!",
    name: "shakti",
  });
});

app.get("*", (req, res) => {
  res.render("errorMessage", {
    title: "404",
    message: "page not found",
    name: "shakti",
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000.");
});

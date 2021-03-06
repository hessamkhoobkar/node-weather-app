const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Your Weather App",
    name: "Hessam Khoobkar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the app",
    name: "Hessam Khoobkar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Hessam Khoobkar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must include the address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404, There is no help",
    name: "Hessam Khoobkar",
    errorMessage:
      "The url adress dose note exists, let's get back to help page",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404, Nothing is here",
    name: "Hessam Khoobkar",
    errorMessage: "The url adress dose note exists, let's get back",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

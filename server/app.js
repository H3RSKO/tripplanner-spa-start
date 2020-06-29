const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const dataBase = require("./models/index");


//Logging
app.use(morgan());
// app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

const PORT = 1234;

//Other routes
app.get("/api", async (req, res, next) => {
  try {
    const allAttractions = {};

    allAttractions.hotels = await dataBase.Hotel.findAll();
    allAttractions.restaurants = await dataBase.Restaurant.findAll();
    allAttractions.activities = await dataBase.Activity.findAll();

    res.json(allAttractions);
  }
  catch (error) { next(error) }
})

//index handling
app.get(function (req, res, next) {
  var err = new Error('Not Found');
  err.status(404);
  next(err);
})

//Error handling
app.get(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send("Nothing here.", err);
})

const init = async function () {
  await dataBase.db.sync()
  app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}!`);
  });
}
init();

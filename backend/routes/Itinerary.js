module.exports = app => {
  const instruments = require("../controllers/Instrument");

  var router = require("express").Router();
  // router.post("/", instruments.create);
  router.get("/", itinerary.createItinerary);
  router.get("/:userId", instruments.findOne);

};

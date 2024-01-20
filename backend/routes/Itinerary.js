module.exports = app => {
  const itinerary = require("../controllers/Itinerary");

  var router = require("express").Router();
  // router.post("/", instruments.create);
  router.get("/", itinerary.createItinerary);
  router.get("/:userId", itinerary.findOne);

};

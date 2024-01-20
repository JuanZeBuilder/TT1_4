module.exports = app => {
  const itinerary = require("../controllers/Itinerary");

  var router = require("express").Router();
  router.get("/:userId", itinerary.getItineraryByUserId);
  app.use('/api/itinerary', router);
};

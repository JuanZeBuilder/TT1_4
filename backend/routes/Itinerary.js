module.exports = (app) => {
  const itinerary = require("../controllers/Itinerary");

  var router = require("express").Router();
  router.get("/:userId", itinerary.getItineraryByUserId);
  router.post("/", itinerary.createItinerary);
  router.delete("/:itineraryId", itinerary.deleteItinerary);
  router.put("/:id", itinerary.editItinerary);
  app.use("/api/itinerary", router);
};

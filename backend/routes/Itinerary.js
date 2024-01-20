module.exports = (app) => {
  const itinerary = require("../controllers/Itinerary");
  const authenticateToken = require('../middleware/Authentication');

  var router = require("express").Router();
  router.get("/:userId", authenticateToken, itinerary.getItineraryByUserId);
  router.post("/", authenticateToken, itinerary.createItinerary);
  router.delete("/:itineraryId", authenticateToken, itinerary.deleteItinerary);
  router.put("/:id", authenticateToken, itinerary.editItinerary);
  app.use("/api/itinerary", router);
};

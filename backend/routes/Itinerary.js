module.exports = (app) => {
  const itinerary = require("../controllers/Itinerary");

  var router = require("express").Router();
  // router.post("/", instruments.create);
  router.post("/", itinerary.createItinerary);
  // router.get("/:id", instruments.findOne);

  app.use("/api/itinerary", router);
};

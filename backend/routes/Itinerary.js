module.exports = (app) => {
  const itinerary = require("../controllers/Itinerary");

  var router = require("express").Router();
  // router.post("/", instruments.create);
  router.get("/", itinerary.createItinerary);
  // router.get("/:id", instruments.findOne);

  app.use("/api/itinerary", router);
};

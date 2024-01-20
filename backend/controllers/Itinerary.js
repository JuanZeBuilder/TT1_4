const Itinerary = require("../models/Itinerary");

exports.createItinerary = (req, res) => {
  Itinerary.createItinerary(req, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving req.body.",
      });
    else {
      const { id, country_id, user_id, budget, title } = req.body;
      res.status(201).json({ id, country_id, user_id, budget, title });
    }
  });
};
exports.getItineraryByUserId = (req, res) => {
  Itinerary.getByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No itinerary found for user id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving itinerary with user id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

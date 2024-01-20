const Itinerary = require("../models/Itinerary");

exports.getItineraryByUserId = (req, res) => {
  Itinerary.getByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No itinerary found for user id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving itinerary with user id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};
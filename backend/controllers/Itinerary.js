const Instrument = require("../models/Instrument");

exports.findAll = (req, res) => {
    Instrument.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving req.body."
            });
        else res.send(data);
    });
};

exports.getItineraryByUserId = (req, res) => {
  Order.findById(req.params.userId, (err, data) => {
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
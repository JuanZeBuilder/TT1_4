const Itinerary = require("../models/Itinerary");

exports.createItinerary = (req, res) => {
  Itinerary.createIteinerary((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving req.body.",
      });
    else res.send(data);
  });
};

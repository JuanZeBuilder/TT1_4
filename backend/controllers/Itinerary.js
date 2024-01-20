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

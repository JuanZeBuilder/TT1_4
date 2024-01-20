const Itinerary = require("../models/Itinerary");

exports.createItinerary = (req, res) => {
  Itinerary.createItinerary(async (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving req.body.",
      });
    else {
      // `id`, `country_id`, `user_id`, `budget`, `title`
      const { id, country_id, user_id, budget, title } = req.body;
      // const itemId = await Itinerary.createItinerary({ id, country_id, user_id, budget, title });
      res.status(201).json({ id, country_id, user_id, budget, title });
    }
  });
};

const itemModel = require("../models/itemModel");

const createItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const itemId = await itemModel.createItem({ name, description, price });
    res.status(201).json({ id: itemId, name, description, price });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createItem,
};

const sql = require("../config");

const Itinerary = function (itinerary) {
  this.id = itinerary.id;
  this.country_id = itinerary.country_id;
  this.user_id = itinerary.user_id;
  this.budget = itinerary.budget;
  this.title = itinerary.title;
};

Itinerary.createItinerary = (result) => {
  let query =
    "INSERT INTO itinerary (`id`, `country_id`, `user_id`, `budget`, `title`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.country_id,
    req.body.user_id,
    req.budget,
    req.title,
  ];
  sql.query(query, [values], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    res.json(result);
  });
};

module.exports = Itinerary;

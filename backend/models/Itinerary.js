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

Itinerary.findByUserId = (userId, result) => {
  sql.query(`SELECT
      i.id AS itinerary_id,
      i.title AS itinerary_title,
      i.budget AS itinerary_budget,
      d.id AS destination_id,
      d.name AS destination_name,
      d.cost AS destination_cost
    FROM
      techtrek24.itinerary i
    JOIN
      techtrek24.itinerary_destination id ON i.id = id.itinerary_id
    JOIN
      techtrek24.destination d ON id.destination_id = d.id
    WHERE
  i.user_id = ${userId};`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Itinerary: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

module.exports = Itinerary;

const sql = require("../config/db.config");

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

Itinerary.getByUserId = (userId, result) => {
  sql.query(`SELECT
  i.title AS title,
  i.budget AS budget,
  c.name AS country_name,
  GROUP_CONCAT(d.name) AS destination_names
FROM
  techtrek24.itinerary i
JOIN
  techtrek24.itinerary_destination id ON i.id = id.itinerary_id
JOIN
  techtrek24.destination d ON id.destination_id = d.id
JOIN
  techtrek24.country c ON i.country_id = c.id
WHERE
  i.user_id = ${userId}
GROUP BY
  i.title, i.budget, c.name;
`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      const formattedResult = res.map((row) => {
        return {
          title: row.title,
          budget: row.budget,
          country: row.country_name,
          destinations: row.destination_names ? row.destination_names.split(",").map(destination => destination.trim()) : []
        };
      });

      console.log("Itinerary: ", formattedResult);
      result(null, formattedResult);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

module.exports = Itinerary;

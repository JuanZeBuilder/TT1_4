const sql = require("../config/db.config");

const Itinerary = function (itinerary) {
  this.id = itinerary.id;
  this.country_id = itinerary.country_id;
  this.user_id = itinerary.user_id;
  this.budget = itinerary.budget;
  this.title = itinerary.title;
};

Itinerary.createItinerary = (req, result) => {
  // let req = itinerary.body;
  console.log(req.body);
  sql.query("INSERT INTO itinerary SET ?", req.body, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      result(null, res);
    }
  });
};

Itinerary.getByUserId = (userId, result) => {
  sql.query(
    `SELECT
  i.id AS id,
  i.title AS title,
  i.budget AS budget,
  c.name AS country_name,
  GROUP_CONCAT(d.name) AS destination_names
FROM
  techtrek24.itinerary i
JOIN
  techtrek24.itinerary_destination id ON i.id = id.itineray_id
JOIN
  techtrek24.destination d ON id.destination_id = d.id
JOIN
  techtrek24.country c ON i.country_id = c.id
WHERE
  i.user_id = ${userId}
GROUP BY
  i.id, i.title, i.budget, c.name;
`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        const formattedResult = res.map((row) => {
          return {
            id: row.id,
            title: row.title,
            budget: row.budget,
            country: row.country_name,
            destinations: row.destination_names
              ? row.destination_names
                .split(",")
                .map((destination) => destination.trim())
              : [],
          };
        });

        console.log("Itinerary: ", formattedResult);
        result(null, formattedResult);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Itinerary.deleteItinerary = (itineraryId, result) => {

  let query = `DELETE FROM techtrek24.itinerary WHERE id=${itineraryId}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success");
    result(null, res);
  });
};

module.exports = Itinerary;

Itinerary.editItinerary = (id, newFields, result) => {
  console.log(newFields.body);
  const setClause = Object.keys(newFields.body)
    .map((key) => `${key} = ?`)
    .join(", ");

  console.log(setClause);
  const query = `UPDATE techtrek24.itinerary SET ${setClause} WHERE id = ?`;

  const values = [...Object.values(newFields.body), id];

  sql.query(query, values, (err, res) => {
    if (err) {
      console.error("Error updating destination:", err);
      result(null, err);
      return;
    }

    console.log("Destination updated successfully:", res);
    result(null, res);
  });
};

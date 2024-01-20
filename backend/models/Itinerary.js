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

module.exports = Itinerary;

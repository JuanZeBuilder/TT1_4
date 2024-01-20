const sql = require("../config/db.config");

const Country = function (country) {
    this.ID = country.id;
    this.NAME = country.name;
};

Country.getAll = result => {
    let query = "SELECT * FROM techtrek24.country";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Country: ", res);
        result(null, res);
    });
};

module.exports = Country;

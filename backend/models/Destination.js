const sql = require("../config/db.config");

const Destination = function (destination) {
    this.id = destination.id;
    this.country_id = destination.country_id;
    this.cost = destination.cost;
    this.name = destination.name;
    this.notes = destination.notes;
};


Destination.getAll = result => {
    let query = "SELECT * FROM techtrek24.destination";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("destinations: ", res);
        result(null, res);
    });
};

Destination.createNewDestination = (destination, result) => {
    console.log(destination.body);
    let data = destination.body;
    let query = `INSERT INTO techtrek24.destination (id, country_id, cost, name, notes) VALUES (${data.id}, ${data.country_id}, ${data.cost}, '${data.name}',' ${data.notes}')`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("destination: ", res);
        result(null, res);
    });
};


// Destination.updateDestinationById = (destination, result) => {
//     console.log(destination.body);
//     let data = destination.body;
//     let query = `INSERT INTO techtrek24.destination (id, country_id, cost, name, notes) VALUES (${data.id}, ${data.country_id}, ${data.cost}, '${data.name}',' ${data.notes}')`;
//     `UPDATE Customers
//     SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
//     WHERE CustomerID = 1;`
//     sql.query(query, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("destination: ", res);
//         result(null, res);
//     });
// };

Destination.deleteDestinationById = (destination, result) => {
    console.log(destination.body);
    let data = destination.body;
    let query = `INSERT INTO techtrek24.destination (id, country_id, cost, name, notes) VALUES (${data.id}, ${data.country_id}, ${data.cost}, '${data.name}',' ${data.notes}')`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("destination: ", res);
        result(null, res);
    });
};


module.exports = Destination;

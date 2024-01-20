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
    let query = `INSERT INTO techtrek24.destination (country_id, cost, name, notes) VALUES (${data.country_id}, ${data.cost}, '${data.name}',' ${data.notes}')`;

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


// Destination.updateDestinationById = (id, destination, result) => {
//     console.log(destination.body);
//     let data = destination.body;
//     let query = `UPDATE techtrek24.destination
//     SET country_id = , City= 'Frankfurt'
//     WHERE CustomerID = ${id};`
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

Destination.updateDestinationById = (id, updateFields, result) => {
    // Construct the SET clause dynamically based on non-empty values in updateFields
    console.log(updateFields.body);
    const setClause = Object.keys(updateFields.body)
      .map(key => `${key} = ?`)
      .join(', ');

    console.log(setClause);
    // Construct the SQL query
    const query = `UPDATE techtrek24.destination SET ${setClause} WHERE id = ?`;
  
    // Extract values from updateFields and add the id at the end
    const values = [...Object.values(updateFields.body), id];
  
    // Execute the SQL query
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
  

Destination.deleteDestinationById = (id, result) => {
    console.log(id);
    let query = `DELETE FROM techtrek24.destination WHERE id = '${id}'`;


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

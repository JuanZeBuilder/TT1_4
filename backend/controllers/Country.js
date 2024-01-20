const Country = require("../models/Country");

exports.findAll = (req, res) => {
    Country.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving req.body."
            });
        else res.send(data);
    });
};

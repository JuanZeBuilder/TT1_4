const Instrument = require("../models/Instrument");

exports.findAll = (req, res) => {
    Instrument.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving req.body."
            });
        else res.send(data);
    });
};

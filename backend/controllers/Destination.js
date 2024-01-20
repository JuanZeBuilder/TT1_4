const Destination = require("../models/Destination");

exports.findAll = (req, res) => {
    Destination.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving req.body."
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    Destination.createNewDestination(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving req.body."
            });
        else res.send(data);
    });
};
// exports.findAll = (req, res) => {
//     Instrument.Destination((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving req.body."
//             });
//         else res.send(data);
//     });
// };
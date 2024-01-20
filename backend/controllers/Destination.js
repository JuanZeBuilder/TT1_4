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

exports.delete = (req, res) => {
    Destination.deleteDestinationById(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving req.body."
            });
        else res.send(data);
    });
};


exports.update = (req, res) => {
    Destination.updateDestinationById(req.params.id, req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving req.body."
            });
        else res.send(data);
    });
};
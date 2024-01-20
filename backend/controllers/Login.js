const MainLogin = require("../models/Login");

exports.login = (req, res) => {
    MainLogin(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while at Login route ."
            });
        else {
            console.log("success!", data);
            res.send(data);
        }
    });
};

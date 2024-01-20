const sql = require("../config/db.config");

const LoginInstrument = function (instrument) {
    this.id = instrument.id;
    this.first_name = instrument.first_name;
    this.last_name = instrument.last_name;
    this.password = instrument.password;
    this.username = instrument.username;
};

LoginInstrument.findById = (username, result) => {
    console.log(username);
    sql.query(`SELECT * FROM techtrek24.user WHERE username = '${username}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
    });
};


const MainLogin = (req, res) => {
    console.log(req);
    const USERNAME = req.body.username;
    const PASSWORD = req.body.password;
    console.log(USERNAME);
    console.log(PASSWORD);

    sql.query(`SELECT * FROM techtrek24.user WHERE username = '${USERNAME}' AND password = '${PASSWORD}'`, (err, result) => {
            if (err) {
                console.log("error: ", err);
                res(null, err);
                return;
            }
            console.log("instrument: ", result);
            res(null, result);
        });
    
};

module.exports = MainLogin;

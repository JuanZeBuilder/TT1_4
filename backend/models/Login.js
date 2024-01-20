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
    const USERNAME = req.body.username;
    const PASSWORD = req.body.password;

    sql.query(`SELECT * FROM techtrek24.user WHERE username = '${USERNAME}' AND password = '${PASSWORD}'`, (err, result) => {
            if (err) {
                console.log("error: ", err);
                res(null, err);
                return;
            }
            
            if(result===undefined){
                console.log("error: ", err);
                res(null, err);
                return;
            }
            else{
                console.log(result);
                res(null, result);   
            }
        });
    
};

module.exports = MainLogin;

const MainLogin = require("../models/Login");
const jwt = require('jsonwebtoken');


async function generateTokenForUser(userId) {
    const token = jwt.sign({ userId: userId }, "techtreck24");
    // const decodedPayload = jwt.decode(token);
    // console.log("Decoded payload:", decodedPayload);
    return token;
}

exports.login = async (req, res) => {
    try {
        const userData = await new Promise((resolve, reject) => {
            MainLogin(req, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        if (userData.length > 0) {

            const token = await generateTokenForUser(userData[0].id);
            res.send({
                status: "Ok",
                user: userData,
                jwt_token: token
            });
        } else {
            res.status(500).send({
                message: "ERROR: NO USER."
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error."
        });
    }
};

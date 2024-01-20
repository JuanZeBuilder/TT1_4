const MainLogin = require("../models/Login");
const GenerateToken = require("../GenerateToken");
const generateToken = new GenerateToken();
const generate_token = async (userid)=>{

    const token = await generateToken.execute(userid);
    console.log(token);
    return token;

}
//const token = await generateToken.execute(user.userId);

exports.login =  (req, res) => {
    MainLogin(req, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while at Login route ."
            });
        else {
            if (data.length>0){
            //res.send(data);
            const token = await generate_token(data["id"])
            res.send({status: "Ok", 
                jwt_token: token});
            }
            else{
                res.status(500).send({
                    message:
                        "ERROR: NO USER."
                });   
            }
        }
    });
};

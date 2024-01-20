module.exports = app => {
    const loginRoute = require("../controllers/Login");

    var router = require("express").Router();
    router.post('/login', loginRoute.login);
        
    app.use('/api/user', router);

};

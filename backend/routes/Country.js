module.exports = app => {
    const authenticateToken = require('../middleware/Authentication');
    const countries = require("../controllers/Country");
    var router = require("express").Router();
    router.get("/", authenticateToken, countries.findAll);
    app.use('/api/countries', router);

};

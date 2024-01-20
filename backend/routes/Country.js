module.exports = app => {
    const countries = require("../controllers/Country");
    var router = require("express").Router();
    router.get("/", countries.findAll);
    app.use('/api/countries', router);

};

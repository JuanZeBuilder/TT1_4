module.exports = app => {
    const instruments = require("../controllers/Instrument");

    var router = require("express").Router();
    // router.post("/", instruments.create);
    router.get("/", instruments.findAll);
    // router.get("/:id", instruments.findOne);

    app.use('/api/instruments', router);

};

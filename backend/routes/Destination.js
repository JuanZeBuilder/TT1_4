module.exports = app => {
    const destination = require("../controllers/Destination");

    var router = require("express").Router();
    // router.post("/", instruments.create);
    router.get("/", destination.findAll);
    // router.get("/:id", instruments.findOne);
    router.post("/", destination.create);
    router.delete("/:id", destination.delete);
    router.put("/:id", destination.update);
    app.use('/api/destination', router);

};

// module.exports = app => {
//     const countries = require("../controllers/Country");
//     var router = require("express").Router();
//     router.get("/", countries.findAll);
//     app.use('/api/countries', router);

// };

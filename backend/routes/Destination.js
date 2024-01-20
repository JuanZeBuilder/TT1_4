module.exports = app => {
    const destination = require("../controllers/Destination");
    const authenticateToken = require('../middleware/Authentication');

    var router = require("express").Router();
    router.get("/", authenticateToken, destination.findAll);
    router.post("/", authenticateToken, destination.create);
    router.delete("/:id", authenticateToken, destination.delete);
    router.put("/:id", authenticateToken, destination.update);
    app.use('/api/destination', router);

};

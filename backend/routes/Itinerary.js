module.exports = app => {
    const account = require("../controllers/Account");

    var router = require("express").Router();
    router.post("/register", account.register);
    router.post("/login", account.login);
    router.put("/subscribe/:id", account.subscribe);
    router.get("/subscribers", account.getSubscribers);

    app.use('/api/account', router);

};

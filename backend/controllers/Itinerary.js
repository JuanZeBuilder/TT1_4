const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const Account = require("../models/Account");

exports.register = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const account = new Account({
        ACCOUNT_ID: req.body.ACCOUNT_ID,
        PASSWORD: req.body.PASSWORD,
        FIRST_NAME: req.body.FIRST_NAME,
        LAST_NAME: req.body.LAST_NAME,
        DOB: req.body.DOB,
        EMAIL: req.body.EMAIL
    });

    const salt = genSaltSync(10);
    console.log(account.PASSWORD);
    account.PASSWORD = hashSync(account.PASSWORD, salt);

    Account.create(account, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while registering."
            });
        else res.send("Registration successful!");
    });
};

exports.login = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const ACCOUNT_ID = req.body.ACCOUNT_ID;
    const PASSWORD = req.body.PASSWORD;

    Account.findById(ACCOUNT_ID, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred during login."
            });
        else {
            const isValidPassword = compareSync(PASSWORD, data[0].PASSWORD);

            if (isValidPassword) {
                res.send("Login success!");
            } else {
                res.send("Login failed!");

            }

        };
    });

};

exports.subscribe = (req, res) => {
    console.log(req.params.id);
    const ACCOUNT_ID = req.params.id;

    Account.subscribe(ACCOUNT_ID, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while subscribing."
            });
        else res.send("Subscription successful!");
    });
};

exports.getSubscribers = (req, res) => {

    Account.getSubscribers((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving subscribers."
            });
        else res.send(data);
    });
};


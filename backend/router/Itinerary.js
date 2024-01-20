/**
 * @swagger
 * tags:
 *   name: Account
 *   description: The account managing API
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - ACCOUNT_ID
 *         - PASSWORD
 *         - FIRST_NAME
 *         - LAST_NAME
 *         - DOB
 *         - EMAIL
 *       properties:
 *         ACCOUNT_ID:
 *           type: integer
 *         PASSWORD:
 *           type: string
 *         FIRST_NAME:
 *           type: string
 *         LAST_NAME:
 *           type: string
 *         DOB:
 *           type: string
 *         EMAIL:
 *           type: string
 *       example:
 *         ACCOUNT_ID : 1,
 *         PASSWORD : test,
 *         FIRST_NAME : Mary,
 *         LAST_NAME : Tan,
 *         DOB : 2022-04-22,
 *         EMAIL : marytan@gamil.com,
 *     Login:
 *       type: object
 *       required:
 *         - ACCOUNT_ID
 *         - PASSWORD
 *       properties:
 *         ACCOUNT_ID:
 *           type: integer
 *         PASSWORD:
 *           type: string
 *       example:
 *         ACCOUNT_ID : 1
 *         PASSWORD : test
 *  
 * /api/account/register:
 *   post:
 *     summary: Create a new account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: The created account.
 *         example: Registration successful!
 * /api/account/login:
 *   post:
 *     summary: Create a new account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The created account.
 *         example: Login successful!
 */


module.exports = app => {
    const account = require("../controllers/Account");

    var router = require("express").Router();
    router.post("/register", account.register);
    router.post("/login", account.login);
    router.put("/subscribe/:id", account.subscribe);
    router.get("/subscribers", account.getSubscribers);

    app.use('/api/account', router);

};

// *   post:
// *     summary: Login to account
// *     tags: [Account]
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             $ref: '#/components/schemas/Login'
// *     responses:
// *       200:
// *         description: Login successful
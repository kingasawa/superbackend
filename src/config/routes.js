const express = require('express');
const appRouter = express.Router();
const UserService = require('../api/model/user');

appRouter.get('/version', async (req, res) => {
    res.status(200).send({
        msg: 'Hello, this is SPI version 1.0'
    })
})

appRouter.post('/user/login', async (req, res) => {
    console.log('req.body', req.body);
    const { email, password } = req.body;
    const result = await UserService.checkAuth(email, password);
    console.log('result', result);
    res.status(200).send(result)
})

module.exports = appRouter

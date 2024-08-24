const express = require('express');
const appRouter = express.Router();

appRouter.get('/version', async (req, res) => {
    res.status(200).send({
        msg: 'Hello, this is SPI version 1.0'
    })
})

module.exports = appRouter

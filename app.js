const express = require('express');
const app = express();

app.use('/teste', (req, res, next) => {
    res.status(200).json({
        mensagem: 'Deu certo!'
    })
});

module.exports = app; 
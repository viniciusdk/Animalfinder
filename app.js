const express = require('express');
const app = express();

const rotaDonos = require('./routes/dono');

app.use('/produtos', rotaDonos);

app.use('/teste', (req, res, next) => {
    res.status(200).json({
        mensagem: 'Deu certo!'
    })
});

module.exports = app; 
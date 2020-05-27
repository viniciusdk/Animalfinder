const express = require('express');
const app = express();

const rotaDonos = require('./routes/dono');

app.use('/produtos', rotaDonos);

module.exports = app; 
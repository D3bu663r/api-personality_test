const express = require('express');
const routers = require('./api/routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routers);

module.exports = app;
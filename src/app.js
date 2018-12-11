const express = require('express');
const routers = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routers);

module.exports = app;
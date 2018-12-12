const express = require('express');
const routers = require('./api/routers');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routers);

module.exports = app;
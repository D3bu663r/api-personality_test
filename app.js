const express = require('express');
const routers = require('./api/routers');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));

app.use('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', routers);

module.exports = app;
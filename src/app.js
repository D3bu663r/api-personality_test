const express = require('express');
const database = require('./database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
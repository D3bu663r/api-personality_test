const mongoose = require('mongoose');
const configs = require('./configs');

mongoose.connect(configs.database_connection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

module.exports = mongoose.connection;
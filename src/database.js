const mongoose = require('mongoose');
const configs = require('./configs');

mongoose.connect(configs.database_connection, {
    useNewUrlParser: true
}).then((result) => {
    console.log(`connected in ${result.connections[0].db.s.databaseName} database`);
}).catch((err) => console.log(`mongo error: ${err}`));
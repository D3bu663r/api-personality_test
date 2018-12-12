const app = require('./app');
const database = require('./api/database');

database.then(function (connection) {
    console.log(`connected in ${connection.db.s.databaseName} database`);
    const server = app.listen(process.env.PORT || 5000, function () {
        console.log(`server running on port`, server.address().port);
    });
}).catch(function (err) {
    console.log(`mongo error: ${err}`);
});
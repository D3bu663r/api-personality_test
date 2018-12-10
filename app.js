const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`app running on port`, server.address().port);
});
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// Creating the server app
const app = express();
// DB connection
dbConnection();
// CORS
app.use(cors());

console.log(process.env);

app.get('/', (req, res) => {
    res.status(202).json({
        ok: true,
        msg: 'Hello world'
    })
});

app.listen(process.env.PORT, () => {
    console.log('server works. PORT ' + process.env.PORT);
});

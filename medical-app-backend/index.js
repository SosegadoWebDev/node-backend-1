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
// Reading and parsing body
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospital', require('./routes/hospital'));
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/search', require('./routes/search-all'));
app.use('/api/upload', require('./routes/upload'));

app.listen(process.env.PORT, () => {
    console.log('server works. PORT ' + process.env.PORT);
});

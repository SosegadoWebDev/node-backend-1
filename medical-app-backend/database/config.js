const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB connected')
    } catch (error) {
        throw new Error('Error a la hora de conectar a la DB');
    }
};

module.exports = {
    dbConnection
}
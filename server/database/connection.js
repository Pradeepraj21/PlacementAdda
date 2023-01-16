const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (err) {
        // error message
        console.log('MongoDB Error: ', err);
        process.exit(1);
    }
}

module.exports = connectDB;
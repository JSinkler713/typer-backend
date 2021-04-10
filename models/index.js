require('dotenv').config();
const mongoose = require('mongoose');

const { MONGO_URL } = process.env;
const configOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

let url =  MONGO_URL || 'mongodb://localhost:27017/goog-auth'

mongoose.connect(url, configOptions)
    .then(() => console.log('MongoDB successfully connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

module.exports = {
    User: require('./user')
};


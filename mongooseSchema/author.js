const mongoose = require('mongoose');

const author = new mongoose.Schema({
    name: String, 
    age: Number
});


module.exports = mongoose.model('author', author);
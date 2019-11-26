const  mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    pass : String,
})

module.exports = mongoose.model('User',userSchema);

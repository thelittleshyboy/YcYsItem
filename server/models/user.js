const  mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    userName: String,
    passWord : String,
    design: String,
    sex: String,
    // headImg:
})

module.exports = mongoose.model('User',userSchema);

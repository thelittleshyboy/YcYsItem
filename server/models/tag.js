const  mongoose = require('mongoose')

var tagSchema=new mongoose.Schema({
    topicName: String,
    time: String
})

module.exports = mongoose.model('Tag',tagSchema);
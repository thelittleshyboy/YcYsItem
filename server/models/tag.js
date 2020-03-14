const  mongoose = require('mongoose')

var tagSchema=new mongoose.Schema({
    auid: String,
    topicName: String,
    time: String
})

module.exports = mongoose.model('Tag',tagSchema);
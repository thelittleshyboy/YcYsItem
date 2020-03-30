const  mongoose = require('mongoose')
var blogSchema=new mongoose.Schema({
    title: String,
    region: String,
    desc: String,
    time: String,
    Auid : String,
    cover: String,
    rate: Array,
    thumb: Number
})

module.exports = mongoose.model('Blog',blogSchema);
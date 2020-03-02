const  mongoose = require('mongoose')

var comtSchema=new mongoose.Schema({
   comment:String,
   time:String,
   articleId:String,
   auid: String
})


module.exports = mongoose.model('Comt',comtSchema);
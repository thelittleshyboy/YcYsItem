const  mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    userName: String,
    passWord : String,
    design: String,
    sex: String,
    sign: String, // 签名
    Collection: Array, // 收藏
    thumbsUp: Array, // 点赞
    jurisdiction: String,
    // headImg: // 头像
    status: Boolean // 号码状态
})

module.exports = mongoose.model('User',userSchema);

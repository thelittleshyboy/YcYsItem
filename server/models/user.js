const  mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    userName: String,
    passWord : String,
    birth: String, // 生日
    place: String, // 地点
    sex: String, // 性别
    sign: String, // 签名
    Collection: Array, // 收藏
    thumbsUp: Array, // 点赞
    jurisdiction: String,
    headImg: String,// 头像
    status: Boolean // 号码状态
})

module.exports = mongoose.model('User',userSchema);

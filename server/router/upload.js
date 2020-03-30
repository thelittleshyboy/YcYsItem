var express = require('express');
var multer = require('multer')
var envUrl = "175.24.73.40:80/"
var User = require("../models/user");
var Tag = require("../models/tag");
var Blog = require("../models/blog");
var upload = express();
var crypto = require('crypto');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
})

var uploads = multer({
  storage: storage
})

//单张上传图片
upload.post('/upload', uploads.single('file'), (req, res) => {
  console.log(req.body);//获取到的age和name
  console.log(req.file);//获取到的文件
  //做些其他事情
  var file = req.file
  if (file) {
    res.send({
      status: 'success',
      data: envUrl + file.filename,
    });
  } else {
    res.send({
      status: 'success',
      data: '系统未检测到图片',
    });
  }
})


upload.post('/myself', (req, res) => {
  //做些其他事情
  let updateObj = {
    userName: req.body.userName,
    headImg: req.body.headImg,
    sign: req.body.sign,
    birth: req.body.birth,
    place: req.body.place,
    sex: req.body.sex,
    passWord: req.body.passWord
  }
  for (let i in updateObj) {
    if (!updateObj[i]) {
      delete updateObj[i]
    }
  }
  if(updateObj.passWord) {
    updateObj.passWord = crypto.createHash('md5').update(updateObj.passWord).digest('hex').toUpperCase();
  }
  User.updateOne({ _id: req.body.userId }, {
    $set: updateObj
  }, (err) => {
    if (err) {
      res.send({
        status: 'failed'
      });
    }
    res.send({
      status: 'success',
      data: updateObj
    });
  })
})

// 发表页面

upload.post('/issue', uploads.single('file'), (req, res) => {
  console.log(req.body);//获取到的age和name
  console.log(req.file);//获取到的文件
  var sendArticleTime = new Date().getTime()
  if (req.body.tagInput) {
    Tag.find({ topicName: req.body.tagInput.trim() }, (err, resData) => {
      if (err) {
        res.send({
          status: 'failed',
          data: '查找话题错误！'
        })
      } else {
        if (resData.length != 0) {
          res.send({
            status: 'already',
            data: '已存在该话题，请直接筛选'
          })
        } else {
          var topics = new Tag({
            topicName: req.body.tagInput,
            time: sendArticleTime,
          });
          topics.save((err, res) => {
            if (err) console.log(err);
          });
          var blogs = new Blog({
            title: req.body.title,
            region: req.body.tagSelected === '自定义' ? req.body.tagInput : req.body.tagSelected,
            desc: req.body.desc,
            time: sendArticleTime,
            Auid: req.body.userName,
            cover: req.body.cover
          });
          blogs.save((err, resData) => {
            if (err) {
              res.send({
                status: 'failed',
              })
            }
            res.send({
              status: 'success',
              cover: req.body.cover
            })
          });
        }
      }
    })
  } else {
    var blogs = new Blog({
      title: req.body.title,
      region: req.body.tagSelected,
      desc: req.body.desc,
      time: sendArticleTime,
      Auid: req.body.userName,
      cover: req.body.cover
    });
    blogs.save((err, resData) => {
      if (err) {
        res.send({
          status: 'failed',
        })
      }
      res.send({
        status: 'success',
        cover: req.body.cover
      })
    });
  }
})

// 编辑页面
upload.post('/edit-article', (req, res) => {
  console.log(req.body);//获取到的age和name
  console.log(req.file);//获取到的文件
  //做些其他事情
  var sendArticleTime = new Date().getTime()
  if (req.body.tagInput) {
    Tag.find({ topicName: req.body.tagInput.trim() }, (err, resData) => {
      if (err) {
        res.send({
          status: 'failed',
          data: '查找话题错误！'
        })
      } else {
        if (resData.length != 0) {
          res.send({
            status: 'already',
            data: '已存在该话题，请直接筛选'
          })
        } else {
          var topics = new Tag({
            topicName: req.body.tagInput,
            time: sendArticleTime,
          });
          topics.save((err, res) => {
            if (err) console.log(err);
          });
          Blog.updateOne({ _id: req.body._id }, {
            $set: {
              title: req.body.title,
              region: req.body.tagInput,
              desc: req.body.desc,
              cover: req.body.cover
            }
          }, (err, blog) => {
            if (err) {
              res.send({
                status: 'failed'
              });
            } else {
              res.send({
                status: 'success'
              });
            }
          })
        }
      }
    })
  } else {
    Blog.updateOne({ _id: req.body._id }, {
      $set: {
        title: req.body.title,
        region: req.body.tagSelected,
        desc: req.body.desc,
        cover: req.body.cover
      }
    }, (err, blog) => {
      if (err) {
        res.send({
          status: 'failed'
        });
      } else {
        res.send({
          status: 'success'
        });
      }
    })
  }
})

module.exports = upload;
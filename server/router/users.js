const express = require("express");
var router = express.Router();
var User = require("../models/user");
var Blog = require("../models/blog");
var Comt = require("../models/comt");
var crypto = require('crypto');
// 图片上传
var multer = require('multer')
var upload = multer({ dest: 'upload/' });



//登录
router.route("/login").post((req, res) => {
     const truePassword = crypto.createHash('md5').update(req.body.passWord).digest('hex').toUpperCase();
     User.findOne({ userName: req.body.userName, passWord: truePassword }, (err, user) => {
          if (err) {
               res.send({
                    status: 'failed',
                    data: '查询用户错误！'
               })
          } else {
               req.session.user = user
               res.send({
                    status: 'success',
                    data: user
               })
          }
     }
     );
});

router.route("/logout").post((req, res) => {
     delete req.session.user
     res.send({
          status: 'success'
     })
});
//注册
router.route("/register").post((req, res) => {
     if (req.body.userName && req.body.passWord) {
          const truePassword = crypto.createHash('md5').update(req.body.passWord).digest('hex').toUpperCase();
          User.find({ userName: req.body.userName }, (err, resData) => {
               if (err) {
                    res.send({
                         status: 'failed',
                         data: '创建用户错误！'
                    })
               } else {
                    if (resData.length === 0) {
                         var time = new Date().getTime();
                         var users = new User({
                              userName: req.body.userName,
                              passWord: truePassword,
                              time: time,
                         });
                         users.save((err, res) => {
                              if (err) console.log(err);
                         });
                         res.send({
                              status: 'success',
                              data: '创建成功'
                         })
                    } else {
                         res.send({
                              status: 'success',
                              data: '该用户已存在！'
                         })
                    }
               }
          })
     }
});
// 首页数据
router.route("/all-article").post((req, res) => {
     console.log(req.body.searchValue)
     if (req.body.searchValue) {
          var qs=new RegExp(req.body.searchValue);
          Blog.find({title: qs}, (err, blog) => {
               if (err) {
                    console.log(err);
               }
               console.log(blog)
               res.send({
                    status: 'success',
                    data: blog
               });
          })
     } else {
          Blog.find({}, (err, blog) => {
               if (err) {
                    console.log(err);
               }
               console.log(blog)
               res.send({
                    status: 'success',
                    data: blog
               });
          })
     }
          // .sort({
          //      _id: -1
          // })
          // .limit(3)
          // .skip((page - 1) * 3);
});

router.route("/remote-search").post((req, res) => {
     console.log(req.body.query)
     if (req.body.query) {
          var remoteqs=new RegExp(req.body.query);
          Blog.find({title: remoteqs}, (err, blog) => {
               if (err) {
                    console.log(err);
               }
               res.send({
                    status: 'success',
                    data: blog.map(el => el ? el.title : el)
               });
          })
     }
});

// 个人数据
router.route("/my-article").post((req, res) => {
     Blog.find({Auid:req.body.userName}, (err, blog) => {
          if (err) {
               console.log(err);
          }
          console.log(blog)
          res.send({
               status: 'success',
               data: blog
          });
     })
})

//删除信息
router.route("/delete-article").post((req, res) => {
     Blog.deleteOne({ _id:req.body.id }, (err, blog) => {
          if (err) {
               res.send({
                    status: 'failed'
               });
          }
          res.send({
               status: 'success'
          });
     })
})

//编辑信息
router.route("/edit-article").post((req, res) => {
     Blog.updateOne({ _id:req.body._id }, {$set: {
           title : req.body.title,
           region: req.body.region,
           desc: req.body.desc
          }}, (err, blog) => {
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
})
// // 文章列表
// router.route("/list").get(async (req, res) => {
//      const { page } = req.query;
//      try {
//           const total = await Blog.find().countDocuments();
//           const lists = await Blog.find({})
//                .skip((page - 1) * 3)
//                .limit(3);
//           res.json({
//                ok: 1,
//                data: {
//                     lists,
//                     pagination: {
//                          total,
//                          page
//                     }
//                }
//           });
//      } catch (error) {
//           console.log(error);
//      }
// });
// 发表页面
router.route("/issue").post((req, res) => {
     var sendArticleTime = new Date().getTime()
     var blogs = new Blog({
          title: req.body.title,
          region: req.body.region,
          desc: req.body.desc,
          time: sendArticleTime,
          Auid: req.body.userName,
     });
     blogs.save((err, resData) => {
          if (err) {
               res.send({
                    status: 'failed',
               })
          }
          res.send({
               status: 'success'
          })
     });
     // Blog.find({}, (err, blog) => {
     //      if (err) {
     //           console.log(err);
     //      }
     //      console.log(blog);
     //      res.json(blog ? blog : {});
     //      var times = new Date();
     //      var time =
     //           times.getFullYear() +
     //           "-" +
     //           (times.getMonth() + 1) +
     //           "-" +
     //           times.getDate() +
     //           " " +
     //           times.getHours() +
     //           ":" +
     //           times.getMinutes() +
     //           ":" +
     //           times.getSeconds();

     //      if (req.body.title == "" || req.body.content == "" || req.body.tag == "") {
     //           return false;
     //      } else {

     //           //     存储数据
               
     //           res.end();
     //      }
     // });
});


// router.route('/Nav').post((req, res) => {

//      Blog.find({ "title": req.body.msg }, (err, blog) => {
//           if (err) { console.log(err); }
//           console.log(req.body.msg)
//           console.log(blog)
//           res.json(blog ? blog : {});

//      })


// })

// //电影筛选页面
// router.route('/Movie').post((req, res) => {
//      if (req.body.my == "其他") {
//           Blog.find({}, (err, blog) => {
//                if (err) { console.log(err); }
//                console.log(req.body.my)
//                console.log(blog)
//                res.json(blog ? blog : {});


//           })
//      } else {
//           Blog.find({ "title": req.body.my }, (err, blog) => {
//                if (err) { console.log(err); }
//                console.log(req.body.my)
//                console.log(blog)
//                res.json(blog ? blog : {});


//           })
//      }

// })


// //点赞
// router.route("/bonus").post((req, res) => {
//      Blog.findOne({
//           id: req.body.data._id
//      });
// });
// // 判断cookie
// router.route("/checkCookie").get((req, res) => {
//      if (!req.session.userName) {
//           console.log(req.session.userName)
//           res.end("");
//      } else {
//           let userName = req.session.userName;
//           User.findOne({
//                name: userName
//           }, (err, user) => {
//                res.json({ 'userName': userName, 'userAvatar': user.Avatar });
//           })

//           console.log("Cookie" + req.session.userName);
//      }
// });
// //退出即删除cookie
// router.route("/deleteCookie").get((req, res) => {
//      res.clearCookie(req.session.userName);

//      req.session.destroy(function (err) {
//           if (err) {
//                res.json({ ret_code: 2, ret_msg: "退出登录失败" });
//                return;
//           }
//      });
//      // console.log('req.session.userName ' + req.session.userName);

// });

//详情页面
router.route("/details-article").post((req, res) => {
     console.log(req.body);
     Blog.findOne({ _id: req.body.id},(err, blog) => {
          if (err) {
               res.send({
                    status: 'failed'
               });
          }
          res.send({
               status: 'success',
               data: blog
          });
     })
})

// //存储评论数据
// router.route("/ContentInfo/Submit/:id").post((req, res) => {
//      console.error(req);
//      if (req.body.input == "") {
//           return false;
//      } else {
//           var comts = new Comt({
//                comment: req.body.input,
//                article_id: req.params.id
//           });
//           comts.save((err, res) => {
//                if (err) console.log(err);
//                console.log("保存成功" + res);
//           });
//      }
// });

// // 上传图片
// router.route('/Myinfo', upload.single('avatar')).post((req, res, next) => {
//      User.findOne({
//           name: req.body.user
//      }, (err, user) => {
//           if (err) console.log(err);
//           user.Avatar = req.body.imageUrl;
//           console.log('user' + user);
//      })
// });
// router.route('/Myinfo').get((req, res, next) => {
//      res.send('get' + res)
// });
module.exports = router;
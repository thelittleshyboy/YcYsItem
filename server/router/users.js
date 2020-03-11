const express = require("express");
var router = express.Router();
var User = require("../models/user");
var Blog = require("../models/blog");
var Comt = require("../models/comt");
var Tag = require("../models/tag");
var crypto = require('crypto');
// 图片上传



//登录
router.route("/login").post((req, res) => {
     const truePassword = crypto.createHash('md5').update(req.body.passWord).digest('hex').toUpperCase();
     User.findOne({ userName: req.body.userName, passWord: truePassword }, (err, user) => {
          if (err) {
               res.send({
                    status: 'failed',
                    data: '查询用户错误！'
               })
          } else if (user && user.status) {
               req.session.user = user
               res.send({
                    status: 'success',
                    data: user
               })
          } else if (user && !user.status) {
               res.send({
                    status: 'failed',
                    data: '该账号已被封停'
               })
          } else if (!user) {
               res.send({
                    status: 'failed',
                    data: '用户不存在或账号密码错误'
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
                              jurisdiction: 'user',
                              status: true，
		              headImg: '175.24.73.40:80/none.jpg'
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

// 用户新增评论
router.route("/comment").post((req, res) => {
     var commentTime = new Date().getTime();
     var comments = new Comt({
          comment: req.body.comment,
          time: commentTime,
          articleId: req.body.articleId,
          auid: req.body.auid
     });
     comments.save((err) => {
          if (err) console.log(err);
     })
     res.send({
          status: 'success'
     });
});

// 拉取用户评论
router.route("/get-comment").post((req, res) => {
     Comt.find({ articleId: req.body.articleId }, (err, comment) => {
          if (err) {
               console.log(err);
          }
          res.send({
               status: 'success',
               data: comment,
          });
     })
});

//根据id找用户
router.route("/find-user").post((req, res) => {
     User.findOne({_id: req.body.id}, (err, user) => {
          if (err) {
               console.log(err);
          }
          res.send({
               status: 'success',
               data: user
          });
     })
});

//用户管理拉取列表
router.route("/all-user").post((req, res) => {
     let userObject = req.body
     let userPage = req.body.page
     let userLength = 0
     delete userObject.page
     for (var key in userObject) {
          if (!userObject[key]) {
               delete userObject[key]
          } else if (userObject[key] && userObject[key] !== 'true' && userObject[key] !== 'false') {
               userObject[key] = new RegExp(userObject[key])
          }
     }
     User.find(userObject, (err, user) => {
          if (err) {
               console.log(err);
          }
          userLength = user.length
     })
     User.find(userObject, (err, blog) => {
          if (err) {
               console.log(err);
          }
          res.send({
               status: 'success',
               data: blog,
               total: userLength,
               pageSize: 10
          });
     })
          .limit(10)
          .skip((userPage - 1) * 10);
});

// 首页数据
router.route("/all-article").post((req, res) => {
     const infoObject = req.body
     let articleLength = 0
     let page = req.body.page
     delete infoObject.page
     for (var i in infoObject) {
          if (!infoObject[i]) {
               delete infoObject[i]
          } else {
               infoObject[i] = new RegExp(infoObject[i])
          }
     }
     Blog.find(infoObject, (err, blog) => {
          if (err) {
               console.log(err);
          }
          articleLength = blog.length
     })
     Blog.find(infoObject, (err, blog) => {
          if (err) {
               console.log(err);
          }
          res.send({
               status: 'success',
               data: blog,
               total: articleLength,
               pageSize: 8
          });
     }).sort({ time: -1 }).limit(8)
          .skip((page - 1) * 8);
});

// 话题管理新增话题
router.route("/add-topic").post((req, res) => {
     if (req.body.topicName) {
          Tag.find({ topicName: req.body.topicName }, (err, resData) => {
               if (err) {
                    res.send({
                         status: 'failed',
                         data: '创建话题错误！'
                    })
               } else {
                    if (resData.length === 0) {
                         var time = new Date().getTime();
                         var topics = new Tag({
                              topicName: req.body.topicName,
                              time: time,
                         });
                         topics.save((err, res) => {
                              if (err) console.log(err);
                         });
                         res.send({
                              status: 'success',
                              data: '创建成功'
                         })
                    } else {
                         res.send({
                              status: 'failed',
                              data: '该话题已存在！'
                         })
                    }
               }
          })
     }
})

// // 修改签名
// router.route("/change-sign").get((req, res) => {
//      User.find({ sign: req.body.signInput, id: req.body. }, (err, tag) => {
//           if (err) {
//                console.log(err);
//           }
//           res.send({
//                status: 'success',
//                data: tag
//           });
//      }).sort({ time: -1 }).limit(8)
// });

// 最新话题
router.route("/new-topic").get((req, res) => {
     Tag.find({}, (err, tag) => {
          if (err) {
               console.log(err);
          }
          res.send({
               status: 'success',
               data: tag
          });
     }).sort({ time: -1 }).limit(8)
});

// 话题管理远程搜索列表
router.route("/remote-topic").post((req, res) => {
     if (req.body.query) {
          var remoteTopic = new RegExp(req.body.query);
          Tag.find({ topicName: remoteTopic }, (err, tag) => {
               if (err) {
                    console.log(err);
               }
               res.send({
                    status: 'success',
                    data: tag
               });
          })
     }
});

// 话题管理拉取列表
router.route("/topic-manage").post((req, res) => {
     let topicObject = req.body
     let topicPage = req.body.page
     let topicLength = 0
     delete topicObject.page
     if (!topicObject.topicName) {
          topicObject = {}
     }
     topicObject.topicName = new RegExp(topicObject.topicName)
     Tag.find(topicObject, (err, topic) => {
          if (err) {
               console.log(err);
          }
          topicLength = topic.length
     })
     Tag.find(topicObject, (err, blog) => {
          if (err) {
               console.log(err);
          }
          res.send({
               status: 'success',
               data: blog,
               total: topicLength,
               pageSize: 10
          });
     }).sort({ time: -1 }).limit(10)
          .skip((topicPage - 1) * 10);
});


// 远程搜索
router.route("/remote-search").post((req, res) => {
     if (req.body.query) {
          var remoteqs = new RegExp(req.body.query);
          Blog.find({ title: remoteqs }, (err, blog) => {
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
     let articleLength = 0
     let myArticlePage = req.body.page
     Blog.find({ Auid: req.body.userName }, (err, blog) => {
          if (err) {
               console.log(err);
          }
          articleLength = blog.length
     })
     Blog.find({ Auid: req.body.userName }, (err, blog) => {
          if (err) {
               console.log(err);
          }
          res.send({
               status: 'success',
               data: blog,
               total: articleLength,
               pageSize: 3
          });
     }).limit(3)
          .skip((myArticlePage - 1) * 3);
})

//删除信息
router.route("/delete-article").post((req, res) => {
     Blog.deleteOne({ _id: req.body.id }, (err, blog) => {
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

// 点赞
router.route("/article-thumb-on").post((req, res) => {
     User.findOne({ _id: req.body.userId }, (err, data) => {
          if (err) {
               res.send({
                    status: 'failed'
               });
          } else {
               let nowArray = [...data.thumbsUp, req.body.id]
               User.updateOne({ _id: req.body.userId }, {
                    $set: {
                         thumbsUp: nowArray
                    }
               }, (err, ifThumb) => {
                    if (err) {
                         res.send({
                              status: 'failed'
                         });
                    }
                    res.send({
                         status: 'success'
                    });
               })
          }
     })
})
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
     Blog.findOne({ _id: req.body.id }, (err, blog) => {
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

//用户管理更新
router.route("/user-manage").post((req, res) => {
     User.updateOne({ _id: req.body._id }, {
          $set: {
               userName: req.body.userName,
               jurisdiction: req.body.jurisdiction,
               status: req.body.status
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
})

//用户管理删除
router.route("/user-delete").post((req, res) => {
     User.deleteOne({ _id: req.body.userId }, (err, blog) => {
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


module.exports = router;
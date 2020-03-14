<template>
  <div>
    <div class="header">
      <div class="head-background" :style="{'backgroundImage': 'url('+url+')','backgroundSize': '100%'}">
      </div>
      <el-image class="head-img" :src="headUrl" :preview-src-list="srcList"></el-image>
    </div>
    <div class="body-background">
      <div>
        <el-row>
          <div class="details-title">{{ detailObject.title }}</div>
          <el-col>
            <el-row style="position:absolute;right: 20px;top:40px">
              <el-tooltip class="item" effect="dark" content="点赞" placement="top-start">
                <el-button
                  type="primary"
                  icon="el-icon-thumb"
                  circle
                  @click="confirmThumb"
                  v-if="showThumb"
                ></el-button>
                <el-button type="primary" circle @click="already" v-else>已赞</el-button>
              </el-tooltip>
              <!-- <el-button type="warning" icon="el-icon-star-on" circle></el-button> -->
              <el-tooltip class="item" effect="dark" content="收藏" placement="top-start">
                <el-button type="warning" icon="el-icon-star-off" circle @click="confirmRate"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="评论" placement="top-start">
                <el-button type="danger" icon="el-icon-tickets" circle @click="openComment"></el-button>
              </el-tooltip>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="detail-header">
          <el-col :span="4" :offset="3">作者：{{ detailObject.Auid }}</el-col>
          <el-col :span="4">发表时间：{{ (detailObject.time || '') | parseTime('{y}-{m}-{d}') }}</el-col>
          <el-col :span="4">标签：#{{ detailObject.region }}#</el-col>
          <el-col :span="6">
            <span style="display: inline">
              评分：
              <el-rate v-model="rateStar" show-text @change="confirmRate" style="display:inline-block"></el-rate>
            </span>
          </el-col>
        </el-row>
        <div class="detail-body" v-html="detailObject.desc"></div>
        <div class="comment-border">
          <div class="comment-input">
            <div v-show="commentVisible">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1}"
                placeholder="请输入回复内容(点击作者可回复哦~)"
                v-model="comment"
                style="width:90%;margin-left:0"
              ></el-input>
              <el-button type="primary" plain class="answer-btn" @click="commitComment">回复</el-button>
            </div>
            <el-divider></el-divider>
            <div class="comment-history">
              <div v-show="commentList.length === 0" style="margin-left:48%">暂无评论</div>
              <div v-for="(item, index) in commentList" :key="index" class="comment-list">
                <span @click="ReplyAuthor(item.auid)" style="cursor:pointer">{{ item.auid }}</span> : {{ item.comment }}
                <el-divider></el-divider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  detailsArticle,
  articleThumb,
  comment,
  getComment,
  rate
} from "../api/article";
import {
  allUser
} from "../api/user";


export default {
  name: "DetailsArticle",
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      commentVisible: false,
      commentList: [],
      headUrl: 'http://175.24.73.40:80/none.jpg',
      comment: "",
      rateStar: null,
      auid: null,
      showThumb: true,
      detailObject: {
        title: null,
        region: null,
        desc: null,
        time: null,
        Auid: null
      },
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ]
    };
  },
  created() {
    this.detailsArticle();
    this.getComment();
  },
  methods: {
    ReplyAuthor(auid) {
      this.comment = '(回复' + auid + '):'
    },
    openComment() {
      if (!JSON.parse(localStorage.getItem("user"))) {
        this.$message.error("请先登录后方可评论");
        return;
      }
      this.commentVisible = true;
    },
    getComment() {
      getComment({ articleId: this.$route.params.id }).then(res => {
        if (res.data.status === "success") {
          this.commentList = res.data.data;
        }
      }),
        err => {
          this.$message.success("获取评论列表失败");
        };
    },
    allUser() {
      this.tableLoading = true
      allUser({ userName:this.detailObject.Auid }).then(res => {
        if (res.data.status === 'success') {
          this.headUrl = 'http://' + res.data.data[0].headImg
        }
      }), err => {
        console.log(err)
        this.tableLoading = false
      }
    },
    rate(param) {
      rate(param).then(res => {
        if (res.data.status === 'success') {
        }
      }), err => {
        console.log(err)
        this.tableLoading = false
      }
    },
    commitComment() {
      let params = {
        articleId: this.$route.params.id,
        comment: this.comment,
        auid: JSON.parse(localStorage.getItem("user")).userName
      };
      comment(params).then(res => {
        if (res.data.status === "success") {
          this.$message.success("评论成功");
          this.comment = "";
          this.getComment();
        }
      }),
        err => {
          this.$message.success("评论失败");
        };
    },
    detailsArticle() {
      detailsArticle({ id: this.$route.params.id }).then(res => {
        if (res.data.status === "success") {
          this.detailObject = res.data.data;
          this.url = "http://" + res.data.data.cover;
          if (JSON.parse(localStorage.getItem("user"))._id) {
            let findUser = res.data.data.rate.find(el => el.auid === JSON.parse(localStorage.getItem("user"))._id)
            this.rateStar = Number(findUser ? findUser.rate : null)
          }
          this.allUser()
        }
      }),
        err => {};
    },
    already() {
      this.showThumb = true;
    },
    confirmThumb() {
      if (
        JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user")).userName
      ) {
        articleThumb({
          id: this.$route.params.id,
          userId: JSON.parse(localStorage.getItem("user"))._id
        }).then(res => {
          if (res.data.status === "success") {
            this.showThumb = false;
          }
        }),
          err => {};
      } else {
        this.$message.error("请先登录再操作");
      }
    },
    confirmRate(query) {
      if (
        JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user")).userName
      ) {
        let rateParam = {
          rate: query,
          auid: JSON.parse(localStorage.getItem("user"))._id,
          articleId: this.$route.params.id
        }
        this.rate(rateParam)
      } else {
        this.$message.error("请先登录再操作");
        this.rateStar = null;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 99.5%;
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  overflow: hidden;
}
.head-background {
  width: 100%;
  height: 300px;
  filter: blur(5px);
  z-index: 1;
  position: absolute;
  top: 0px;
  left: 0px;
}
.head-img {
  z-index: 2;
  border-radius: 50px;
  width: 100px;
  height: 100px;
}
.body-background {
  position: relative;
  width: 99.5%;
  min-height: 600px;
}
.details-title {
  font-size: 40px;
  margin-top: 40px;
}
.detail-header {
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-top: 30px;
}
.detail-body {
  width: 40%;
  margin: 100px 30% 0 30%;
  white-space: pre-line;
}
.comment-border {
  width: 80%;
  margin: 10%;
}
.comment-input {
  white-space: nowrap;
  width: 100%;
  padding: 10px 0;
}
.answer-btn {
  display: inline-block;
  height: 33px;
  margin-left: 20px;
}
.comment-history {
  width: 100%;
  text-align: left;
}
.comment-list {
  margin-top: 20px;
}
</style>

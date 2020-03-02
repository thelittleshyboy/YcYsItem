<template>
  <div>
    <div class="head-background">
      <div class="details-title">{{ detailObject.title }}</div>
    </div>
    <div class="body-background">
      <span class="head-img">
        <el-image
          style="width: 100px; height: 100px;border-radius: 50px;margin-top:20px;"
          :src="url"
          :preview-src-list="srcList"
        ></el-image>
      </span>
      <div>
        <el-row class="detail-header">
          <el-col :span="4" :offset="3">作者：{{ detailObject.Auid }}</el-col>
          <el-col :span="4">发表时间：{{ (detailObject.time || '') | parseTime('{y}-{m}-{d}') }}</el-col>
          <el-col :span="4">标签：#{{ detailObject.region }}#</el-col>
          <el-col :span="5">
            <span style="display: inline">
              评分：
              <el-rate v-model="rate" show-text @change="confirmRate"></el-rate>
            </span>
          </el-col>
          <el-col :span="4">
            <el-row style="float:right;padding-right:20px">
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
        <div class="detail-body" v-html="detailObject.desc"></div>
        <div class="comment-border">
          <div class="comment-input">
            <div v-show="commentVisible">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1}"
                placeholder="请输入回复内容"
                v-model="comment"
                style="width:90%;margin-left:0"
              ></el-input>
              <el-button type="primary" plain class="answer-btn" @click="commitComment">回复</el-button>
            </div>
            <el-divider></el-divider>
            <div class="comment-history">
              <div v-show="commentList.length === 0" style="margin-left:48%">暂无评论</div>
              <div v-for="(item, index) in commentList" :key="index" class="comment-list">
                {{ item.auid }} : {{ item.comment }}
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
import { detailsArticle, articleThumb, comment, getComment } from '../api/article'

export default {
  name: 'DetailsArticle',
  data() {
    return {
      commentVisible: false,
      commentList: [],
      comment: '',
      rate: null,
      showThumb: true,
      detailObject: {
        title: null,
        region: null,
        desc: null,
        time: null,
        Auid: null
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
    }
  },
  created() {
    this.detailsArticle()
    this.getComment()
  },
  methods: {
    openComment() {
      if (!JSON.parse(localStorage.getItem('user'))) {
        this.$message.error('请先登录后方可评论')
        return
      }
      this.commentVisible = true
    },
    getComment() {
      getComment({ articleId: this.$route.params.id }).then(res => {
        if (res.data.status === 'success') {
          this.commentList = res.data.data
        }
      }), err => {
        this.$message.success('获取评论列表失败')
      }
    },
    commitComment() {
      let params = {
        articleId: this.$route.params.id,
        comment: this.comment,
        auid: JSON.parse(localStorage.getItem('user')).userName
      }
      comment(params).then(res => {
        if (res.data.status === 'success') {
          this.$message.success('评论成功')
          this.comment = ''
          this.getComment()
        }
      }), err => {
        this.$message.success('评论失败')
      }
    },
    detailsArticle() {
      detailsArticle({ id: this.$route.params.id }).then(res => {
        if (res.data.status === 'success') {
          this.detailObject = res.data.data
        }
      }), err => {
      }
    },
    already() {
      this.showThumb = true
    },
    confirmThumb() {
      if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userName) {
        articleThumb({ id: this.$route.params.id, userId: JSON.parse(localStorage.getItem('user'))._id }).then(res => {
          if (res.data.status === 'success') {
            this.showThumb = false
          }
        }), err => {
        }
      } else {
        this.$message.error('请先登录再操作')
      }
    },
    confirmRate(query) {
      if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userName) {
      } else {
        this.$message.error('请先登录再操作')
        this.rate = null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head-background {
  width: 99.5%;
  height: 300px;
  border: 1px solid goldenrod;
  background-image: url("../assets/headback.jpg");
}
.head-img {
  border-radius: 20px;
  position: absolute;
  left: 15%;
  top: 310px;
}
.body-background {
  width: 99.5%;
  min-height: 600px;
  border: 1px solid goldenrod;
}
.details-title {
  font-size: 40px;
  padding-top: 150px;
}
.detail-header .el-col {
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  padding-top: 30px;
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

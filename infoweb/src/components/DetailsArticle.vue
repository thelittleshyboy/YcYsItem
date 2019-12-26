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
          <el-col :span="5"><span style="display: inline">评分：<el-rate v-model="rate" show-text @change="confirmRate"></el-rate></span></el-col>
          <el-col :span="4">
            <el-row style="float:right;padding-right:20px">
              <el-button type="primary" icon="el-icon-edit" circle @click="confirmRate"></el-button>
              <!-- <el-button type="warning" icon="el-icon-star-on" circle></el-button> -->
              <el-button type="warning" icon="el-icon-star-off" circle @click="confirmRate"></el-button>
              <el-button type="danger" icon="el-icon-tickets" circle @click="confirmRate"></el-button>
            </el-row>
          </el-col>
        </el-row>
        <div class="detail-body" v-html="detailObject.desc"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailsArticle } from '../api/article'

export default {
  name: 'DetailsArticle',
  data() {
    return {
      rate: null,
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
  },
  methods: {
    detailsArticle() {
      detailsArticle({ id: this.$route.params.id }).then(res => {
        if (res.data.status === 'success') {
          this.detailObject = res.data.data
        }
      }), err => {
      }
    },
    confirmRate(query) {
      if (localStorage.getItem('user')) {
        console.log(query)
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
  width: 100%;
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
  width: 100%;
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
</style>

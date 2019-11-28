<template>
  <div id="app">
    <div class="tab-back">
      <div class="demo-image__preview">
        <el-image
          style="width: 100px; height: 100px;border-radius: 50px;margin-top:20px;"
          :src="url"
          :preview-src-list="srcList"
        ></el-image>
      </div>
      <h3>{{user}}</h3>
      <div><i class="el-icon-edit"></i>签名是一种态度，我想我可以更酷！</div>
      <el-tabs type="border-card" @tab-click="getList">
        <el-tab-pane label="个人资料">个人资料</el-tab-pane>
        <el-tab-pane label="发布信息">
          <el-form ref="infoForm" :model="infoForm" label-width="80px" v-loading="infoLoading">
            <el-form-item label="信息名称">
              <el-input v-model="infoForm.title"></el-input>
            </el-form-item>
            <el-form-item label="信息归类">
              <el-select v-model="infoForm.region" placeholder="请选择活动区域" style="width:100%">
                <el-option label="电影" value="电影"></el-option>
                <el-option label="小说" value="小说"></el-option>
                <el-option label="游戏" value="游戏"></el-option>
                <el-option label="美食" value="美食"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="信息内容">
              <el-input
                type="textarea"
                v-model="infoForm.desc"
                maxlength="1000"
                :rows="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="信息管理">
          <div v-show="myList.length===0">您暂未发表文章</div>
          <div class="info-manage">
            <el-row v-for="(item, index) in myList" :key="index" class="details-info">
              <el-col :span="6">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 100%; height: 200px;"
                    :src="url"
                    :preview-src-list="srcList"
                  ></el-image>
                </div>
              </el-col>
              <el-col :span="18">
                <el-row>
                  <el-col :span="23">
                    <h2 style="float:left;margin-left:25px">{{ item.title }}</h2>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23" style="overflow:hidden;margin-left:25px">{{ item.desc }}</el-col>
                </el-row>
                <el-row>
                  <el-rate
                    v-model="rate"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                    style="float:right;margin-right:25px;margin-top:10px"
                  ></el-rate>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { sendInfo, getAuList } from '../api/article'

export default {
  name: 'App',
  data() {
    return {
      rate: 3.7,
      infoLoading: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
      ],
      infoForm: {
        title: '',
        region: '',
        desc: '',
        userName: null
      },
      myList: []
    }
  },
  methods: {
    onSubmit() {
      this.infoLoading = true
      if (localStorage.getItem('user')) {
        this.infoForm.userName = localStorage.getItem('user')
      }
      if (!this.infoForm.title || !this.infoForm.region || !this.infoForm.desc || !this.infoForm.userName) {
        this.$message.error('发布失败')
        return
      }
      sendInfo(this.infoForm).then(res => {
        if (res.data.status === 'success') {
          this.$message.success('发布成功')
          this.infoLoading = false
          this.infoForm = {
            title: '',
            region: '',
            desc: ''
          }
        }
      }), err => {
        this.$message.error('发布失败')
        this.infoLoading = false
      }
    },
    getList(tab) {
      if (localStorage.getItem('user') && tab.index === '2') {
        getAuList({ userName: localStorage.getItem('user') }).then(res => {
          if (res.data.status === 'success') {
            this.myList = res.data.data
          }
        }), err => {
        }
      }
    }
  },
  mounted() {
  },
  computed: {
    user() {
      return localStorage.getItem('user') ? localStorage.getItem('user') : null
    }
  }
}
</script>

<style>
#app {
  padding: 0px;
  margin: 0px;
}
.el-tabs {
  width: 80%;
  margin-left: 10%;
}
.tab-back {
  border: 1px;
  background-image: url("../assets/backImg3.jpg");
  width: 100%;
  height: 1000px;
}
.info-manage {
  width: 100%;
  height: 200px;
}
.details-info {
  border: 1px solid #e0e0e0;
  margin-top: 10px;
  line-height: 20px;
  text-align: left;
}
.el-icon-edit {
  cursor: pointer;
  margin-bottom: 20px;
  margin-right:10px
}
</style>

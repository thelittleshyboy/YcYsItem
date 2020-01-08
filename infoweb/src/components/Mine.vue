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
      <h3>{{ user }}</h3>
      <div>
        <i
          class="el-icon-edit"
          style="cursor: pointer;
                 margin-bottom: 20px;
                margin-right: 10px;"
          @click="showInput"
        ></i>
        <span v-if="signShow">{{ sign }}</span>
        <span v-else>
          <el-input
            v-model="signInput"
            placeholder="请输入签名内容"
            style="width:256px"
            @keyup.enter.native="saveSign"
          ></el-input>
        </span>
      </div>
      <el-tabs type="border-card" v-model="activeName" @tab-click="getList">
        <el-tab-pane label="个人资料" name="personalInfo">
          <el-form ref="infoForm" :model="infoForm" label-width="80px" v-loading="infoLoading">
            <el-form-item label="用户名">
              <div style="float:left">{{ user }}</div>
            </el-form-item>
            <el-form-item label="修改密码">
              <el-input v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item label="上传头像">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                style="float:left"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" alt />
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" v-show="!ifEdit">确 定</el-button>
              <el-button @click="init">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="发布信息" name="sendInfo">
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
                <el-option label="新闻" value="新闻"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="信息内容">
              <el-input
                type="textarea"
                v-model="infoForm.desc"
                maxlength="5000"
                :rows="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onEdit" v-show="ifEdit">确定编辑</el-button>
              <el-button type="primary" @click="onSubmit" v-show="!ifEdit">立即创建</el-button>
              <el-button @click="init">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="信息管理">
          <div v-show="myList.length===0">您暂未发表文章</div>
          <div class="info-manage">
            <el-row v-for="(item, index) in myList" :key="index" class="details-info">
              <router-link :to="{name:'DetailsArticle',params:{id:item._id}}">
                <el-col :span="6">
                  <div class="demo-image__preview">
                    <el-image
                      style="width: 100%; height: 200px;"
                      :src="url"
                      :preview-src-list="srcList"
                    ></el-image>
                  </div>
                </el-col>
              </router-link>
              <el-col :span="18">
                <el-row>
                  <el-col :span="14">
                    <h2
                      style="float:left;margin-left:25px;color:black"
                    >{{ item ? item.title : '' | ellipsis(20) }}</h2>
                  </el-col>
                  <el-col :span="10">
                    <el-row style="margin-top:10px;float:right;margin-right:20px">
                      <el-button type="primary" icon="el-icon-edit" circle @click="backForm(item)"></el-button>
                      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click="del(item, index)"
                      ></el-button>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="23"
                    style="overflow:hidden;margin-left:25px;color:black"
                  >{{ item ? item.desc : '' | ellipsis(300) }}</el-col>
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
import { sendInfo, getAuList, deleteArticle, editArticle } from '../api/article'

export default {
  name: 'App',
  filters: {

  },
  data() {
    return {
      dialogVisible: false,
      signInput: null,
      signShow: true,
      sign: '签名是一种态度，我想我可以更酷！',
      ifEdit: false,
      activeName: 'sendInfo',
      manageLoading: false,
      rate: 3.7,
      infoLoading: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
      infoForm: {
        title: '',
        region: '',
        desc: '',
        userName: null
      },
      userForm: {
        password: '',
      },
      myList: []
    }
  },
  methods: {
    init() {
      this.infoForm = {
        title: '',
        region: '',
        desc: ''
      }
    },
    handlePictureCardPreview() {
      this.dialogVisible = true
    },
    handleRemove() {},
    showInput() {
      this.signShow = false
      this.signInput = this.sign
    },
    saveSign() {
      this.sign = this.signInput
      this.signShow = true
    },
    onSubmit() {
      this.infoLoading = true
      if (localStorage.getItem('user')) {
        this.infoForm.userName = JSON.parse(localStorage.getItem('user')).userName
      }
      if (!this.infoForm.title || !this.infoForm.region || !this.infoForm.desc || !this.infoForm.userName) {
        this.$message.error('发布失败')
        return
      }
      sendInfo(this.infoForm).then(res => {
        if (res.data.status === 'success') {
          this.$message.success('发布成功')
          this.init()
          this.infoLoading = false
        }
      }), err => {
        this.$message.error('发布失败')
        this.init()
        this.infoLoading = false
      }
    },
    getList(tab) {
      if (localStorage.getItem('user').userName && tab.index === '2') {
        getAuList({ userName: JSON.parse(localStorage.getItem('user')).userName }).then(res => {
          if (res.data.status === 'success') {
            this.myList = res.data.data
          }
        }), err => {
        }
      }
    },
    del(item, index) {
      deleteArticle({ id: item._id }).then(res => {
        if (res.data.status === 'success') {
          getAuList({ userName: JSON.parse(localStorage.getItem('user')).userName }).then(res => {
            if (res.data.status === 'success') {
              this.myList = res.data.data
              this.$message.success('删除成功')
            }
          }), err => {
            this.$message.success('删除失败')
          }
        }
      }), err => {
      }
    },
    backForm(item) {
      this.infoForm = Object.assign({}, item)
      this.activeName = 'sendInfo'
      this.ifEdit = true
    },
    onEdit(item) {
      editArticle(this.infoForm).then(res => {
        if (res.data.status === 'success') {
          this.$message.success('编辑成功')
          this.init()
        }
      }), err => {
      }
    }
  },
  mounted() {
  },
  computed: {
    user() {
      return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : null
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
</style>

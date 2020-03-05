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
            @keydown.enter.native="saveSign"
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
                class="avatar-uploader"
                :limit="1"
                :action="uploadPic"
                :on-exceed="onLimit"
                :file-list="fileList"
                list-type="picture-card"
                :http-request="beforeUpload"
                :on-change="changeFiles"
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
              <el-button type="primary" @click="onPersonalSubmit" v-show="!ifEdit">确 定</el-button>
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
              <el-select
                v-model="infoForm.tagSelected"
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod"
                placeholder="请输入并选择选择话题"
                :style="{'width': infoForm.tagSelected === '自定义' ? '50%' : '100%'}"
              >
                <el-option :key="defaultObject" :label="defaultObject" :value="defaultObject"></el-option>
                <el-option
                  v-for="(item, index) in topicOptions"
                  :key="index"
                  :label="item.topicName"
                  :value="item.topicName"
                ></el-option>
              </el-select>
              <el-input
                v-show="infoForm.tagSelected === '自定义'"
                v-model="infoForm.tagInput"
                placeholder="请输入你想创建的话题"
                style="display:inline-block;width:49%"
              ></el-input>
            </el-form-item>
            <el-form-item label="上传封面">
              <el-upload
                class="avatar-uploader"
                :limit="1"
                :action="uploadPic"
                :on-exceed="onLimit"
                :file-list="fileList"
                list-type="picture-card"
                :http-request="beforeUpload"
                :on-change="changeFiles"
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
        <el-tab-pane label="信息管理" style="height: 680px">
          <div v-show="myList.length===0">您暂未发表文章</div>
          <div class="info-manage">
            <el-row v-for="(item, index) in myList" :key="index" class="details-info">
              <router-link :to="{name:'DetailsArticle',params:{id:item._id}}">
                <el-col :span="6">
                  <div class="demo-image__preview">
                    <el-image
                      style="width: 100%; height: 200px;"
                      :src="item.cover ? 'http://'+item.cover : 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'"
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
          <el-pagination
            background
            layout="prev, pager, next, jumper, slot"
            :total="totalNum"
            :page-size="pageSize"
            :current-page="page"
            @current-change="current_change"
            style="position: absolute;bottom: 10px;left: 45%;"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="点赞与收藏">点赞与收藏</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { sendInfo, getAuList, deleteArticle, editArticle, upload } from '../api/article'
import { remoteSearch } from '../api/topic'
import picUpload from '../components/upload/picUpload'
import { uploadPic } from '../../config/devConfig'

export default {
  name: 'App',
  components: {
    picUpload
  },
  data() {
    return {
      uploadPic: uploadPic,
      fileList: [],
      uploadFile: null,
      pageSize: 0,
      page: 1,
      totalNum: 0,
      defaultObject: '自定义',
      topicOptions: [],
      dialogVisible: false,
      signInput: null,
      signShow: true,
      sign: '签名是一种态度，我想我可以更酷！',
      ifEdit: false,
      activeName: 'sendInfo',
      manageLoading: false,
      rate: 3.7,
      infoLoading: false,
      infoForm: {
        title: '',
        tagSelected: null,
        tagInput: null,
        desc: '',
        userName: null
      },
      userForm: {
        password: '',
      },
      myList: []
    }
  },
  computed: {
    url() {
      return localStorage.getItem('user') ? 'http://' + JSON.parse(localStorage.getItem('user')).headImg : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    srcList() {
      return localStorage.getItem('user') ? ['http://' + JSON.parse(localStorage.getItem('user')).headImg] : ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']
    },
    user() {
      return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : null
    }
  },
  methods: {
    init() {
      this.infoForm = {
        title: '',
        tagSelected: null,
        tagInput: null,
        desc: ''
      }
    },
    onLimit() {
      this.$message.error("头像只能上传一张")
    },
    changeFiles(file, fileList) {
    },
    beforeUpload(val) {
      this.uploadFile = val.file
    },
    current_change(index) {
      this.page = index
      this.getList({ index: '2' })
    },
    dealFormData(formDataList) {
      const formData = new FormData();
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (!this.uploadFile) { // 若未选择文件
        this.$message.error('请选择上传图片')
        return false;
      }
      formDataList.forEach(item => {
        formData.append(item.key, item.value)
      })
      return [formData, headerConfig]
    },
    onPersonalSubmit() {
      let list = [{ key:'file',value: this.uploadFile }, { key: 'userId', value: JSON.parse(localStorage.getItem('user'))._id }]
      upload(this.dealFormData(list)[0], this.dealFormData(list)[1]).then(res => {
        if (res.data.status === "success") {
          this.$message.success('修改成功,请重新登录')
        }
      }).catch((error) => {
      })
    },
    remoteMethod(query) {
      remoteSearch({ query: query.trim() }).then(res => {
        if (res.data.status === "success") {
          this.topicOptions = res.data.data
        }
      }).catch((error) => {
        this.$message.error('失败！')
      })
    },
    handlePictureCardPreview() {
      this.dialogVisible = true
    },
    handleRemove() { },
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
      if (!this.infoForm.title || !this.infoForm.tagSelected || !this.infoForm.tagInput || !this.infoForm.desc || !this.infoForm.userName) {
        if (this.infoForm.tagSelected === '自定义' && !this.infoForm.tagInput) {
          this.$message.error('信息不能有空')
          this.infoLoading = false
          return
        }
      }
      let infoFormList = []
      for (let prop in this.infoForm) {
        infoFormList.push({
          key: prop,
          value: this.infoForm[prop]
        })
      }
      infoFormList = [{ key:'file',value: this.uploadFile }, ...infoFormList]
      sendInfo(this.dealFormData(infoFormList)[0], this.dealFormData(infoFormList)[1]).then(res => {
        if (res.data.status === 'success') {
          this.$message.success('发布成功')
          this.init()
          this.infoLoading = false
        } else {
          this.$message.error(res.data.data)
          this.infoLoading = false
        }
      }), err => {
        this.$message.error('发布失败')
        this.init()
        this.infoLoading = false
      }
    },
    getList(tab) {
      if (JSON.parse(localStorage.getItem('user')).userName && tab.index === '2') {
        getAuList({ userName: JSON.parse(localStorage.getItem('user')).userName, page: this.page }).then(res => {
          if (res.data.status === 'success') {
            this.myList = res.data.data
            this.pageSize = res.data.pageSize
            this.totalNum = res.data.total
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
      this.infoForm.tagSelected = item.region
      this.activeName = 'sendInfo'
      this.ifEdit = true
    },
    onEdit(item) {
      let editList = []
      for (let prop in this.infoForm) {
        editList.push({
          key: prop,
          value: this.infoForm[prop]
        })
      }
      editList = [{ key:'file',value: this.uploadFile }, ...editList]
      editArticle(this.dealFormData(editList)[0], this.dealFormData(editList)[1]).then(res => {
        if (res.data.status === 'success') {
          this.$message.success('编辑成功')
          this.init()
        }
      }), err => {
      }
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
  min-height: 1000px;
  padding-bottom: 50px;
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

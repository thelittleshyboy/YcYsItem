<template>
  <div id="app">
    <el-container>
      <el-aside width="180px">
        <span v-if="!user">
          <el-button
            type="text"
            style="margin-left:50px;color:#ffd04b"
            @click="Login"
          >登录&nbsp;|&nbsp;注册</el-button>
        </span>
        <span v-else style="margin-left:60px">
          欢迎您：
          <div style="color:#ffd04b;text-align:center">
            <div class="demo-image__preview">
              <el-image
                style="width: 70px; height: 70px;border-radius: 50px;margin-top:20px;"
                :src="url"
              ></el-image>
            </div>
            {{user}},
            <span class="logout" @click="Logout">退出</span>
          </div>
        </span>
        <el-row>
          <el-col :span="24">
            <el-menu
              default-active="/home"
              class="el-menu-vertical-demo"
              background-color="#444444"
              text-color="#fff"
              active-text-color="#ffd04b"
              :router="true"
            >
              <el-menu-item index="/home">
                <i class="el-icon-menu"></i>
                <span slot="title">主页</span>
              </el-menu-item>
              <el-menu-item index="/mine">
                <i class="el-icon-document"></i>
                <span slot="title">我的</span>
              </el-menu-item>
              <el-menu-item index="/classify">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>话题</span>
                </template>
              </el-menu-item>
              <el-submenu index="/manage" v-show="manage">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/manage/infomanage">信息管理</el-menu-item>
                  <el-menu-item index="/manage/usermanage">用户管理</el-menu-item>
                  <el-menu-item index="/manage/topicmanage">话题管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header height="80px">
          <el-row>
            <el-col :span="2">
              <img
                src=""
                style="padding-top: 10px;width: 100px;height: 50px"
              />
            </el-col>
            <el-col :span="10">
              <span class="main-title">有创意信息发布站</span>
            </el-col>
            <el-col :span="11">
              <div class="search-input">
                <el-select
                  v-model="searchValue"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入文章标题搜索"
                  :remote-method="remoteMethod"
                  clearable
                  :loading="remoteLoading"
                  @change="searchArticle"
                  style="width:400px"
                >
                  <el-option
                    v-for="(item, index) in searchOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
                <!-- <el-input placeholder="请输入文章标题搜索" v-model="searchValue">
              <el-button slot="append" icon="el-icon-search" @click="searchArticle"></el-button>
                </el-input>-->
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="欢迎来到XX"
      :visible.sync="dialogVisible"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="pass">
          <el-input
            type="text"
            v-model="loginForm.userName"
            auto-complete="off"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input
            type="password"
            v-model="loginForm.passWord"
            auto-complete="off"
            style="width:300px"
            @keyup.enter.native="commitLogForm"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="loginTag">
        <el-button type="text" @click="registerVisible = true;dialogVisible = false">还没注册？</el-button>
        <span>|</span>
        <el-button type="text">忘记密码？</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitLogForm">登录</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="欢迎来到XX"
      :visible.sync="registerVisible"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        :model="registerForm"
        status-icon
        :rules="registerules"
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="pass">
          <el-input
            type="text"
            v-model="registerForm.userName"
            auto-complete="off"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registerForm.passWord"
            auto-complete="off"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registerForm.checkWord"
            auto-complete="off"
            style="width:300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">注册</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { registerUser } from './api/user'
import { remoteSearch } from './api/article'

export default {
  name: 'App',
  data() {
    return {
      remoteLoading: false,
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
      ],
      searchOptions: [],
      searchValue: null,
      activeName: 'login',
      registerVisible: false,
      dialogVisible: false,
      loginForm: {
        userName: null,
        passWord: null
      },
      registerForm: {
        userName: null,
        passWord: null,
        checkWord: null
      },
      registerules: {},
      rules: {}
    }
  },
  mounted() {
    this.searchOptions = []
  },
  watch: {
  },
  computed: {
    manage() {
      return localStorage.getItem('manage')
    },
    url() {
      return localStorage.getItem('user') ? 'http://'+JSON.parse(localStorage.getItem('user')).headImg : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    user() {
      return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : null
    }
  },
  methods: {
    Login() {
      this.dialogVisible = true
    },
    Logout() {
      if (this.user) {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
          this.$message.success('已退出登录')
        })
          .catch((error) => {
            this.$message.error('系统发生异常！')
            console.log(error)
          })
      }
    },
    register() {
      if (this.registerForm.passWord !== this.registerForm.checkWord) {
        this.$message.error('两次输入密码不一致！');
        return;
      }
      registerUser(this.registerForm).then(res => {
        if (res.data.data === '该用户已存在！') {
          this.$message.error(res.data.data)
          return
        }
        this.$message.success(res.data.data)
        this.registerVisible = false
      }).catch((error) => {
        this.$message.error('创建失败！')
      })
    },
    submitForm() {

    },
    handleClick() {
    },
    searchArticle() {
      this.$store.dispatch('search', this.searchValue)
      this.$router.push({ path: '/home' })
    },
    remoteMethod(query) {
      this.remoteLoading = true
      remoteSearch({ query: query.trim() }).then(res => {
        if (res.data.status === "success") {
          this.searchOptions = res.data.data
          this.remoteLoading = false
        }
      }).catch((error) => {
        this.$message.error('失败！')
        this.remoteLoading = false
      })
    },
    commitLogForm() {
      if (this.loginForm.userName && this.loginForm.passWord) {
        let params = {
          userName: this.loginForm.userName,
          passWord: this.loginForm.passWord
        };
        this.$store.dispatch('Login', params).then(() => {
          this.$message.success('登录成功！')
          this.dialogVisible = false
          setTimeout(() => {
            location.reload()
          }, 500)
        })
          .catch((error) => {
          })
      } else {
      }
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-container .el-aside {
  padding-top: 20px;
}
.el-dialog {
  background-image: url("./assets/backImg.jpg");
  background-size: 100% 100%;
}
.el-dialog .el-form .el-form-item .el-input {
  opacity: 0.7;
}
.search-input {
  float: right;
  opacity: 1;
  width: 400px;
}
.logout {
  cursor: pointer;
  font-size: 12px;
}
.el-main {
  padding: 0;
}
.main-title {
  font-family: "Comic Sans MS", cursive, sans-serif
}
</style>

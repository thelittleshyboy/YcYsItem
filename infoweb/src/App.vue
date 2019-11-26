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
              <el-submenu index="/classify">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>分类</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">全部</el-menu-item>
                  <el-menu-item index="/classify/movie">电影</el-menu-item>
                  <el-menu-item index="1-3">小说</el-menu-item>
                  <el-menu-item index="1-4">游戏</el-menu-item>
                  <el-menu-item index="1-5">美食</el-menu-item>
                  <el-menu-item index="1-6">丽人</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/manage">
                <i class="el-icon-setting"></i>
                <span slot="title">管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header height="80px">
          Header
          <div class="search-input">
            <el-input placeholder="请输入搜索内容" v-model="input">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="欢迎来到XX" :visible.sync="dialogVisible" width="500px">
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
    <el-dialog title="欢迎来到XX" :visible.sync="registerVisible" width="500px">
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
import { registerUser } from './api/api'

export default {
  name: 'App',
  data() {
    return {
      input: null,
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
  },
  watch: {

  },
  computed: {
    user() {
      return localStorage.getItem('user') ? localStorage.getItem('user') : null
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
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    },
    submitForm() {

    },
    handleClick() {

    },
    commitLogForm() {
      if (this.loginForm.userName && this.loginForm.passWord) {
        let params = {
          userName: this.loginForm.userName,
          passWord: this.loginForm.passWord
        };
        this.$store.dispatch('Login', params).then(() => {
          this.$message.success('登录成功')
          this.dialogVisible = false
          setTimeout(() => {
            location.reload()
          }, 500)
        })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$message.error('请输入用户名或密码')
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
</style>

<template>
  <div id="app">
    <el-container>
      <el-aside width="180px">
        <el-button type="text" style="margin-left:50px;color:#ffd04b">登录&nbsp;&nbsp;</el-button>|<el-button type="text" style="color:#ffd04b">注册</el-button>
        <el-row>
          <el-col :span="24">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#444444"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">主页</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-document"></i>
                <span slot="title">我的</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>分类</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">全部</el-menu-item>
                  <el-menu-item index="1-2">电影</el-menu-item>
                  <el-menu-item index="1-3">小说</el-menu-item>
                  <el-menu-item index="1-4">游戏</el-menu-item>
                  <el-menu-item index="1-5">美食</el-menu-item>
                  <el-menu-item index="1-6">丽人</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header height="80px">Header</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(this.$route)
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
</style>

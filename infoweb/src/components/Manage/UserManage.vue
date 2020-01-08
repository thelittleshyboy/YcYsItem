<template>
  <div id="app">
    <el-table :data="userTableData" border style="width: 95%;margin:30px">
      <el-table-column prop="userName" label="用户">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column prop="jurisdiction" label="权限">
        <template slot-scope="scope">{{ scope.row.jurisdiction }}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
         <template slot-scope="scope">
           <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
           <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allUser } from '../../api/user'

export default {
  name: 'App',
  data() {
    return {
      userTableData: [],
      searchValue: null
    }
  },
  mounted() {
    this.allUser()
  },
  computed: {
  },
  methods: {
    allUser() {
      allUser({ searchValue: this.searchValue}).then(res => {
        if (res.data.status === 'success') {
          this.userTableData = res.data.data
        }
      }), err => {
        console.log(err)
      }
    },
    edit(row) {

    },
    del(row) {

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
</style>

<template>
  <div id="app">
    <el-form :inline="true" :model="formInline" class="search-form-inline">
      <el-form-item label="账号">
        <el-input v-model="formInline.userName" placeholder="输入账号名"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="formInline.jurisdiction" placeholder="请选择" style="width: 100%" clearable>
          <el-option
            v-for="(item, index) in jurisdictionOptions"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="帐号状态">
        <el-select v-model="formInline.status" placeholder="请选择" style="width: 100%" clearable>
          <el-option
            v-for="(item, index) in statusOptions"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="tableLoading" :data="userTableData" border style="width: 95%;margin:0 30px">
      <el-table-column prop="userName" label="用户">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column prop="jurisdiction" label="权限">
        <template slot-scope="scope">{{ scope.row.jurisdiction }}</template>
      </el-table-column>
      <el-table-column prop="jurisdiction" label="账号状态">
        <template slot-scope="scope">{{ scope.row.status === true ? '正常' : '封停' }}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑-用户管理" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false">
      <el-form label-width="80px" :model="formAlign">
        <el-form-item label="用户名">
          <el-input v-model="formAlign.userName"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="formAlign.jurisdiction" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="(item, index) in jurisdictionOptions"
              :key="index"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帐号状态">
          <el-select v-model="formAlign.status" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { allUser } from '../../api/user'
import { userManage, userDelete } from '@/api/manage'

export default {
  name: 'App',
  data() {
    return {
      dialogVisible: false,
      tableLoading: false,
      userTableData: [],
      searchValue: null,
      formAlign: {
        userName: null,
        jurisdiction: null,
        status: true,
      },
      jurisdictionOptions: [{
        name: 'admin',
        type: 'admin'
      }, {
        name: 'user',
        type: 'user'
        }],
      statusOptions: [{
        name: '正常',
        type: true
      }, {
        name: '封停',
        type: false
      }],
      formInline: {
        userName: null,
        jurisdiction: null,
        status: null
      }
    }
  },
  mounted() {
    this.allUser()
  },
  computed: {
  },
  methods: {
    onSubmit() {
      this.allUser()
    },
    allUser() {
      this.tableLoading = true
      allUser(this.formInline).then(res => {
        if (res.data.status === 'success') {
          this.userTableData = res.data.data
          this.tableLoading = false
        }
      }), err => {
        console.log(err)
        this.tableLoading = false
      }
    },
    userManage() {
      userManage(this.formAlign).then(res => {
        if (res.data.status === 'success') {
          this.allUser()
          this.dialogVisible = false
        }
      }), err => {
        console.log(err)
      }
    },
    userDelete(id) {
      userDelete({ userId: id}).then(res => {
        if (res.data.status === 'success') {
          this.allUser()
          this.dialogVisible = false
        }
      }), err => {
        console.log(err)
      }
    },
    edit(row) {
      this.formAlign = Object.assign({}, row)
      this.dialogVisible = true
    },
    del(row) {
      this.userDelete(row._id)
    },
    confirm() {
      this.userManage()
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<template>
  <div id="app">
    <el-form :inline="true" :model="formInline" class="search-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="formInline.Auid" placeholder="输入文章作者"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="tableLoading"
      :data="infoTableData"
      border
      style="width: 95%;margin:0 30px"
    >
      <el-table-column prop="userName" label="创建时间">
        <template slot-scope="scope">{{ scope.row.time | parseTime('{y}-{m}-{d}') }}</template>
      </el-table-column>
      <el-table-column prop="userName" label="信息名称">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="jurisdiction" label="标签">
        <template slot-scope="scope">{{ scope.row.region }}</template>
      </el-table-column>
      <el-table-column prop="jurisdiction" label="作者">
        <template slot-scope="scope">{{ scope.row.Auid }}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">查看</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper, slot"
      :total="totalNum"
      :page-size="pageSize"
      class="custom-pagination"
      :current-page="page"
      @current-change="current_change"
      style="margin-top: 20px"
    ></el-pagination>
  </div>
</template>

<script>
import { getAllList, deleteArticle } from '@/api/article'

export default {
  name: 'App',
  data() {
    return {
      totalNum: 0,
      page: 1,
      pageSize: 0,
      tableLoading: false,
      infoTableData: [],
      formAlign: {
        userName: null,
        jurisdiction: null,
        status: true,
      },
      formInline: {
        title: null,
        Auid: null,
        page: 1
      }
    }
  },
  mounted() {
    this.getAllList()
  },
  computed: {
  },
  methods: {
    onSubmit() {
      this.getAllList()
    },
    current_change(index) {
      this.formInline.page = index
      this.getAllList()
    },
    getAllList() {
      this.tableLoading = true
      getAllList(this.formInline).then(res => {
        if (res.data.status === 'success') {
          this.totalNum = res.data.total
          this.pageSize = res.data.pageSize
          this.infoTableData = res.data.data
          this.tableLoading = false
        }
      }), err => {
        console.log(err)
        this.tableLoading = false
      }
    },
    edit(row) {
        this.$router.push('/details/'+row._id)
    },
    del(row) {
      deleteArticle({ id: row._id }).then(res => {
        if (res.data.status === 'success') {
          this.$message.success('删除成功')
          this.page = 1
          this.getAllList()
        }
      }), err => {
        this.$message.success('删除失败')
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
  color: #2c3e50;
}
</style>

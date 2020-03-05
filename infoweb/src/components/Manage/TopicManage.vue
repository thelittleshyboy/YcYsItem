<template>
  <div id="app">
    <el-form :inline="true" :model="formInline" class="search-form-inline">
      <el-form-item label="话题">
        <el-input v-model="formInline.topicName" placeholder="输入话题标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="addNew">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="tableLoading"
      :data="topicTableData"
      border
      style="width: 95%;margin:0 30px"
    >
      <el-table-column prop="userName" label="创建时间">
        <template slot-scope="scope">{{ scope.row.time | parseTime('{y}-{m}-{d}') }}</template>
      </el-table-column>
      <el-table-column prop="userName" label="话题名称">
        <template slot-scope="scope">{{ scope.row.topicName }}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
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
    <el-dialog title="新增-话题管理" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false">
      <el-form label-width="80px" :model="formAlign">
        <el-form-item label="话题">
          <el-input v-model="formAlign.topicName"></el-input>
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
import { topicManage, addTopic } from '@/api/topic'

export default {
  name: 'App',
  data() {
    return {
      dialogVisible: false,
      totalNum: 0,
      page: 1,
      pageSize: 0,
      tableLoading: false,
      topicTableData: [],
      formAlign: {
        topicName: null,
      },
      formInline: {
        topicName: null,
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
    addNew() {
      this.dialogVisible = true
    },
    onSubmit() {
      this.getAllList()
    },
    current_change(index) {
      this.formInline.page = index
      this.getAllList()
    },
    confirm() {
      addTopic(this.formAlign).then(res => {
        if (res.data.status === 'success') {
          this.$message.success('新增成功')
          this.getAllList()
          this.dialogVisible = false
          this.tableLoading = false
        }
      }), err => {
        console.log(err)
        this.tableLoading = false
      }
    },
    getAllList() {
      this.tableLoading = true
      topicManage(this.formInline).then(res => {
        if (res.data.status === 'success') {
          this.totalNum = res.data.total
          this.pageSize = res.data.pageSize
          this.topicTableData = res.data.data
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

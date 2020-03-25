<template>
  <div class="main-body">
    <el-row>
      <el-col :span="12">
        <div class="show-box"></div>
      </el-col>
      <el-col :span="12">
        <div class="show-box"></div>
      </el-col>
    </el-row>
    <div ref="myChart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>

<script>

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
    this.drawChart()
  },
  computed: {
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(this.$refs['myChart'])
      // 绘制图表
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      })
    }
  }
}
</script>

<style>
.main-body {
  margin: 50px;
  border: 1px solid black;
  padding: 20px;
}
.show-box {
  width: 90%;
  height: 150px;
  border: 1px solid black
}
</style>

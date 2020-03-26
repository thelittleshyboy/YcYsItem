<template>
  <div class="main-body">
    <el-row>
      <el-col :span="11">
        <div class="show-box">
          <div>
            <h5>今日发表新增</h5>
            <i class="el-icon-top" style="color: green;font-size: 40px">{{ blogNewList.length }}条</i>
          </div>
        </div>
      </el-col>
      <el-col :span="11" :offset="1">
        <div class="show-box">
          <div>
            <h5>今日用户新增</h5>
            <i class="el-icon-top" style="color: green;font-size: 40px">1位</i>
          </div>
        </div>
      </el-col>
    </el-row>
    <h3 style="text-align:center;margin-top:20px">最近七日用户活跃度</h3>
    <div ref="myChart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>

<script>
import { blogStatistics, numStatistics } from '../../api/manage'

export default {
  name: 'App',
  data() {
    return {
      blogNewList: [],
      statisticsList: [],
      sendVisible: true,
      userVisible: false,
    }
  },
  mounted() {
    this.numStatistics()
    this.blogStatistics()
  },
  computed: {
  },
  methods: {
    blogStatistics() {
      blogStatistics().then(res => {
        if (res.data.status === 'success') {
          this.blogNewList = res.data.data
        }
      }), err => {
        console.log(err)
      }
    },
    numStatistics() {
      numStatistics().then(res => {
        if (res.data.status === 'success') {
          this.statisticsList = res.data.data
          this.drawChart()
        }
      }), err => {
        console.log(err)
      }
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let truelist = []
      this.statisticsList.forEach((el, index)=> {
        truelist.push(el.length)
      })
      this.chart = this.$echarts.init(this.$refs['myChart'])
      // 绘制图表
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: ['7天前', '6天前', '5天前', '4天前', '前日', '昨日', '今日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data:  truelist.reverse(),
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
  border: 1px solid #C0C0C0;
  padding: 20px;
}
.show-box {
  width: 95%;
  height: 100px;
  border: 1px solid #C0C0C0;
  padding: 10px 20px;
  font-size: 18px;
  line-height: 2px;
  color: rgba(0,0,0,.65);
  font-family: Avenir,Helvetica,Arial,sans-serif;
  text-align: left;
}
</style>

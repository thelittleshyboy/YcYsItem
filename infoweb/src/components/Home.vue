<template>
  <div>
    <el-carousel :interval="3000" type="card" height="300px">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img :src="item.idView" style="width:841.5px;height:300px" />
      </el-carousel-item>
    </el-carousel>
    <h2>精选推荐</h2>
    <el-divider></el-divider>
    <div class="card-list-outside">
      <div class="card-list" v-for="(item, index) in allList" :key="index">
        <el-card class="card-style">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div class="card-content">
            <h3>{{ item.title }}</h3>
            <h5>#{{ item.region }}#</h5>
            <div>{{ item.desc }}</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllList } from '../api/article'

export default {
  name: 'HelloWorld',
  data() {
    return {
      allList: [],
      input: '',
      imgList: [{
        id: '1',
        idView: require('../assets/carouselImg1.jpg')
      }, {
        id: '2',
        idView: require('../assets/carouselImg2.jpg')
      }, {
        id: '3',
        idView: require('../assets/carouselImg3.jpg')
      }]
    }
  },
  mounted() {
    getAllList().then(res => {
      if (res.data.status === 'success') {
        this.allList = res.data.data
      }
    }),err => {
      console.log(err)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}

.card-list-outside {
  margin-left: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card-list {
  margin-top: 10px;
  margin-left: 10px;
  width: 320px;
}

.card-style {
  width: 300px;
  height: 400px;
  line-height: 20px;
  cursor: pointer;
}
.card-content {
  height:300px
}
</style>

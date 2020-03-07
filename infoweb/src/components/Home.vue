<template>
  <div>
    <div class="main-left">
      <el-carousel height="300px" class="carousel">
        <el-carousel-item v-for="item in imgList" :key="item.idView">
          <img :src="item.idView" style="width:100%;height:300px" />
        </el-carousel-item>
      </el-carousel>
      <h2>
        <span v-if="searchValue">搜索结果</span>
        <span v-if="!searchValue">精选推荐</span>
      </h2>
      <el-divider></el-divider>
      <div class="card-list-outside" v-loading="cardListLoading">
        <div class="card-list" v-for="(item, index) in allList" :key="index">
          <router-link :to="{name:'DetailsArticle',params:{id:item._id}}">
            <el-card class="card-style">
              <img
                :key="index"
                :src="item.cover ? 'http://'+item.cover : 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'"
                class="image"
              />
              <div class="card-content">
                <h3>{{ item.title | ellipsis(10) }}</h3>
                <h5>#{{ item.region }}#</h5>
                <div>{{ item.desc | ellipsis(46) }}</div>
              </div>
            </el-card>
          </router-link>
        </div>
      </div>
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
    <div class="hot-user">
      <h2>活跃用户</h2>
      <div class="hot-user-headimg">
        <div v-for="(item, index) in hotUserList" :key="index" style="margin-left: 15px">
          <img
            :key="index"
            :src="'http://'+item.headImg"
            style="width:50px;height:50px;border-radius: 25px"
          />
          <div style="font-size: 10px">{{ item.userName }}</div>
        </div>
      </div>
    </div>
    <div class="hot-title">
      <h2>最新话题</h2>
      <div v-for="(item, index) in topicNewList" :key="index">
        <el-button type="text" style="color: #333;" @click="jumpTopic(item)">#{{ item.topicName }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllList, articleDetails } from "../api/article";
import DetailsArticle from "./DetailsArticle.vue";
import { allUser } from "../api/user";
import { newTopic } from "../api/topic";

export default {
  name: "HelloWorld",
  data() {
    return {
      hotUserList: [],
      cardListLoading: false,
      topicNewList: [],
      page: 1,
      totalNum: 0,
      pageSize: 0,
      detailForm: null,
      allList: [],
      input: "",
      imgList: [
        {
          id: "1",
          idView: require("../assets/carouselImg1.jpg")
        },
        {
          id: "2",
          idView: require("../assets/carouselImg2.jpg")
        },
        {
          id: "3",
          idView: require("../assets/carouselImg3.jpg")
        }
      ]
    };
  },
  mounted() {
    this.getAllList();
    this.newTopic();
    this.allUser();
  },
  computed: {
    searchValue() {
      return this.$store.state.searchCode;
    }
  },
  watch: {
    searchValue() {
      this.getAllList();
    }
  },
  methods: {
    allUser() {
      allUser({ page: 1 }).then(res => {
        if (res.data.status === "success") {
          this.hotUserList = res.data.data;
        }
      }),
        err => {
          console.log(err);
          this.tableLoading = false;
        };
    },
    jumpTopic(item) {
      this.$router.push({
        name: "Topic",
        params: { searchValue: item.topicName }
      });
    },
    current_change(index) {
      this.page = index;
      this.getAllList();
    },
    newTopic() {
      newTopic().then(res => {
        if (res.data.status === "success") {
          this.topicNewList = res.data.data;
        }
      }),
        err => {
          console.log(err);
        };
    },
    getAllList() {
      this.cardListLoading = true;
      getAllList({ title: this.searchValue, page: this.page }).then(res => {
        if (res.data.status === "success") {
          this.allList = res.data.data;
          this.totalNum = res.data.total;
          this.pageSize = res.data.pageSize;
          this.cardListLoading = false;
        }
      }),
        err => {
          console.log(err);
          this.cardListLoading = false;
        };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-left {
  width: 70%;
}

.hot-user-headimg {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 150px;
  text-align: center;
}

.hot-user {
  width: 15%;
  height: 200px;
  position: absolute;
  top: 100px;
  right: 3%;
  background: #f2f2f5;
  padding: 20px;
  border-top: 1px solid #fa2f2f;
  margin-bottom: 20px;
  text-align: center;
}

.hot-title {
  width: 15%;
  height: 500px;
  position: absolute;
  top: 400px;
  right: 3%;
  background: #f2f2f5;
  padding: 20px;
  border-top: 1px solid #fa2f2f;
  margin-bottom: 20px;
  text-align: center;
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
  width: 280px;
}

.card-style {
  width: 250px;
  height: 400px;
  line-height: 20px;
  cursor: pointer;
}
.card-content {
  text-decoration: none;
  height: 300px;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>

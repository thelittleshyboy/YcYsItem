<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="17" :offset="1">
        <div class="topic-content">
          <div v-show="myList.length===0">没有搜索到结果哦~</div>
          <el-row v-for="(item, index) in myList" :key="index" class="details-info">
            <router-link :to="{name:'DetailsArticle',params:{id:item._id}}">
              <el-col :span="8">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 100%; height: 220px;"
                    :src="item.cover ? 'http://'+item.cover : 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'"
                  ></el-image>
                </div>
              </el-col>
            </router-link>
            <el-col :span="16">
              <el-row>
                <el-col :span="22">
                  <div style="margin-left:25px">#{{ item.region }}#</div>
                  <h2
                    style="float:left;margin-left:25px;color:black"
                  >{{ item ? item.title : '' | ellipsis(20) }}</h2>
                </el-col>
                <el-col :span="2">
                  <el-row style="margin-top:10px;float:right;margin-right:20px">
                    <el-button type="primary" icon="el-icon-back" circle @click="handleWatch(item)"></el-button>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  :span="23"
                  style="overflow:hidden;margin-left:25px;color:black"
                >{{ item ? item.desc : '' | ellipsis(100) }}</el-col>
              </el-row>
              <el-row>
                <el-rate
                  v-model="item.trueRate"
                  disabled
                  show-text
                  text-color="#ff9900"
                  score-template="{value}"
                  style="float:right;margin-right:25px;margin-top:10px"
                ></el-rate>
              </el-row>
            </el-col>
          </el-row>
          <el-pagination
            background
            layout="prev, pager, next, jumper, slot"
            :total="totalNum"
            :page-size="pageSize"
            :current-page="page"
            @current-change="current_change"
            style="margin-top:20px"
          ></el-pagination>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="topic-right">
          <div class="topic-right-text">
            <h1>话题</h1>
          </div>
          <div class="topic-right-header">
            <el-input placeholder="请输入话题搜索" v-model="searchValue" class="search-input">
              <el-button slot="append" icon="el-icon-search" @click="getAllList"></el-button>
            </el-input>
            <div class="history-search" v-show="searchList.length !== 0">
              <el-tag v-for="(tag, index) in searchList" :key="index" closable style="margin-left: 10px;cursor: pointer;" @click="historyBack(tag)" @close="popHistory(index)">
                {{tag}}
              </el-tag>
            </div>
          </div>
          <div class="topic-right-hot">
            <h2>最新话题</h2>
            <div v-for="(item, index) in topicNewList" :key="index">
              <div style="color: #333;margin-top:5px">#{{ item.topicName }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllList } from "../../api/article";
import { newTopic } from "../../api/topic";

export default {
  name: "Topic",
  data() {
    return {
      myList: [],
      searchList: [],
      topicNewList: [],
      page: 1,
      totalNum: 0,
      pageSize: 0,
      rate: 3.7,
      searchValue: null
    };
  },
  mounted() {
    this.newTopic();
    if(this.$route.params.searchValue) {
      this.searchValue = this.$route.params.searchValue
    }
    this.getAllList();
  },
  methods: {
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
    handleWatch(item) {
      this.$router.push("/details/" + item._id);
    },
    popHistory(index) {
      this.searchList.splice(index, 1)
    },
    historyBack(tag) {
      this.searchValue = tag
      this.getAllList()
    },
    current_change(index) {
      this.page = index;
      this.getAllList();
    },
    getAllList() {
      if (this.searchValue) {
        this.searchList.unshift(this.searchValue);
      }
      getAllList({ region: this.searchValue, page: this.page }).then(res => {
        if (res.data.status === "success") {
          this.myList = res.data.data;
          this.myList.forEach(el => {
            let nowArray = el.rate.map(item => item.rate)
            el.trueRate = (nowArray.reduce((a, b)=>{return Number(a) + Number(b) }, 0)) / nowArray.length
          })
          this.pageSize = res.data.pageSize;
          this.totalNum = res.data.total;
        }
      }),
        err => {};
    }
  }
};
</script>

<style scoped>
.el-main {
  overflow: hidden;
}
.el-row {
  margin-top: 20px;
}
.topic-content {
  width: 100%;
  padding-bottom: 20px;
  padding-top: 20px;
}
.topic-right {
  margin-top: 30px;
  width: 100%;
}
.topic-right-text {
  text-align: center;
  font-size: 30px;
  height: 50px;
}
.topic-right-header {
  background: #f8f8f8;
  padding: 5px;
  min-height: 200px;
  margin-top: 5px;
  text-align: center;
  background-image: url("../../assets/backSearch.jpg");
  background-size: 100% 100%;
}
.search-input {
  margin-top: 20px;
  margin-right: 10%;
  width: 80%;
}
.topic-right-hot {
  background: #f2f2f5;
  margin-top: 20px;
  border-top: 1px solid #fa2f2f;
  margin-bottom: 20px;
  min-height: 500px;
  text-align: center;
}
.details-info {
  border: 1px solid #e0e0e0;
  margin-top: 10px;
  line-height: 20px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.history-search {
  width: 100%;
  margin-top: 90px;
  height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
}
</style>

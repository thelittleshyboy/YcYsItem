<template>
	<view class="content">
		<top-bar @searchValue="searchValue"></top-bar>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="item in bannerList">
							<view :style="{'backgroundImage': 'url('+item.bg+')','background-size':'100% 100%','width':'100%','height':'100%'}"></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="box-tp" />
		<scroll-view scroll-x="true" @scroll="scroll" class="bookshelf-content">
			<view style="display: inline-block;width:150px;height:80px;margin-left: 10px;text-align: center;" v-for="item in imgList">
				<view :style="{'backgroundImage': 'url('+item.bg+')','width':'100%','height':'100%'}"></view>
				<text style="font-size: 12px;">{{ item.text }}</text>
			</view>
		</scroll-view>
		<view>
			<text class="second-title">{{secondTitle}}</text>
		</view>
		<view class="box-tp" />
		<view v-for="item in contentList" class="main-content">
			<uni-card :title="item.title" mode="style" :is-shadow="true" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg"
			 :extra="item.Auid" note="Tips" @tap="details(item._id)">
				{{ item.desc | ellipsis(50) }}
			</uni-card>
		</view>
		<button v-if="total>contentList.length" type="primary" plain="true" @tap="getMore">点击获取更多</button>
		<view class="box-tp" />
		<text style="color: #8f8f94;font-size: 12px;margin:10px auto">这是我的底线~</text>
		<yangr-msg v-if="yangrMsgShow" :title="alertTitle" type="error" :info="alertInfo" btn="确定" @yangrMsgEvent="closeYangrMsg"></yangr-msg>
	</view>
</template>

<script>
	import {
		getLogIn,
		getAllList
	} from '../../api/api.js'
	import yangrMsg from "@/components/yangr-msg/yangr-msg.vue"
	import {
		topBar
	} from "@/pages/topBar/topBar.vue"
	import uniCard from '@/components/uni-card/uni-card.vue'

	export default {
		components: {
			yangrMsg,
			topBar,
			uniCard
		},
		data() {
			return {
				page: 1,
				total: 0,
				alertTitle: '发生错误',
				alertInfo: '登陆失败！',
				yangrMsgShow: false,
				title: '热门话题',
				secondTitle: '精选推荐',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				bannerList: [{
					bg: require('../../static/image/ad1.jpg')
				}, {
					bg: require('../../static/image/ad2.jpg')
				}, {
					bg: require('../../static/image/ad3.jpg')
				}],
				imgList: [{
					bg: require('../../static/image/nav1.jpg'),
					text: '不一样的清新BGM'
				}, {
					bg: require('../../static/image/nav2.jpg'),
					text: '【纯音乐】萦绕的忧伤'
				}, {
					bg: require('../../static/image/nav3.jpg'),
					text: '加油，武汉！'
				}],
				contentList: []
			}
		},
		filters: {
			ellipsis(value, num) {
				if (!value || !num) return "";
				if (value.length >= num) {
					return value.slice(0, num) + "...";
				}
				return value;
			}
		},
		created() {
			this.getAllList()
		},
		methods: {
			closeYangrMsg() {
				this.yangrMsgShow = false;
			},
			details(index) {
				console.log(index)
			},
			getAllList() {
				getAllList({page: this.page}).then(res => {
					if (res.data.status === 'success') {
						this.total = res.data.total
						this.contentList.push(...res.data.data)
					} else {
						this.yangrMsgShow = true
					}
				}).catch(err => {
					console.log(err)
					this.yangrMsgShow = true
				})
			},
			getLogIn() {
				let params = {
					userName: 'admin',
					passWord: '123456'
				};
				getLogIn(params).then(res => {
					if (res.data.status === 'success') {
						console.log(res)
					} else {
						this.yangrMsgShow = true
					}
				}).catch(err => {
					console.log(err)
					this.yangrMsgShow = true
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			scroll(e) {
				console.log(e)
			},
			getMore() {
				this.page++
				this.getAllList()
			}
		}
	}
</script>

<style>
	.main-content {
		width: 95%;
		padding: 2%;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.nav-style {
		width: 100%;
		height: 100px;

	}

	.title {
		margin-top: 20px;
		font-size: 36rpx;
		color: #000000;
		font-weight: 800;
	}

	.second-title {
		margin-top: 10px;
		font-size: 36rpx;
		color: #8f8f94;
		margin-left: 10px
	}

	.page-section-spacing .swiper {
		display: block;
	}

	.box-tp {
		margin-top: 20px;
		border: 1px solid #F0F8FF;
		width: 100%;
		height: 0px;
	}

	.bookshelf-content {
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		height: 280upx;
		padding-top: 20upx;
		margin: 0 auto;
	}
</style>

<template>
	<view>
		<view class="person-header">
			<image class="coverImg-style" :src="url"></image>
		</view>
		<view class="detail-content">
			<view class="detail-title">{{ detailObject.title }}</view>
			<view class="detail-user">作者：{{ detailObject.Auid }}</view>
			<view class="detail-content">{{ detailObject.desc }}</view>
			<input class="uni-input" v-if="user._id" focus @confirm="commitComment" v-model="commentValue" placeholder="回复Ta" />
			<text v-if="!user._id" style="color: #C0C0C0;">登录后方可评论~</text>
			<view class="divider" />
			<view class="comment-list" v-for="(item, index) in commentList" :key="index">
				{{ item.auid }} : {{ item.comment }}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		detailsArticle,
		getComment,
		comment
	} from '../../api/api.js'

	export default {
		data() {
			return {
				url: null,
				detailObject: {},
				commentList: [],
				articleId: null,
				commentValue: ''
			}
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		onLoad(options) {
			this.articleId = options.id
			this.detailsArticle()
			this.getComment()
		},
		methods: {
			getComment() {
				getComment({
					articleId: this.articleId 
				}).then(res => {
					if (res.data.status === 'success') {
						this.commentList = res.data.data
					}
				}), err => {
				}
			},
			commitComment(value) {
				let params = {
					articleId: this.articleId,
					auid: this.user.userName
				}
				comment(params).then(res => {
					if (res.data.status === 'success') {
						this.commentValue = ''
						// this.commentList.push(res.data.data.detail.value)
						this.getComment()
						uni.showToast({
							icon: 'none',
							title: '评论成功'
						});
					}
				}), err => {
				}
			},
			detailsArticle() {
				detailsArticle({
					id: this.articleId 
				}).then(res => {
					if (res.data.status === 'success') {
						this.detailObject = res.data.data
						this.url = 'http://' + res.data.data.cover
					}
				}), err => {}
			},
		}
	}
</script>

<style lang="scss">
	.coverImg-style {
		width: 100%;
		height: 200px;
		filter: blur(8px);
	}

	.detail-content {
		width: 90%;
		border-radius: 25px;
		min-height: 100px;
		background-color: white;
		text-align: center;
		padding: 5%;

		.detail-title {
			font-size: 20px;
			font-weight: 500;
		}

		.detail-user {
			margin-top: 10px;
			display: block;
			font-size: 13px;
		}

		.detail-content {
			margin-top: 20px;
			display: block;
			font-size: 15px;
		}

		.divider {
			margin-top: 20px;
			border: 1px solid #E8E8E8;
			width: 100%;
			height: 0px;
		}

		
		.uni-input {
			width: 100%;
			border: 1px solid #C0C0C0;
			border-radius: 15px;
		}

		.comment-list {
			margin-top: 10px;
			text-align: left;
			color: #808080;
		}
	}
</style>

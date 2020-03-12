<template>
	<view>
		<view class="person-header">
			<image class="headImg-style" :src="user.headImg ? 'http://'+user.headImg : '../../static/image/none.jpg'"></image>
			<text style="font-size: 18px;margin-top:10px;font-weight: 500;">{{ user.userName }}</text>
		</view>
		<view class="person-content">
			<view :class="{'person-info': display,'my-article': !display}" @tap="infoShow">主页</view>
			<view :class="{'person-info': !display,'my-article': display}" @tap="infoShow" style="margin-left: 10px;">信息</view>
			<view :class="{'my-article-display': !contentShow}" style="padding: 5%;">
				<view style="text-align: left;">
					<form>
						<view class="uni-form-item uni-column">
							<uni-icons type="contact-filled" size="30" color="green"></uni-icons>
							<text class="form-title">用户名：</text>
							<text v-show="!edit">{{ form.userName }}</text>
							<input class="uni-input" v-if="edit" focus v-model="editForm.userName" />
						</view>
						<view class="uni-form-item uni-column">
							<uni-icons type="paperclip" size="30" color="black"></uni-icons>
							<text class="form-title">签名: </text>
							<text v-show="!edit">{{ form.sign }}</text>
							<input class="uni-input" v-if="edit" focus v-model="editForm.sign" />
						</view>
						<view class="uni-form-item uni-column">
							<uni-icons type="person" size="30" color="black"></uni-icons>
							<text class="form-title">性别: </text>
							<text v-show="!edit">{{ form.sex }}</text>
							<input class="uni-input" v-if="edit" focus v-model="editForm.sex" />
						</view>
						<view class="uni-form-item uni-column">
							<uni-icons type="map-pin" size="30" color="black"></uni-icons>
							<text class="form-title">生日: </text>
							<text v-show="!edit">{{ form.birth }}</text>
							<input class="uni-input" v-if="edit" focus v-model="editForm.birth" />
						</view>
						<view class="uni-form-item uni-column">
							<uni-icons type="location-filled" size="30" color="red"></uni-icons>
							<text class="form-title">地区: </text>
							<text v-show="!edit">{{ form.place }}</text>
							<input class="uni-input" v-if="edit" focus v-model="editForm.place" />
						</view>
						<view class="uni-form-item uni-column">
							<uni-icons type="compose" size="30" color="green"></uni-icons>
							<text class="form-title">我参与的话题: </text>
							<view class="my-topic">
								<text v-for="item in topicList">#{{ item }}#</text>
							</view>
						</view>
						<button type="default" v-if="auid===userId && !edit" @tap="editBtn">编辑</button>
						<button type="default" v-if="edit" @tap="submit">确认修改</button>
					</form>
				</view>
			</view>
			<view :class="{'my-article-display': contentShow}">
				<view v-if="myList.length === 0" style="margin-top: 20px;color: #8F8F94;">还没有发布信息哦~</view>
				<view v-for="item in myList" class="main-content">
					<uni-card :title="item.title" mode="style" :is-shadow="true" :thumbnail="item.cover ? 'http://'+item.cover : 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'"
					 :extra="item.Auid" note="Tips" @tap="details(item._id)">
						{{ item.desc | ellipsis(50) }}
					</uni-card>
				</view>
				<button v-if="totalNum>myList.length" type="primary" plain="true" @tap="getMore" style="width:40%">点击获取更多</button>
				<text v-if="myList.length>=totalNum">没有更多了~</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findUser,
		getAuList
	} from '../../api/api.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"

	export default {
		components: {
			uniCard,
			uniSegmentedControl,
			uniIcons
		},
		data() {
			return {
				topicList: [],
				edit: false,
				user: {},
				page: 1,
				myList: [],
				totalNum: 0,
				display: true, //显示主页还是信息页，true为主页，false为信息页
				contentShow: true,
				auid: null,
				form: {
					userId: undefined,
					userName: null,
					sign: '签名是一种态度，我想我可以更酷',
					sex: '男',
					birth: '1998-12-21',
					place: '四川省成都市'
				},
				editForm: {
					userName: null,
					sign: null,
					sex: null,
					birth: null,
					place: null
				}
			}
		},
		onLoad(options) {
			this.findUser(options.id)
			this.auid = options.id
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
		computed: {
			userId() {
				return this.$store.state.user._id
			}
		},
		methods: {
			submit() {
				this.form.userId = this.userId
				// var formdata=new window.FormData()
				// let infoFormList = []
				// for (let prop in this.form) {
				// 	infoFormList.push({
				// 		key: prop,
				// 		value: this.form[prop]
				// 	})
				// }
				// infoFormList = [{
				// 	key: 'file',
				// 	value: this.uploadFile
				// }, ...infoFormList]
				// infoFormList.forEach(el => {
				// 	formData.append(item.key, item.value)
				// })
				console.log(formData)
			},
			editBtn() {
				this.edit = true
				this.editForm = Object.assign({}, this.editForm, this.form)
			},
			infoShow() {
				this.display = !this.display
				this.contentShow = !this.contentShow
			},
			details() {},
			findUser(id) {
				findUser({
					id: id
				}).then(res => {
					if (res.data.status === 'success') {
						this.user = res.data.data
						this.form.userName = res.data.data.userName
						this.getList()
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getList() {
				getAuList({
					userName: this.user.userName,
					page: this.page
				}).then(res => {
					if (res.data.status === 'success') {
						this.myList.push(...res.data.data)
						this.totalNum = res.data.total
						this.topicList = res.data.data.map(el => el.region).slice(0, 2)
					}
				}), err => {}
			},
			getMore() {
				this.page++
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	.uni-icons {
		margin-right: 10px
	}

	.person-header {
		display: flex;
		width: 100%;
		height: 200px;
		background-size: 100% 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url('../../static/image/nav2.jpg');

		.headImg-style {
			width: 75px;
			height: 75px;
			border-radius: 35px;
		}
	}

	.person-content {
		width: 100%;
		border-radius: 25px;
		min-height: 100px;
		position: relative;
		background-color: white;
		top: -30px;
		text-align: center;

		.uni-column {
			margin-top: 5px;
			padding: 10px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #E8E8E8;

			.form-title {
				min-width: 100px;
			}

			text {
				margin-left: 10px;
			}

			.my-topic {
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
			}

			.uni-input {
				width: 80%;
				border: 1px solid #C0C0C0;
				border-radius: 5px;
			}
		}

		.person-info {
			border-bottom: 2px solid #DD524D;
			color: #DD524D;
			width: 40%;
			height: 50px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		.person-info-display {
			display: inline-flex
		}

		.my-article {
			border-bottom: 2px solid #999999;
			color: #999999;
			width: 40%;
			height: 50px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		.my-article-display {
			display: none;

			.content-title {
				font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
				color: #666;
			}

			.main-content {
				width: 95%;
				padding: 2%;
			}
		}

	}
</style>

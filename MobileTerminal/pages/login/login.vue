<template>
	<view class="login-box">
		<text>登录</text>
		<view class="login-inside-box">
			<form>
				<view class="uni-form-item uni-column">
					<input class="input-style" name="input" v-model="loginForm.userName" placeholder="请输入账号" />
				</view>
				<view class="uni-form-item uni-column">
					<input class="input-style" name="password" password="true" v-model="loginForm.passWord" placeholder="请输入密码" />
				</view>
				<view class="uni-btn-v">
					<button class="login-btn" form-type="submit" @tap="commitLogForm()">登录</button>
				</view>
				<view style="margin-top: 100px;">
					<text style="color:blue">点此注册</text>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		loginUser
	} from '../../api/api.js'

	export default {
		data() {
			return {
				loginForm: {
					userName: null,
					passWord: null
				}
			}
		},
		mounted() {},
		methods: {
			commitLogForm() {
				if (this.loginForm.userName && this.loginForm.passWord) {
					let params = {
						userName: this.loginForm.userName,
						passWord: this.loginForm.passWord
					};
					this.$store.dispatch('Login', params).then((res) => {
							if (res.data.status === 'success') {
								uni.showToast({
									icon: 'none',
									title: '登录成功'
								});
								uni.navigateBack({
									delta: 1
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '账号或密码错误'
								});
							}
						})
						.catch((error) => {})
				} else {}
			}
		}
	}
</script>

<style lang="scss">
	.login-box {
		margin: 10%;
		width: 80%;
		height: 400px;
		text-align: center;

		.login-inside-box {
			width: 100%;
			height: 360px;
			margin-top: 40px;

			.input-style {
				margin-top: 20px;
				box-shadow: 2px;
				width: 100%;
				background-color: #E8E8E8;
				height: 40px;
				border-radius: 25px;
			}

			.login-btn {
				margin-top: 30px;
				background-color: #444444;
				color: #ffd04b;
			}
		}
	}
</style>

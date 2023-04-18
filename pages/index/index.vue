<template>
	<view class="container">
		<div style="width: 100%; max-width: 640rpx;">
			<div class="myapp-login-logo-text">
				<div class="myapp-login-logo-text">
					思维之翼<span v-if="logInOrSignUp"> Login</span> <span v-if="!logInOrSignUp"> Sign Up</span> <i
						class="cu-icon-skyatlas"></i>
				</div>
			</div>
			<div v-if="logInOrSignUp" class="login-font">
				<i>Log In </i> or <span @click="logInOrSignUp=!logInOrSignUp"> Sign Up</span>
			</div>
			<div v-else class="login-font">
				<span @click="logInOrSignUp=!logInOrSignUp"> Log Up</span> or <i>Sign Up </i>
			</div>
			<div class="login-am-center">
				<form v-if="logInOrSignUp" class="cu-form">
					<fieldset>
						<div class="cu-form-group">
							<input type="text" v-model="loginName" placeholder="输入手机号/用户名/邮箱">
						</div>
						<div class="cu-form-group">
							<input type="password" v-model="loginPassword" placeholder="输入登录密码">
						</div>
						<p><button type="button" @click="login" class="cu-btn-culcon bg-green">登录</button></p>

					</fieldset>
				</form>
				<form v-else class="cu-form">
					<fieldset>
						<div class="cu-form-group">
							<input type="text" v-model="username" placeholder="输入用户名">
						</div>
						<div class="cu-form-group">
							<input type="text" v-model="nickname" placeholder="输入昵称">
						</div>
						<div class="cu-form-group">
							<input type="text" v-model="userPhone" placeholder="输入手机号">
						</div>
						<div class="cu-form-group">
							<input type="password" v-model="password1" placeholder="设置个密码吧">
						</div>
						<div class="cu-form-group">
							<input type="password" v-model="password2" placeholder="再次输入密码吧">
						</div>
						<div class="cu-form-group">
							<input type="email" v-model="email" placeholder="输入邮箱">
						</div>
						<p><button type="button" @click="signup" class="cu-btn-culcon bg-green">注册</button></p>
					</fieldset>
				</form>
			</div>
		</div>
	</view>
</template>

<!-- <script src = "../static/assets/js/utils/jsencrypt.js" type="text/javascript"></script> -->
<script>
	/**
	 * 获取字符串的哈希值
	 * @param {String} str
	 * @return {string} hashCode
	 */
	function getHashCode(str) {

		// 1315423911=b'1001110011001111100011010100111'
		var hash = 1315423911,
			i, ch;
		for (i = str.length - 1; i >= 0; i--) {
			ch = str.charCodeAt(i);
			hash ^= ((hash << 5) + ch + (hash >> 2));
		}
		return (hash & 0x7FFFFFFF).toString();
	}


	import {
		JSEncrypt
	} from '../../static/js/utils/jsencrypt.js'
	// import axios from 'axios'
	// import show from '../../components/show'
	import show from '../../static/js/show/show.js'
	// import { JSEncrypt } from "../../static/assets/js/utils/jsencrypt.js" 
	// import encrypt from 'https://cdn.bootcdn.net/ajax/libs/jsencrypt/2.1.0/jsencrypt.min.js'
	const user_url =  getApp().globalData.url +  "/service-user/login"
	const api_url = getApp().globalData.url +  "/service-user/api"
	// var encrypt = new JSEncrypt();
	export default {
		data() {
			let _this = this
			return {
				username: '',
				password1: '',
				password2: '',
				userPhone: '',
				nickname: '',
				email: '',
				pubKey: '',
				loginName: '',
				loginPassword: '',
				logInOrSignUp: true
			}
		},
		methods: {
			async onLoad() {
				// let url = api_url + "/getUser";
				// let token = uni.getStorageSync('token')
				// console.log(token)

				let token = await this.updateToken()
				console.log(token)

				if(token){
					uni.setStorageSync('token',token)
					//跳转
					uni.redirectTo({
						url:"../timetable/month/month"
					})
				}else{
					this.loginName = uni.getStorageSync('loginName');
					this.loginPassword  = uni.getStorageSync('loginPassword');	
				}
			},

			async getPubKey(loginName) {

				let _this = this
				return new Promise((resolve, reject) => {
					console.log("准备发送获取公钥 " + loginName)
					//先发送手机号，获取公钥
					let url = user_url + "/getPubKey";
					var data = {
						"loginName": loginName
					}
					uni.request({
						url: url,
						data: data,
						method: "POST",
						success(e) {
							let res = e.data
							console.log(res)
							if (res.code != 1) {
								console.log("获取公钥失败！");
								show.showError("系统错误！")
								reject(res)
							}
							resolve(res.data)
						},
						fail(e) {
							show.showError("系统错误！")
							reject(e)
						}
					})
				})
			},

			async signup() {
				console.log("开始注册")
				console.log(this)
				var _this = this
				if (this.password1 != this.password2) {
					show.showError("两次密码不一致");
					return
				}
				var password = this.password1
				var loginName = this.userPhone

				var pubKey = await this.getPubKey(loginName)

				if (typeof(pubKey) != 'string') {
					console.log("获取公钥失败！")
					return
				}


				console.log("公钥:")
				console.log(pubKey)
				var encrypt = new JSEncrypt();
				//设置公钥
				encrypt.setPublicKey(pubKey)

				console.log("初始密码:")
				console.log(password)

				var hashPassword = getHashCode(password)
				console.log("前端hash加密的密码为 " + hashPassword)

				var encodeData = encrypt.encrypt(hashPassword)
				console.log("加密后的: " + encodeData)

				//使用公钥加密密码
				console.log("使用公钥加密的密码为 " + encodeData)
				var data = {
					"username": _this.username,
					"userPhone": _this.userPhone,
					"password": encodeData,
					"nickname": _this.nickname,
					"email": _this.email
				}

				console.log("准备发送注册数据 ")
				console.log(data)
				let url = user_url + "/signup"

				uni.request({
					url: url,
					data: data,
					method: "POST",
					success(e) {
						let res = e.data
						console.log("注册返回结果为")
						console.log(res)
						if (res.code != 1) {
							console.log("注册失败！")
							show.showError("注册失败");
							return
						}
						if (res.data) {
							show.showSuccess("注册成功");
							this.logInOrSignUp = !this.logInOrSignUp;
						}
					},
					fail(e) {
						console.log(e)
						show.showError("已经存在该用户！")
					}
				})
			},
			async login() {
				var _this = this
				if (this.loginName == "") {
					show.showException("请输入手机号");
					return false;
				} else if (this.loginPassword == "") {
					show.showException("请输入密码");
					return false;
				}
				//缓存上一次的登录账号
				uni.setStorageSync('loginName', this.loginName)
				uni.setStorageSync('loginPassword', this.loginPassword)
				
				var loginName = this.loginName;
				var password = this.loginPassword;
				console.log("登录开始 ")

				console.log("公钥:")
				let pubKey = await this.getPubKey(loginName)
				if (typeof(pubKey) != 'string') {
					console.log("获取公钥失败！")
					show.showError("获取公钥失败！")
					return
				}
				console.log(pubKey)
				var encrypt = new JSEncrypt();
				//设置公钥
				encrypt.setPublicKey(pubKey)

				console.log("初始密码:")
				console.log(password)

				var hashPassword = getHashCode(password)
				console.log("前端hash加密的密码为 " + hashPassword)

				var encodeData = encrypt.encrypt(hashPassword)
				console.log("加密后的: " + encodeData)

				let url = user_url + "/login" //访问路径
				let data = {
					"loginName": loginName,
					"password": encodeURI(encodeData).replace(/\+/g, '%2B')
				}
				console.log("加密后的Data: " + data.password)
				uni.request({
					url: url,
					data: data,
					method: "POST",
					success(e) {
						console.log(e)
						let res = e.data
						if (res.code != 1) {
							console.log("登录失败!")
							show.showError("登录失败!");
							return
						}
						show.showSuccess("登录成功!")
						
						//设置token
						uni.setStorageSync('token', res.data)

						//跳转
						uni.redirectTo({
							url: "../timetable/month/month"
						})
					},
					fail(e) {
						console.log(e)
						show.showError("登录失败!");
					}
				})
				// axios.post(url, data).then((e) => {
				// 	console.log(e)
				// 	let res = e.data
				// 	if (res.code != 1) {
				// 		console.log("登录失败!")
				// 		show.showError("登录失败!");
				// 		return
				// 	}
				// 	show.showSuccess("登录成功!")
				// 	//跳转

				// }).catch(function(error) {
				// 	console.log(error)
				// 	show.showError("登录失败!");
				// });
			},
		}
	}
</script>

<style>
	@import "app.css";
</style>

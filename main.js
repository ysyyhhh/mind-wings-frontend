// #ifndef VUE3
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'
import cuCustom from 'colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef APP
	let main = plus.android.runtimeMainActivity();
	//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
	plus.runtime.quit = function() {
	    main.moveTaskToBack(false);
	};
	//重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast 
	plus.nativeUI.toast = (function(str) {
	    if (str =='再次返回退出应用') {
	        plus.runtime.quit();
	    } else {
	        uni.showToast({
	            title: '再次返回退出应用',
	            icon: 'none'
	        })
	    }
	});
	

// #endif


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif


const api_url = getApp().globalData.url + "/service-user/api"


Vue.prototype.getUser = function() {
	let _this = this
	return new Promise((resolve, reject) => {
		var token = uni.getStorageSync('token')

		if (token.EMPTY) {
			resolve(null)
		}

		console.log("准备发送获取用户 " + token)
		//先发送手机号，获取公钥
		let url = api_url + "/getUser";
		uni.request({
			url: url,
			method: "GET",
			header: {
				"token": token
			},
			success: function(e) {
				console.log(e)
				let res = e.data
				console.log(res)

				if (res.code != 1) {
					console.log("获取用户失败！");
					resolve(false)
				}

				resolve(res.data)
			},
			fail: function(e) {
				console.log(e)
				show.showError("系统错误！")
				resolve(false)
				// reject(null)
			},
			complete: function(e) {
				console.log(e)
			}
		})
	})
}

Vue.prototype.updateToken = function() {
	let _this = this
	return new Promise((resolve, reject) => {
		var token = uni.getStorageSync('token')

		if (token.EMPTY) {
			resolve(null)
		}

		// console.log("准备发送获取用户 " + token)
		//先发送手机号，获取公钥
		let url = api_url + "/updateToken";
		uni.request({
			url: url,
			method: "GET",
			header: {
				"token": token
			},
			success: function(e) {
				// console.log(e)
				let res = e.data
				// console.log(res)

				if (res.code != 1) {
					console.log("获取用户失败！");
					resolve(false)
				}

				resolve(res.data)
			},
			fail: function(e) {
				console.log(e)
				show.showError("系统错误！")
				resolve(false)
				// reject(null)
			},
			complete: function(e) {
				// console.log(e)
			}
		})
	})
}

function N(now,n)
{
	var date=new Date(now.getTime()-n*24*3600*1000);
	var year=date.getFullYear();
	var month=date.getMonth()+1>9?date.getMonth()+1:"0"+(date.getMonth()+1);
	var day=date.getDate()>9?date.getDate():"0"+date.getDate();
	var date=year+"-"+month+"-"+day;
	return date;
}
Vue.prototype.changeTask = function(e) {
	let _this = this
	e.isFinish = e.is_finish
	e.user_phone = e.user_phone
	e.isPeriod = e.is_period
	e.taskId = e.task_id
	e.time = e.time.substr(0,5)
	if(e['alarm'] == undefined){
		e.alarm = ""
	}else{
		e.alarm = e.alarm.substr(0,5)
	}
	if(e.isPeriod){
		e['firstDay'] =  N(new Date(e.date),e.period.gapDay)
	}
}
Vue.prototype.changeTaskList = function(list) {
	let _this = this
	for(let i = 0;i < list.length;i++){
		this.changeTask(list[i])
	}
	list.sort(function(a, b) {
		if(a.isFinish != b.isFinish){
			return Number(a.isFinish) - Number(b.isFinish)
		}
		let atime = new Date(a.date).getTime()
		let btime = new Date(b.date).getTime()
		if(atime != btime){
			return atime - btime
		}
		if(parseInt(a.time.substr(0, 2)) != parseInt(b.time.substr(0, 2))){
			return parseInt(a.time.substr(0, 2)) - parseInt(b.time.substr(0, 2))
		}
		return parseInt(a.time.substr(2, 2)) - parseInt(b.time.substr(2, 2))
		// console.log("compare")
		// console.log(a.begTime.substr(0, 2))
		// let inta = parseInt(a.begTime.substr(0, 2))
		// console.log(inta)
		// return parseInt(a.begTime.substr(0, 2)) - parseInt(b.begTime.substr(0, 2))
	})
	
}

Vue.prototype.clone = function(e) {
return JSON.parse(JSON.stringify(e));
}
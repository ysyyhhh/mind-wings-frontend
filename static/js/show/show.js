export default {
	showSuccess: function(str, time = 2000) { //changeData是函数名
		uni.showToast({
			title: str,
			icon: 'success', //将值设置为 success 或者 ''
			duration: time //持续时间为 2秒
		})
	},
	showFail: function(str, time = 2000) { //changeData是函数名
		uni.showToast({
			title: str,
			icon: 'fail', //将值设置为 success 或者 ''
			duration: time //持续时间为 2秒
		})
	},
	showError: function(str, time = 2000) { //changeData是函数名
		uni.showToast({
			title: str,
			icon: 'error', //将值设置为 success 或者 ''
			duration: time //持续时间为 2秒
		})
	},
	showException: function(str, time = 2000) { //changeData是函数名
		uni.showToast({
			title: str,
			icon: 'exception', //将值设置为 success 或者 ''
			duration: time //持续时间为 2秒
		})
	}
}

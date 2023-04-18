<script>
	export default {
		methods:{
			showSuccess(time=2000,str){//changeData是函数名
				uni.showToast({
					title: str,
					icon: 'success',    //将值设置为 success 或者 ''
					duration: time    //持续时间为 2秒
				})
			},
			showFail(time=2000,str){//changeData是函数名
				uni.showToast({
					title: str,
					icon: 'fail',    //将值设置为 success 或者 ''
					duration: time    //持续时间为 2秒
				})  
			},
			showError(time=2000,str){//changeData是函数名
				uni.showToast({
					title: str,
					icon: 'error',    //将值设置为 success 或者 ''
					duration: time    //持续时间为 2秒
				})
			},
			showException(time=2000,str){//changeData是函数名
				uni.showToast({
					title: str,
					icon: 'exception',    //将值设置为 success 或者 ''
					duration: time    //持续时间为 2秒
				})  
			}
		}
	}
</script>

<style>

</style>

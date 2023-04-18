<script>
	export default {
		 globalData: {  
		    url: 'http://42.192.226.66:8700'  
			
			   // url: 'http://localhost:8700',
			
		  },
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			// 保存 app 版本信息
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo)=> {
			    // console.log('widgetInfo', widgetInfo);
			    this.version = widgetInfo.version;
				console.log(this.version)
			});
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		
	}
	
</script>

<style lang="scss">
	
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import '@/uni_modules/uni-scss/index.scss';
	
	uni-page-body,#app{
		height: 100%;
	}
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
		height: 100%;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>

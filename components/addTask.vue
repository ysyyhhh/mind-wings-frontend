<template>
	<view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''" style="z-index: 999; "  @touchmove.stop.prevent = "doNothing"
		@click.stop.prevent="doNothing" @click="hideTaskModal">
			<!-- <view class="cu-modal" :class="'show'"  @click="test"> -->

			<!-- <view class="padding-xl"> -->
			<view class="card bg-white padding" style="position: absolute; top:35%; left: 5%;" @click.stop.prevent="doNothing">
				<view style="display: flex;flex-direction: row;">
					<view class="card-title" style="background-color: #E63935;" @click="changeType">
						{{item.type}}
					</view>
					<view class="action" >
						<!-- <text style="color:#000000">123</text> -->
						<uni-icons type="closeempty" color="#E63935" size="25" @click="hideTaskModal"></uni-icons>
					</view>
				</view>

				<view class="card-allTask">
					<view class="card-task" style="background-color: #E96A67;">
						<view class="card-task-time ">
							<view class="card-task-timeLeft flex" v-if="item.type != '待办事项'">

								<view class="flex" style="width: 60%;">
									<!-- <view v-if="item.type!='待办事项'"> -->


									<view class="date">
										<view v-if="item.isPeriod" @click="item.isPeriod=false">日期</view>
										<view v-else style="color:#FAA700">

											<uni-datetime-picker type="date" v-model="item.date">{{item.date}}
											</uni-datetime-picker>

									

										</view>



									</view>
									{{' '}} / {{' '}}
									<view :style="{color:item.isPeriod?'#FAA700':''}" class="period"
										@click="item.isPeriod=true">
										重复
									</view>
									
									
									<!-- </view> -->

								</view>


								<view class="flex" style="width: auto;">

									<view class="uni-list-cell-db" style="">
										<view v-if="item.type=='全天'" @click="item.type='deadline'">
											时间
										</view>

										<view v-if="item.type!='全天'" style="color:#FAA700">
											<picker mode="time" :value="item.time" start="00:00" end="23:59"
												@change="bindTimeChange">
												<view class="uni-input">{{item.time}}</view>
											</picker>
										</view>

									</view>

									{{' '}} / {{' '}}
									<view :style="{color:item.type=='全天'?'#FAA700':''}" class="period"
										@click="item.type='全天'">
										全天
									</view>
								</view>
							</view>
							<view v-else class="card-task-timeLeft flex">

							</view>
							<view class="task-alarm text-xxl"
							:class="[item.alarm != ''?'flex':'']"
							>
								<view class="cuIcon-remind" 
							     @click="changeAlarm"
								 >
								
								</view>
								
								
								<!-- <view v-if="item.alarm != ''" style="font-size: initial;"> -->
									<picker mode="time" :value="item.alarm" start="00:00" end="23:59"
										@change="bindAlarmChange">
										<view class="uni-input" style="font-size: 30rpx;">{{item.alarm}}</view>
									</picker>
									
									
									
								<!-- </view> -->
							</view>
						</view>


						<view class="card-mid">

							<view class="line">
							</view>

						</view>
						<view class="card-task-content">
							<view class="flex" style="width: 100%;">
								<view class="text-left text-lg" style="width: 90%;">
									<uni-easyinput v-model="item.content" :focus="focus" :styles="mainStyle" 
									:placeholderStyle="placeholderStyle" placeholder="请输入内容" 
									:clearable=false :inputBorder="false"
									
									>
									
									</uni-easyinput>
								</view>
								<view style="position: relative;text-align: right; width: 10%; top:20rpx;" @click="addSubtask">
									<uni-icons type="plusempty" color="#ffffff" size="25"></uni-icons>
								</view>

							</view>
							<view class="card-task-subtask" v-for="(subItem,subIndex) in item.subtasks" :key="subIndex">
								<view class="flex margin-bottom-sm" style="height: 50rpx;">
									<view style="display: flex;
									align-items: center;justify-content: center;text-align: center;">
										-
									</view>
			<!-- 						<uni-easyinput 
									
									v-model="subItem.content" placeholder="请输入内容" @input="input">
									</uni-easyinput> -->
									<view class="" style="display: flex;
									align-items: center;justify-content: center;text-align: center;">
										
										<uni-easyinput v-model="subItem.content" :styles="inputStyle" :placeholderStyle="placeholderStyle"
										 placeholder="请输入内容" :clearable=false :inputBorder="false"></uni-easyinput>
										 
										 <view style="position: relative;text-align: right; width: 10%; top:8rpx;" @click="subSubtask(subIndex)">
										 	<uni-icons type="closeempty" color="#ffffff" size="25"></uni-icons>
										 </view>
									</view>
									
									
									
								</view>
							</view>
						</view>
					</view>
				</view>

				<view v-if="item.type!='待办事项'">


					<view class="card-allTask" v-if="item.isPeriod">
						<view class="card-task" style="background-color: #E96A67;">
							重复周期
							<view class="card-mid">
								<view class="line">
								</view>
							</view>
							<view class="text-left">

								<view class="flex padding">
									间隔天数：
									<uni-number-box v-model="item.period.gapDay"/>
								</view>
								<view class="example-body">
									<uni-datetime-picker v-model="item.period.range" type="daterange" rangeSeparator="至"
										@maskClick="maskClick" />
								</view>

							</view>
						</view>
					</view>
					

<!-- 					<view class="card-allTask" v-if="!item.isPeriod">
						<view class="card-task" style="background-color: #E96A67;">
							日期
							<view class="card-mid">
								<view class="line">
								</view>
							</view>
							<view class="text-left">
								<uni-datetime-picker type="date" :clearIcon="false" v-model="item.date"
									@maskClick="maskClick" />
							</view>
						</view>
					</view> -->
				</view>
				<view class="flex" v-if="isPublish">
					<view class="" style="width: 50%;" @click="taskEvent('delete')">
						
						<button class="mini-btn" type="warn" size="mini">删除</button>
					</view>
					<view class="" style="width: 50%;" @click="taskEvent('update')">
						
						<button class="mini-btn" type="primary" size="mini">保存</button>
					</view>
				</view>
				<view v-else style="width: 100%; display: flex ;text-align: center;align-items: center;justify-content: center;"
				@click="taskEvent('insert')"
				>
						<text class="cu-btn bg-cyan round shadow" style="width: 100%;"
						>保存</text>
				</view>
			</view>

		</view>

			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
	</view>

</template>

<script>
	import {
		formatDayTime,
		formatTime,
	} from '../pages/timetable/common.js';
	const task_url = getApp().globalData.url + "/service-timetable/task"
	var preType = '全天'
	export default {
		name: "addTask",
		data() {
			return {
				focus:false,
				msgType: 'success',
				messageText: '这是一条成功提示',
				isPublish:false,
				modalName: "",
				typeRange: ["待办事项", "deadline", "全天"],
				item: {
					type: "待办事项",
					date: '2021-5-3',
					time: "09:55",
					alarm: "",
					content: "",
					subtasks: [],
					isFinish: false,
					isPeriod: false,
					period: {
						gapDay: 7,
						range: ['2021-02-1', '2021-3-28'],
					},
				},
				mainStyle:{color: '#ffffff',borderColor: '#E96A67',fontSize:60},
				placeholderStyle: "color:#ffffff;font-size:30rpx",
				inputStyle:{color: '#ffffff',borderColor: '#E96A67'},
				status:0,
				nDate:"2022-03-29",
				nTime:"08:20"
				/*
				{
					type: "待办事项",
					date: "2022年03月28日",
					time: "09:55",
					alarm: "",
					content: "移动开发：安装苹果虚拟机和xcode",
					subtasks: [{
						content: "移动开发：安装苹果虚拟机和xcode",
					}],
					isFinish: true,
				},
				{
					type: "全天",
					date: "2022年03月28日",
					time: "09:55",
					alarm: "",
					content: "移动开发：安装苹果虚拟机和xcode",
					subtasks: [{
						content: "移动开发：安装苹果虚拟机和xcode",
					}],
					isFinish: true,
					isPeriod: true,
					period:{
						gapDay:7,
						range: ['2021-02-1', '2021-3-28'],
					}
				},
				{
					type:"全天",
					time: "2022年03月28日 周一 09:55",
					alarm: "07:00",
					content: "移动开发：安装苹果虚拟机和xcode",
					subtasks: [],
					isFinish: true,
				},
				*/
			};
		},
		methods: {
			show(){
				if(this.status == 1) return 

				console.log("show!!!")
				this.item  = {
					type: "待办事项",
					date: this.nDate,
					time: this.nTime,
					alarm: "",
					content: "",
					subtasks: [],
					isFinish: false,
					isPeriod: false,
					period: {
						gapDay: 7,
						range: [this.nDate, this.nDate],
					}
				}
			},
			messageToggle(type) {
				this.msgType = type
				this.messageText = `这是一条${type}消息提示`
				this.$refs.message.open()
			},
			taskEvent(e){
				// console.log(this.item)
				// console.log(e)
				// return 
				let url = task_url + '/'+e
				let token = uni.getStorageSync('token')
				let data = this.item
				console.log(data)
				var _this = this
				uni.request({
					url:url,
					method:"POST",
					data:data,
					header:{
						"token":token
					},
					success(res) {
						console.log(res.data)
						if(res.data.code==1){
							_this.messageToggle('success')
							_this.hideTaskModal()
						}else{
							_this.messageToggle('fail')
						}
					},
					fail(e){
						console.log(e)
					}
				})
			},

			addSubtask(){
				this.item.subtasks.push({
					content:'',
					isFinish:false
				})
			},
				
			subSubtask(e){
				console.log(e)
				this.item.subtasks.splice(e, 1);
				// this.item.subtasks.pop(e)
			},
			changeType(e) {
				if (this.item.type == '待办事项') {
					this.item.type = preType
				} else {
					preType = this.item.type
					this.item.type = "待办事项"
				}

			},
			bindTimeChange(e) {
				console.log(e.detail.value)
				this.item.time = e.detail.value
			},
			bindAlarmChange(e){
				console.log(e.detail.value)
				this.item.alarm = e.detail.value
			},
			maskClick(e) {
				console.log('----maskClick事件:', e);
			},
			showTaskModal(methodType,e) {
				this.nDate = formatDayTime(new Date())
				this.nTime = formatTime(new Date())
				this.status = methodType
				//create 0 , type
				//publish 1 , item
				console.log(methodType,e)
				if(methodType == 0){
					this.show()
					this.item.type = e
					preType = 'deadline'
					this.isPublish = false
					this.focus = true
				}else{
					if(e['alarm'] == undefined){
						e.alarm = ""
					}
					this.item = this.clone(e)
					this.isPublish = true
					preType = e.type
					if(preType == '待办事项'){
						preType = 'deadline'
					}
					console.log(this.item)
				}
				this.modalName = "Modal"
			},
			hideTaskModal(e) {
				this.modalName = null
				this.focus = false
				// this.$parent.allInit()
				this.$emit('allInit');
			},
			// test(e) {
			// 	console.log(e)
			// 	this.modalName = null
			// },
			changeAlarm(){
				console.log("alarm")
				// console.log(this.item)
				// console.log(this.item.alarm)
				if(this.item.alarm == "" || this.item['alarm'] == undefined){
					this.item.alarm = this.nTime
				}else{
					this.item.alarm = ""
				}
				// this.taskEvent('update')
			},
			doNothing(){}
		}
	}
</script>

<style>
	.todo-alarm {
		width: 20%;
		text-align: right;
	}

	.todo-icon {
		position: absolute;
		right: 30rpx;
	}

	.todo-content {
		width: 75%;
	}

	.todo {
		margin-bottom: 10rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: flex;
		flex-direction: row;
	}

	.card-task-timeLeft {
		width: 75%;
	}

	.task-alarm {
		position: relative;

		/* background-color: #007AFF; */
		width: 25%;
		text-align: right;
		right: 0rpx;
	}

	.card-task-subtask {
		margin-left: 30rpx;
		padding: 5rpx;
		display: flex;
		flex-direction: row;
	}

	.card-task-content {
		padding-bottom: 10rpx;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
	}

	.line {
		width: 100%;
		background-color: #FFFFFF;
		height: 2rpx;
	}

	.card-mid {
		height: 15rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-task-time {
		/* background-color: #000000; */
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.card-title {
		border-radius: 20rpx;
		position: relative;

		text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;

		top: -50rpx;
		width: 130rpx;
		height: 70rpx;
	}

	.card-allTask {
		/* position: relative; */
		/* top:-20rpx; */
		display: flex;
		flex-direction: column;
	}

	.card-task {
		/* margin-top: 18rpx; */
		margin-bottom: 36rpx;

		padding: 20rpx;


		box-shadow: 2rpx 3rpx 10rpx 5rpx #b5b5b5;


		border-radius: 20rpx;
		position: relative;
		width: 100%;
		/* height: 100rpx; */

	}

	.card {
		box-shadow: 2rpx 3rpx 20rpx 8rpx #b5b5b5;
		border-radius: 20rpx;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		color: #FFFFFF;
		background-color: #FFFFFF;

		/* position: relative; */
		display: inline-block;
		/* vertical-align: middle; */
		/* margin-left: auto; */
		/* margin-right: auto; */
		width: 680rpx;
		/* max-width: 100%; */
		/* background-color: #f8f8f8; */
		/* border-radius: 10upx; */
		/* overflow: hidden; */

		/* padding-xl radius shadow bg-blue ma */
	}

	.title {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: #FFFFFF;
		height: 100%;
		/* left: 30rpx; */
	}

	.page {
		padding: 30rpx;
		width: 100%;
		height: 100%;
		background-color: #ffffff;
	}

	.action {
		border-radius: 20rpx;
		position: relative;

		text-align: right;


		right: 1rpx;

		top: -10rpx;
		width: 75%;
		height: 10rpx;
	}
</style>

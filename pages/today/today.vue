<template>
	<view class="page" @touchstart="gestureStart" @touchend="gestureEnd" @click="dbclick">
		
		<view class="">
			<Fireworks v-if="showFireworks" @close="showFireworks = false" />
			<!-- <firework v-if="showFireworks" /> -->
		</view>
		<view class="title margin-top">
			<view @click="startFireworks" style="font-size: 40rpx;">
				今天是,{{' '}}{{todayWeek}}
				<uni-icons name="UniIcons" size="20" type="settings-filled" @click="toSetting"></uni-icons>
			</view>
			<view style="color:rgb(161,156,169); font-size: 35rpx;">
				{{today}}
			</view>
			
		</view>

		<view class="content">
			<view class="card bg-white padding">
				<view class="card-title" style="background-color: #E63935;">
					deadline
				</view>

				<view class="card-allTask" style="color: #000000;">
					<view v-for="(item,index) in deadlineList" :key="index">
						<view class="todo">
							<view class="todo-content" >
								<view class="" @click="publish(item)">
									<view v-if="item.time != ''" style="color: #E63935;">
										{{item.date}}  {{item.time}}
									</view>
									{{item.content==""?'无内容':item.content}}
								</view>
								<view @click="changeSubFinish(item,subIndex)" class="card-task-subtask"
									v-for="(subItem,subIndex) in item.subtasks" :key="subIndex">
									<view class="">
										- {{subItem.content==""?'无内容':subItem.content}}
									</view>
									<view style="margin-left: 20rpx;">
										<uni-icons v-if="!subItem.isFinish" type="circle" color="#E63935" size="23">
										</uni-icons>
										<uni-icons v-else type="checkbox" color="#E63935" size="23"></uni-icons>
									</view>
								</view>
							</view>
							<view v-if="item.alarm != '' " class="todo-alarm">
								<view class="cuIcon-remind">
									{{item.alarm}}
								</view>
							</view>
							<view class="todo-icon" @click="changeFinish(item)">
								<uni-icons v-if="!item.isFinish" type="circle" color="#E63935" size="25">
								</uni-icons>
								<uni-icons v-else type="checkbox" color="#E63935" size="25"></uni-icons>
							</view>

						</view>
					</view>
				</view>
			
			</view>
			<view class="card bg-white padding">
				<view class="card-title" style="background-color: #D81B60;">
					全天
				</view>

				<view class="card-allTask" style="color: #000000;">
					<view v-for="(item,index) in allDayList" :key="index">
						<view class="todo">
							<view class="todo-icon-left" @click="changeFinish(item)">
								<uni-icons v-if="!item.isFinish" type="circle" color="#FAA700" size="25">
								</uni-icons>
								<uni-icons v-else type="checkbox" color="#FAA700" size="25"></uni-icons>
							</view>
							
							<view class="todo-content">
								<view class="" @click="publish(item)">
									{{item.content==""?'无内容':item.content}}
								</view>
								<view @click="changeSubFinish(item,subIndex)" class="card-task-subtask"
									v-for="(subItem,subIndex) in item.subtasks" :key="subIndex">
									<view style="margin-left: -40rpx;">
										<uni-icons v-if="!subItem.isFinish" type="circle" color="#FAA700" size="23">
										</uni-icons>
										<uni-icons v-else type="checkbox" color="#FAA700" size="23"></uni-icons>
									</view>
									<view class="">
										{{subItem.content==""?'无内容':subItem.content}}
									</view>
								</view>
							</view>
							<view v-if="item.alarm != '' " class="todo-alarm">
								<view class="cuIcon-remind">
									{{item.alarm}}
								</view>
							</view>
							
				
						</view>
					</view>
				
				</view>
				
										
			</view>
			
			<view class="card bg-white padding">
				<view class="card-title" style="background-color: #FAA700;">
					待办事项
				</view>

				<view class="card-allTask" style="color: #000000;">
					<view v-for="(item,index) in todoList" :key="index">
						<view class="todo">
							<view class="todo-content" >
								<view class="" @click="publish(item)">
									{{item.content==""?'无内容':item.content}}
								</view>
								<view @click="changeSubFinish(item,subIndex)" class="card-task-subtask"
									v-for="(subItem,subIndex) in item.subtasks" :key="subIndex">
									<view class="">
										- {{subItem.content==""?'无内容':subItem.content}}
									</view>
									<view style="margin-left: 20rpx;">
										<uni-icons v-if="!subItem.isFinish" type="circle" color="#FAA700" size="23">
										</uni-icons>
										<uni-icons v-else type="checkbox" color="#FAA700" size="23"></uni-icons>
									</view>
								</view>
							</view>
							<view v-if="item.alarm != '' " class="todo-alarm">
								<view class="cuIcon-remind">
									{{item.alarm}}
								</view>
							</view>
							<view class="todo-icon" @click="changeFinish(item)">
								<uni-icons v-if="!item.isFinish" type="circle" color="#FAA700" size="25">
								</uni-icons>
								<uni-icons v-else type="checkbox" color="#FAA700" size="25"></uni-icons>
							</view>
				
						</view>
					</view>
				</view>
							
			</view>


		</view>



		<addTask name="addTask" ref="addTask"  v-on:allInit="allInit"></addTask>

			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>


	</view>
</template>

<script>
	import {
		formatDayTime,
		formatTimeS
	} from '../timetable/common.js';
	var gastureX = 0
	var gastureY = 0
	const weekStr = ["","一","二","三","四","五","六","日"]
	const day = new Date().getDay();
	const getDay = day === 0 ? 7 : day; // 今天的星期
	const task_url = getApp().globalData.url + "/service-timetable/task"
	import addTask from '../../components/addTask'
	import Fireworks from '../../components/Fireworks.vue'
	export default {
		components: {
			addTask,
			Fireworks,
		},
		data() {
			return {
				todayWeek: "星期" + weekStr[getDay],
				today:formatDayTime(new Date()) + " " + formatTimeS(new Date()),  
				timer:"",
				msgType: 'success',
				messageText: '这是一条成功提示',
				//仅展示使用
				deadlineList: [
					{
						time: "2022年03月31日 周四 10:45",
						content: "系统分析设计：实验",
						alarm: "",
						isFinish: false,
						subtasks: [{
							content: "预备实验",
							isFinish: true,
						}, {
							content: "实验1",
							isFinish: true,
						}, {
							content: "实验2",
							isFinish: false,
						}, ]
					}
				],
				allDayList: [{
						time: "每天",
						alarm: "19:00",
						content: "英语阅读两篇",
						subtasks: [],
						isFinish: false,
					}

				],
				todoList: [{
						time: "2022年03月31日 周四 10:45",
						content: "系统分析设计：实验",
						alarm: "",
						isFinish: false,
						subtasks: [{
							content: "预备实验",
							isFinish: true,
						}, {
							content: "实验1",
							isFinish: true,
						}, {
							content: "实验2",
							isFinish: false,
						}, ]
					}
				],
				touchNum: 0,
				dayCard: true,
				showFireworks: false
			}
		},
		methods: {
			startFireworks() {
			      this.showFireworks = true
				  console.log("start")
			    },
			messageToggle(type, msg) {
				this.msgType = type
				this.messageText = msg
				this.$refs.message.open()
			},
			publish(e){
				console.log(e)
				this.$refs.addTask.showTaskModal(1, e)
			},
			update(e,finish = false){
				let url = task_url + '/update'
				let token = uni.getStorageSync('token')
				let data = e
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
							if(finish){
								let mess = ['加油！！！🎇','离成功又进了一步！🎉','你最棒！！！👍','牛牛牛！🐂']
								
								let index = Math.floor(Math.random()*1000) % mess.length
								_this.messageToggle('success', mess[index])
							}else{
								_this.messageToggle('success', '修改成功')
							}
							_this.allInit()
						}else{
							_this.messageToggle('fail')
						}
					},
					fail(e){
						console.log(e)
					}
				})
			},
			changeFinish(e) {
				console.log(e)
				let bool = this.clone(e.isFinish)
				e.isFinish = !bool
				if(e.isFinish == true){
					this.startFireworks()
					// console.log("改变了！")
					// console.log(this.showFireworks)
					this.update(e,true)
				}else{
					this.update(e)
				}
				
			},
			changeSubFinish(e, index) {
				console.log(e)
				console.log(index)
				e.subtasks[index].isFinish = !e.subtasks[index].isFinish
				if(e.subtasks[index].isFinish == true){
					this.startFireworks()
					// console.log("改变了！")
					// console.log(this.showFireworks)
					this.update(e,true)
				}else{
					this.update(e)
				}
			},
			// initWait(){
			// 	let url = task_url + '/selectByDateAndType'
			// 	let token = uni.getStorageSync('token')
			// 	let data = {
			// 		"begDate":"1999-01-01",
			// 		"endDate":"9999-12-21",
			// 		"type":"待办事项",
			// 	}
			// 	// console.log(data)
			// 	var _this = this
			// 	uni.request({
			// 		url:url,
			// 		method:"POST",
			// 		data:data,
			// 		header:{
			// 			"token":token
			// 		},
			// 		success(res) {
			// 			// console.log(res.data)
			// 			if(res.data.code==1){
			// 				_this.todoList = res.data.data
			// 				_this.changeTaskList( _this.todoList )
			// 				// console.log(_this.todoList)
			// 			}
			// 		},
			// 		fail(e){
			// 			console.log(e)
			// 		}
			// 	})
			// },
			initList(e){
				let nDate = formatDayTime(new Date());
				// console.log(nDate)
				let url = task_url + '/selectByDateAndType'
				let token = uni.getStorageSync('token')
				let data = {
						"begDate":nDate,
						"endDate":nDate,
						"type":e,
					}
				if(e == '待办事项' || e == "deadline"){
					data['endDate'] = "9999-12-31"
					if(e == '待办事项'){
						data['begDate'] = "1999-01-01"
					}
				}
				
				console.log(e)
				console.log(data)
				let _this = this
				uni.request({
					url:url,
					method:"POST",
					data:data,
					header:{
						"token":token
					},
					success(res) {
						if(res.data.code==1){
							if (e == "全天") {
								_this.allDayList = res.data.data
								_this.changeTaskList(_this.allDayList)
								console.log(_this.allDayList)
								// console.log(_this.allDayList)
								// console.log(res.data)
							} else if (e == "deadline") {
								_this.deadlineList = res.data.data
								_this.changeTaskList(_this.deadlineList)
							} else {

								_this.todoList = res.data.data
								_this.changeTaskList(_this.todoList)
							}
						}
					},
					fail(e){
						console.log(e)
					}
				})
			},
			allInit(){
				console.log("init")
				// this.initWait()
				let typeList = ["待办事项","全天","deadline"]
				for(let i = 0;i < typeList.length;i++){
					this.initList(typeList[i])
				}
			},
			onShow(){
				console.log("show")
				var _this = this
				this.timer = setInterval( () => {
					// console.log("now")
				    // 同上	
					_this.today = formatDayTime(new Date()) + " " + formatTimeS(new Date())
					// console.log(new Date())
				}, 700)
				this.allInit()
			},
			onUnload() {
				if(this.timer) {  
					clearTimeout(this.timer);  
					this.timer = null;  
				}  
			},
			checkChange(e) {
				console.log("点击改变")
				console.log(e)
			},
			gestureStart(e) {
				// console.log("gestureStart")
				// console.log(e)
				gastureX = e.changedTouches[0].pageX
				gastureY = e.changedTouches[0].pageY
			},
			gestureEnd(e) {
				// console.log("gestureEnd")
				// console.log(e)
				var nx = e.changedTouches[0].pageX
				var ny = e.changedTouches[0].pageY

				var lr = 100
				if (Math.abs(nx - gastureX) > lr) {
					if (nx - gastureX > 0) {
						console.log("左滑")
					} else {
						console.log("右滑")
					}
				}
				var tb = 100
				var minTop = 600
				if (Math.abs(ny - gastureY) > tb) {
					if (ny - gastureY > 0) {
						if (gastureY < minTop) {
							console.log("上滑")
						}
					} else {
						uni.navigateBack({
							animationType: "slide-out-top"
						})
						console.log("下滑")
					}
				}
			},
			/// 双击
			dbclick(e) {
				this.touchNum++
				setTimeout(() => {
					if (this.touchNum == 1) {
						console.log('单击')
					}
					if (this.touchNum >= 2) {
						console.log('双击')
						this.$refs.addTask.showTaskModal(0, "全天")
					}
					this.touchNum = 0
				}, 250)
			}
		}
	}
</script>

<style>
	@import "today.css"
</style>

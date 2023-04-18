<template>
	
	<view class="page" @touchstart="gestureStart" @touchend="gestureEnd" @click="dbclick">
		
		<!-- <Fireworks v-if="displayFireworks" @close="displayFireworks = false"></Fireworks> -->
		
		<!-- <button @click="startFireworks">点击我触发烟花特效</button> -->
		<view class="">
			<Fireworks v-if="showFireworks" @close="showFireworks = false" />
			<!-- <firework v-if="showFireworks" /> -->
		</view>
		
		<view class="title margin-top">
			<view @click="startFireworks" style="font-size: 40rpx;">
				今天是,{{todayWeek}}
			</view>
			<view style="color:rgb(161,156,169); font-size: 35rpx;">
				{{today}}
			</view>
		</view>

		<view class="content">


			<view class="card bg-white padding">
				<view style="display: flex;flex-direction: row;">
				<view class="card-title" style="background-color: #E63935;">
					deadline
				</view>
					<view class="card-start-time" style="background-color: #E63935;">
						<uni-datetime-picker type="date" v-model="deadlineStartdate" @change="changeDeadlineStartdate">
							{{deadlineStartdate}}
						</uni-datetime-picker>
					</view>
				</view>
				<view class="card-allTask">
					<view v-for="(item,index) in deadlineList" :key="index">
						<view class="card-task" style="background-color: #E96A67;" @click="publish(item)">
							<view class="card-task-time">
								<view class="card-task-date">
									<view v-if="item.isPeriod">
										<view class="">
											每{{item.period.gapDay+1}}天
										</view>

										<view class="">
											{{item.period.range[0]}}到{{item.period.range[1]}}
										</view>
									</view>
									<view v-else>
										{{item.date}}
									</view>
								</view>
								<view class="card-task-timeMid">
									{{item.time}}
								</view>

								<view v-if="item.alarm != '' " class="task-alarm">
									<view class="cuIcon-remind">
										{{item.alarm}}
									</view>
								</view>
							</view>
							<view class="card-mid">

								<view class="line">
								</view>
								<view style="width: 20rpx;">

								</view>

								<view style="" @click.stop.prevent="doNothing" @click="changeFinish(item)">
									<uni-icons v-if="!item.isFinish" type="smallcircle-filled" color="white" size="30">
									</uni-icons>

									<uni-icons v-else type="checkbox-filled" color="white" size="30"></uni-icons>

								</view>

							</view>
							<view class="card-task-content">
								{{item.content}}

								<view class="card-task-subtask" v-for="(subItem,subIndex) in item.subtasks"
									:key="subIndex">
									<view class="">
										- {{subItem.content}}
									</view>
									<view style="margin-left: 20rpx;" @click.stop.prevent="doNothing"
										@click="changeSubFinish(item,subIndex)">
										<uni-icons v-if="!subItem.isFinish" type="smallcircle-filled" color="white"
											size="25">
										</uni-icons>
										<uni-icons v-else type="checkbox-filled" color="white" size="25"></uni-icons>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>


			<view class="card bg-white padding">
				<view style="display: flex;flex-direction: row;">
					<view class="card-title" style="background-color: #247BA0;">
						全天
					</view>
					
					<view class="card-start-time" style="background-color: #247BA0;">
						<uni-datetime-picker type="date" v-model="allDayStartdate" @change="changeAllDayStartdate">
							{{allDayStartdate}}
						</uni-datetime-picker>
					</view>
					
					
				</view>
				
				
				<view v-if="dayCard == false" class="card-allTask">
					<view v-for="(item,index) in allDayList" :key="index">
						<view class="card-task" style="background-color: #E74983;" @click="publish(item)">
							<view class="card-task-time">
								<view class="card-task-date">
									<view v-if="item.isPeriod">
										<view class="">
											每{{item.period.gapDay+1}}天
										</view>

										<view class="">
											{{item.period.range[0]}}到{{item.period.range[1]}}
										</view>
									</view>
									<view v-else>
										{{item.date}}
									</view>
								</view>

								<view v-if="item.alarm != '' " class="task-alarm">
									<view class="cuIcon-remind">
										{{item.alarm}}
									</view>
								</view>
							</view>
							<view class="card-mid">

								<view class="line">
								</view>
								<view style="width: 20rpx;">

								</view>

								<view style="" @click.stop.prevent="doNothing" @click="changeFinish(item)">
									<uni-icons v-if="!item.isFinish" type="smallcircle-filled" color="white" size="30">
									</uni-icons>

									<uni-icons v-else type="checkbox-filled" color="white" size="30"></uni-icons>

								</view>

							</view>
							<view class="card-task-content">
								{{item.content}}

								<view class="card-task-subtask" v-for="(subItem,subIndex) in item.subtasks"
									:key="subIndex">
									<view class="">
										- {{subItem.content}}
									</view>
									<view style="margin-left: 20rpx;" @click.stop.prevent="doNothing"
										@click="changeSubFinish(item,subIndex)">
										<uni-icons v-if="!subItem.isFinish" type="smallcircle-filled" color="white"
											size="25">
										</uni-icons>
										<uni-icons v-else type="checkbox-filled" color="white" size="25"></uni-icons>
									</view>
								</view>
							</view>
						</view>

					</view>
				</view>

				<view v-else class="card-allTask">
					<view v-for="(dayList,cardindex) in dayCardList" :key="cardindex">
						<!-- <view class="">
							dayList[0].date
						</view> -->
						<view class="card-task" style="background-color: #70C1B3;" >
							<view class="card-task-time">
								<view class="card-task-date">
									{{dayList.date}}
									
									<!-- {{days[1]}} -->
									<!-- {{weekStr[new Date(dayList.date).getDay()]}} -->
								</view>
								<view style="position: relative; right:-75rpx">
								{{ getWeekday('zh-CN', { weekday: 'long' },dayList.date) }}
								</view>
							</view>
							<view class="card-mid">

								<view class="line">
								</view>

							</view>
							<view class="card-day-content">

								<view v-for="(item,index) in dayList.tasks" :key="index">
									
									<view class="card-day">
										<view class="todo-icon-left" style="margin-top: 4rpx;" @click="changeFinish(item)">
											<uni-icons v-if="!item.isFinish" type="circle" color="white" size="25">
											</uni-icons>
											<uni-icons v-else type="checkbox" color="white" size="25"></uni-icons>
										</view>
										<view class="card-day-content">
											<!-- {{item.content==""?'无内容':item.content}} -->
											
											<view class="" @click="publish(item)">
												{{item.content==""?'无内容':item.content}}
											</view>
											<view @click="changeSubFinish(item,subIndex)" class="card-task-subtask"
												v-for="(subItem,subIndex) in item.subtasks" :key="subIndex">
												<view style="margin-left: -42rpx;" @click.stop.prevent="doNothing"
													@click="changeSubFinish(item,subIndex)">
													<uni-icons v-if="!subItem.isFinish" type="smallcircle-filled" color="white"
														size="25">
													</uni-icons>
													<uni-icons v-else type="checkbox-filled" color="white" size="25"></uni-icons>
												</view>
												<view class="">
													{{subItem.content}}
												</view>
												
											</view>
										</view>
										

									</view>
								</view>


							</view>
<!-- 							<view class="card-mid">
								<view class="line">
								</view>
							</view>
							总结： -->
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


		</view>

		<view class="margin-tb" style="height: 150rpx;">

		</view>

		<addTask name="addTask" ref="addTask" v-on:allInit="allInit"></addTask>



		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>


	</view>
</template>

<script>
	import {
		formatDayTime,
		formatTimeS,
		preDate
	} from '../timetable/common.js';
	var gastureX = 0
	var gastureY = 0
	import addTask from '../../components/addTask'
	import Fireworks from '../../components/Fireworks.vue'
	// import firework from '../../components/ay-firework/firework.vue'
	const weekStr = ["", "一", "二", "三", "四", "五", "六", "日"]
	
	const day = new Date().getDay();
	const getDay = day === 0 ? 7 : day; // 今天的星期
	const task_url = getApp().globalData.url + "/service-timetable/task"
	export default {
		components: {
			addTask,
			  Fireworks,
			  // firework,
		},
		data() {
			return {
				days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

				todayWeek: "星期" + weekStr[getDay],
				today: formatDayTime(new Date()) + " " + formatTimeS(new Date()),
				timer: "",
				msgType: 'success',
				messageText: '这是一条成功提示',
				//仅展示使用
				deadlineList: [{
						time: "2022年03月28日 周一 09:55",
						alarm: "07:00",
						content: "移动开发：安装苹果虚拟机和xcode",
						subtasks: [],
						isFinish: true,
					},
					{
						time: "2022年03月31日 周四 10:45",
						content: "系统分析设计：实验",
						alarm: "",
						isFinish: false,
						period: {
							"gapDay": 0,
							"range": ["2022-03-30", "2022-04-30"]
						},
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
					},
					{
						time: "每周五 19：45",
						alarm: "",
						content: "假装有一个deadline",
						subtasks: [],
						isFinish: false,
					}
				],
				allDayList: [{
					time: "每天",
					alarm: "19:00",
					content: "英语阅读两篇",
					subtasks: [],
					isFinish: false,
				}],
				todoList: [{
						time: "2022年03月28日 周一 09:55",
						alarm: "07:00",
						content: "移动开发：安装苹果虚拟机和xcode",
						subtasks: [],
						isFinish: true,
					},
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
					},
					{
						time: "每周五 19：45",
						alarm: "",
						content: "假装有一个deadline",
						subtasks: [],
						isFinish: false,
					}
				],
				dayCard: true,
				dayCardList: [],
				 showFireworks: false,
				 allDayStartdate : formatDayTime(preDate(new Date(),1) ),
			deadlineStartdate : formatDayTime(preDate(new Date(),1) )
						
			}
		},
		methods: {
			changeAllDayStartdate(){
				setTimeout(() => {
				  	        this.initList('全天')
				}, 100)
				
			},
			changeDeadlineStartdate(){
				setTimeout(() => {
				  	        this.initList('deadline')
				}, 100)
				
			},
			startFireworks() {
			      this.showFireworks = true
				  console.log("start")
			    },
			  getWeekday(locale, options,date) {
				  let days = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
				  return days[new Date(date).getDay()];
			  },
			messageToggle(type, msg) {
				this.msgType = type
				this.messageText = msg
				this.$refs.message.open()
			},
			publish(e) {
				console.log(e)
				this.$refs.addTask.showTaskModal(1, e)
			},
			update(e,finish = false) {
				let url = task_url + '/update'
				let token = uni.getStorageSync('token')
				let data = e
				console.log(data)
				var _this = this
				uni.request({
					url: url,
					method: "POST",
					data: data,
					header: {
						"token": token
					},
					success(res) {
						console.log(res.data)
						if (res.data.code == 1) {
							if(finish){
								let mess = ['加油！！！🎇','离成功又进了一步！🎉','你最棒！！！👍','牛牛牛！🐂']
								
								let index = Math.floor(Math.random()*1000) % mess.length
								_this.messageToggle('success', mess[index])
							}else{
								_this.messageToggle('success', '修改成功')
							}
							
							_this.allInit()
						} else {
							_this.messageToggle('fail', '修改失败')
						}
					},
					fail(e) {
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
			initList(e) {
				// console.log(nDate)
				// let nDate = formatDayTime(new Date());
				let url = task_url + '/selectByDateAndType'
				let token = uni.getStorageSync('token')
				let data = {
					"begDate": "1999-01-01",
					"endDate": "9999-12-21",
					"type": e,
				}
				console.log(this.allDayStartdate)
				if(e == '全天'){
					data.begDate = this.allDayStartdate
				}else if(e == 'deadline'){
					data.begDate = this.deadlineStartdate
				}
				let _this = this
				uni.request({
					url: url,
					method: "POST",
					data: data,
					header: {
						"token": token
					},
					success(res) {
						if (res.data.code == 1) {
							if (e == "全天") {
								_this.allDayList = res.data.data
								_this.changeTaskList(_this.allDayList)
								// console.log(_this.allDayList)
								// console.log(res.data)
								_this.initDayCard();
							} else if (e == "deadline") {
								_this.deadlineList = res.data.data
								_this.changeTaskList(_this.deadlineList)
							} else {
								_this.todoList = res.data.data
								_this.changeTaskList(_this.todoList)
							}
						}
					},
					fail(e) {
						console.log(e)
					}
				})
			},
			initDayCard() {
				// console.log("initDayCard")
				this.dayCardList = []
				var aList = this.allDayList
				aList.sort(function(a, b) {
					// if(a.isFinish != b.isFinish){
					// 	return Number(a.isFinish) - Number(b.isFinish)
					// }
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
				// let mp = {}
				for (let i = 0; i < aList.length; i++) {
					// console.log(aList[i])
					var endIndex = this.dayCardList.length - 1;
					if (endIndex >= 0 && aList[i].date == this.dayCardList[endIndex].date) {
						this.dayCardList[endIndex].tasks.push(aList[i])
					} else {
						let newTasks = {
							date: aList[i].date,
							tasks: [aList[i]]
						}
						this.dayCardList.push(newTasks)
					}
				}
				// console.log(this.dayCardList)

			},
			allInit() {
				// console.log("init")
				let typeList = ["待办事项", "全天", "deadline"]
				for (let i = 0; i < typeList.length; i++) {
					this.initList(typeList[i])
				}

			},
			onShow() {
				this.allInit()
				var _this = this
				this.timer = setInterval(() => {
					// console.log("now")
					// 同上	
					_this.today = formatDayTime(new Date()) + " " + formatTimeS(new Date())
					// console.log(new Date())
				}, 700)
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

				var lr = 75
				if (Math.abs(nx - gastureX) > lr) {
					if (nx - gastureX > 0) {
						console.log("左滑")
						uni.navigateBack({
							animationType: "slide-out-right"
						})
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
						// this.$refs.addTask.showTaskModal(0, "待办事项")
					}
					this.touchNum = 0
				}, 250)
			},
			doNothing() {},
			onUnload() {
				if (this.timer) {
					clearTimeout(this.timer);
					this.timer = null;
				}
			}
		}
	}
</script>

<style>
	@import "right.css";
	
	
	.fireworks-effect {
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	}
	
	.fireworks-effect .before,
	.fireworks-effect .after {
	  position: absolute;
	  content: '';
	  width: 20px;
	  height: 20px;
	  background-color: #f00;
	  border-radius: 50%;
	  animation-duration: 1s;
	  animation-iteration-count: infinite;
	}
	
	.fireworks-effect .before {
	  top: 0;
	  left: 0;
	  animation-name: before-firework;
	}
	
	.fireworks-effect .after {
	  top: -10px;
	  left: 10px;
	  animation-name: after-firework;
	}
	
	@keyframes before-firework {
	  0% {
	    transform: scale(0);
	  }
	  100% {
	    transform: scale(1);
	    opacity: 0;
	  }
	}
	
	@keyframes after-firework {
	  0% {
	    transform: scale(0);
	  }
	  100% {
	    transform: scale(1);
	    opacity: 0;
	  }
	}

</style>
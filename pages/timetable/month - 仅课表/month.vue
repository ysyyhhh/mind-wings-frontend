<template>

	<view class="page flex flex-direction uni-padding-wrap uni-common-mt" style="height: 100%;" @touchstart="gestureStart" @touchend="gestureEnd" @click="dbclick">

		<view class="cu-modal" :class="modalName=='Modal'?'show':''" style="z-index: 998;">
			<view class="cu-dialog">

				<view class="cu-bar bg-white justify-end">
					<view class="content">课程设置</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<form @submit="formSubmit">

						<view class="cu-form-group">
							<view class="title">课程名称</view>
							<input v-model="newCourse.courseName" name="inputCourseName"></input>
						</view>

						<view class="cu-form-group">
							<view class="title">上课教室</view>
							<input v-model="newCourse.classroom" name="inputclassroom"></input>
						</view>

						<view class="cu-form-group">
							<view class="title">课程内容</view>
							<input v-model="newCourse.courseContent" name="inputCourseContent"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">教师</view>
							<input v-model="newCourse.teacher" name="inputTeacher"></input>
						</view>

						<view class="cu-form-group">
							<view class="title">上课日期</view>
							<picker name="pickerDate" mode="date" :value="dateValue" style="z-index: 9999;"start="2019-09-01" end="2099-12-31" @change="dateChange">
								<view class="picker">
									{{newCourse.year}}-{{newCourse.month}}-{{newCourse.day}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">课程节数</view>
							<picker name="pickerClass" mode="multiSelector" :range="classRange" :value="classValue" @change="pickerClassChange" @columnchange="pickerClassColumnChange">
								<view class="picker">
									{{newCourse.begClass}}-{{newCourse.endClass}}
								</view>
							</picker>
						</view>

						<view class="cu-form-group">
							<view class="title">课程颜色</view>
							<view @click="showPickerColorPop" class='cu-tag' :style="{backgroundColor:newCourse.color}">
								{{newCourse.color}}
							</view>
							<picker-color :color="newCourse.color" :isShow="showPickerColor" :bottom="0" @callback='getPickerColor' />
						</view>

						<view style="font-weight: 100;">
							<text>颜色应用到该课程的所有课 {{" "}}</text>
							<checkbox @click="colorCheckChange" class='round sm' :class="colorAllChecked?'checked':''">
							</checkbox>


						</view>
						<view class="uni-btn-v">
							<button form-type="submit">Submit</button>
						</view>
					</form>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white text-primary" style="height: 100rpx; width:100%;position: fixed; z-index: 999;">
			<view class="action" @click="preMonth">
				<text class="cuIcon-back" style="margin-right: unset;"></text>
				<!-- <text class="text-bold text-lg">上一月</text> -->
			</view>
			<view class="action">

				<uni-icons name="UniIcons" size="18" type="heart-filled" @click="switchCouple"> </uni-icons>

				<view class="text-xl" @click="returnToday">{{today.year}}-{{today.month}}-{{today.day}}</view>

				<uni-icons name="UniIcons" size="20" type="settings-filled" @click="toSetting"></uni-icons>

			</view>

			<view class="action" @click="nextMonth">
				<!-- <text class="text-bold text-lg">下一月</text> -->
				<text class="cuIcon-right"></text>
			</view>

		</view>

		<view class="">
			{{testInfo}}
		</view>

		<view style="display: flex; flex-direction: row; position: relative; top:100rpx;">

			<view style="z-index:2;">
				<view :style="{height:(aDayHeigth+weeksHeight)*weekNum+'rpx'}" class="class-view">


					<view v-for="(item,index) in weekNum" :key="index">



						<view :style="{width:classWidth+'rpx',height:(aDayHeigth+weeksHeight )+'rpx',}" class="solid">
							<view :style="{height:weeksHeight+'rpx'}">

							</view>

							<view :style="{height: courseHeight + 'rpx',}" v-for="(classItem, classIndex) in classList"
								class="class-one solid" v-if="classIndex < 4">
								<view style="display: flex; flex-direction: column; text-align: center;">

									<view :style="{fontSize:(classFontSize+6)+'rpx',height:(classFontSize+1)+'rpx'}"
										class="margin-bottom-xs">{{classIndex+1}}
									</view>
									<view :style="{fontSize:(classFontSize+1)+'rpx',height:(classFontSize+2)+'rpx'}"
										class="text-gray">{{classItem.begTime}}
									</view>
									<view :style="{fontSize:(classFontSize+1)+'rpx',height:(classFontSize+2)+'rpx'}"
										class="text-gray">{{classItem.endTime}}
									</view>
								</view>
							</view>

							<view :style="{height:morningAfternoonGap+'rpx'}">

							</view>

							<view :style="{height: courseHeight + 'rpx',}" v-for="(classItem, classIndex) in classList"
								class="class-one solid" v-if="classIndex >= 4 && classIndex < aDayClassLength ">
								<view style="display: flex; flex-direction: column; text-align: center;
								
								">

									<view :style="{fontSize:(classFontSize+6)+'rpx',height:(classFontSize+1)+'rpx'}"
										class="margin-bottom-xs">{{classIndex+1}}
									</view>
									<view :style="{fontSize:(classFontSize+1)+'rpx',height:(classFontSize+2)+'rpx'}"
										class="text-gray">{{classItem.begTime}}
									</view>
									<view :style="{fontSize:(classFontSize+1)+'rpx',height:(classFontSize+2)+'rpx'}"
										class="text-gray">{{classItem.endTime}}
									</view>
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>

			<view :style="{left:(classWidth)+'rpx'}" @touchstart="touchstart" @touchmove="touchmove"
				@touchend="touchend">

				<view :style="{height:aDayHeigth*weekNum+'rpx',width:(oneWeekNum)*courseWidth+'rpx',}">


					<view style="display: flex; flex-direction: column;">

						<view v-for="(weekList,index) in weeksList" :key="index">
							<view :style="{height:( aDayHeigth+weeksHeight )+'rpx'}" class="aWeek">
								<view :style="{width:(oneWeekNum)*courseWidth+'rpx'}" class="weeks">
									<view :style="{height: weeksHeight+'rpx',width:courseWidth+'rpx'}"
										v-for="(item, index) in weekList" :key="index">
										<view class="class-title" :style="{fontSize:weeksFontSize+'rpx'}">


											<view>{{ item.week }}</view>
											<view :class="item.day === today.day ? 'radio-circle':'' ">
												{{item.month}}/{{ item.day }}
											</view>




										</view>
									</view>
								</view>


								<view :style="{width:(oneWeekNum)*courseWidth+'rpx',
						height:aDayHeigth+'rpx'}" class="courses">

									<view :style="{width:courseWidth+'rpx'}" v-for="(item, index) in weekList"
										:key="index">

										<view class="course-oneday">
											<view v-for="(itemCourse,indexCourse) in courseList">
												<view :style="{
												top:(itemCourse.begClass-1)*courseHeight+(itemCourse.begClass>=5?morningAfternoonGap:0)+'rpx',
												}" v-if="itemCourse.day == item.day && itemCourse.month == item.month" class="course-week">
													<view :style="{
												height: (itemCourse.endClass-itemCourse.begClass+1)*courseHeight + 'rpx',
												width:(courseWidth)+'rpx'
												}">
														<view :style="{'background-color': itemCourse.color}" class="course shadow-blur" @click="showModal(itemCourse)">
															<view style="display: flex; flex-direction: column; text-align: center; align-items: center;
																">
																<view class="flex flex-direction" :style="{fontSize:courseeNameSize+'rpx',
																'padding-left':(10)+'rpx',
																'padding-right':(10)+'rpx'}">
																	{{itemCourse.courseName}}
																</view>
																<view class="flex flex-direction" :style="{color:'#ff9d00',
																	fontSize:classroomSize+'rpx',
																	
																	}">{{itemCourse.classroom}}</view>

																<view :style="{fontSize:courseContentSize+'rpx',
																'padding-left':(10)+'rpx',
																'padding-right':(10)+'rpx'
																}"> {{itemCourse.courseContent}} </view>
															</view>
														</view>
													</view>

												</view>

											</view>
										</view>
									</view>
								</view>


							</view>

						</view>


					</view>
				</view>
			</view>
		</view>
		<addTask ref="addTask"></addTask>
		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
			:direction="direction" @trigger="trigger" />
			
		<!-- </view> -->
		<!-- </movable-area> -->

		<!-- 			</movable-view>
		</movable-area> -->
	</view>

</template>

<script>
	import {
		formatDayTime,
		teacherData
	} from '../common.js';

	// import {
	// 	size,
	// 	color,
	// 	colorList,
	// 	config
	// } from "../config.js"
	var gastureX = 0
	var gastureY = 0
	var size = {};
	var color = {};
	var colorList = {};
	var config = {};
	const oneDayTimeStamp = 86400000; // 一天的时间戳
	const now = new Date();
	const todayDayTimeStamp = now.getTime(); //今天的时间戳
	const day = now.getDay();
	const getDay = day === 0 ? 7 : day; // 今天的星期


	const maxX = 0
	const maxY = 0
	const weekStr = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
	const url_timetable = getApp().globalData.url + "/service-timetable/timetable"

	const url_classList = getApp().globalData.url + "/service-timetable/classList"
	const api_url = getApp().globalData.url + "/service-user/api"

	import pickerColor from "../../../components/pickColor.vue";
	import addTask from "../../../components/addTask"

	function clone(e) {
		return JSON.parse(JSON.stringify(e));
	};

	function assignment(a, b) {
		Object.keys(a).forEach(item => {
			Object.keys(b).forEach(i => {
				if (item === i) {
					b[i] = a[item]
				}
			})
		})
		return b
	};
	export default {
		name: 'time-table',
		components: {
			"picker-color": pickerColor,
			addTask,
		},
		data() {

			return {
				buttonColor: "#66ccff",
				showPickerColor: false,
				bottomPickerColor: 0,

				fontSize: 15,

				morningAfternoonGap: size.morningAfternoonGap,
				windowWidth: 0,
				windowHeight: 0,
				testInfo: "",
				touching: false,
				yGap: 0, //计算双指x轴的间隙
				xGap: 0, //计算双指x轴的间隙
				courseWidth: size.courseWidthInit,
				classWidth: size.classWidthInit,
				courseHeight: size.courseHeightInit,
				weeksHeight: size.weeksHeightInit,

				aDayHeigth: 0,
				X: 0,
				Y: 0,

				changeY: false,
				preY: 100,
				preSource: "",
				week: getDay, // 今天的星期

				today: {
					month: 3,
					day: 17,
					year: 2022,
				},
				courseList: [],
				classList: [{
						time: "1",
						begTime: "08:30",
						endTime: "09:10",
					},
					{
						time: "2",
						begTime: "09:20",
						endTime: "10:00",
					},
					{
						time: "3",
						begTime: "10:20",
						endTime: "11:00",
					},
					{
						time: "4",
						begTime: "11:10",
						endTime: "11:50",
					},
					{
						time: "5",
						begTime: "13:40",
						endTime: "14:20",
					},
					{
						time: "6",
						begTime: "14:25",
						endTime: "15:05",
					},
					{
						time: "7",
						begTime: "15:25",
						endTime: "16:05",
					},
					{
						time: "8",
						begTime: "16:10",
						endTime: "16:50",
					},
					{
						time: "9",
						begTime: "19:00",
						endTime: "19:40",
					},
					{
						time: "10",
						begTime: "19:50",
						endTime: "20:30",
					}
				],

				weeksList: [
					[{}, {}],
				],


				num: 0, // 记录周数，下一周加一，上一周减一, 0:本周
				isCard: false, // 卡片是否铺满全屏
				time: now.toISOString().slice(0, 10),
				mondayDayTimeStamp: 0, // 星期一的时间戳
				sundayDayTimeStamp: 0, // 星期天的时间戳,

				classInterval: null,
				classTimeout: null,
				endSetY: 0,
				modalName: null,
				classFontSize: 0,
				weeksFontSize: 0,
				nCourse: {},
				newCourse: {}, //修改的数据

				courseeNameSize: 0,
				courseContentSize: 0,
				classroomSize: 0,
				teacharSize: 0,

				oneWeekNum: 7,
				weekNum: 3,
				classRange: [
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
				],
				classifyIndex: [0, 0],
				colorAllChecked: true,
				dateValue: "2022-04-22",
				classValue: [0, 0],

				aDayClassLength: 10,
				content: [{
					iconPath: '../../../static/img/waitTask.png',
					selectedIconPath: '../../../static/img/waitTask.png',
					text: '待办事项',
					active: false
				},
				{
					iconPath: '../../../static/img/allDay.png',
					selectedIconPath: '../../../static/img/allDay.png',
					text: '全天',
					active: false
				},
				{
					iconPath: '../../../static/img/deadline.png',
					selectedIconPath: '../../../static/img/deadline.png',
					text: 'deadline',
					active: false
				}],
				horizontal: 'right',
				vertical: 'bottom',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: 'rgb(255,201,71)',
					buttonColor: 'rgb(250, 193, 69)',
					iconColor: '#fff'
				},
				direction: 'vertical',
			};
		},
		async created() {


			// this.allInit()
			// console.log(now.getDate());


			// console.log(this.today)
			// 一开始进入页面获取本周的课程表
			let _this = this
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowHeight = windowHeight
			this.windowWidth = windowWidth * 1.9
			// console.log(this.windowWidth + " " + this.windowHeight)
			// uni.getSystemInfo({
			// 	success: function(res) {
			// 		// console.log(res.model);
			// 		// console.log(res.pixelRatio);
			// 		console.log(res.windowWidth);
			// 		_this.windowHeight = res.windowHeight
			// 		_this.windowWidth = res.windowWidth
			// 		console.log(res.windowHeight);
			// 		// console.log(res.language);
			// 		// console.log(res.version);
			// 		// console.log(res.platform);
			// 	}
			// });
		},
		methods: {
			trigger(e) {
				console.log(e)
				// this.content[e.index].active = !e.item.active
				
				this.$refs.addTask.showTaskModal(0,e.item.text)
				// uni.showModal({
				// 	title: '提示',
				// 	content: `您选中了${e.item.text}`,
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定')
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消')
				// 		}
				// 	}
				// })
			},
			vuetap: function(s, e) {
				console.log(s.name)
				console.log(e)

				// this.name = s.name;
			},
			colorCheckChange() {
				this.colorAllChecked = !this.colorAllChecked
			},
			/* 显示获取颜色选择弹窗 */
			showPickerColorPop() {
				this.showPickerColor = true;

			},
			/* 获取颜色选择回调 */
			getPickerColor(color) {
				/* 隐藏弹窗 */
				this.showPickerColor = false;
				/* 判断颜色值是否有效 */
				if (color) {
					this.newCourse.color = color;
					console.log('选择的颜色值是：' + color);
				}
			},
			pickerClassColumnChange(e) {
				console.log(e.detail.value)
				if (e.detail.column == 0) {
					this.classRange[1] = new Array()
					for (let i = e.detail.value; i <= this.classList.length; i++) {
						this.classRange[1][i - e.detail.value] = i + 1
					}

				}
			},
			pickerClassChange(e) {
				console.log(e.detail.value[0], )
				this.newCourse.begClass = this.classRange[0][e.detail.value[0]]
				this.newCourse.endClass = this.classRange[1][e.detail.value[1]]
			},
			dateChange(e) {
				console.log(e.detail.value)
				let nDate = e.detail.value

				this.newCourse.year = Number(nDate.substr(0, 4))
				this.newCourse.month = Number(nDate.substr(5, 2))
				this.newCourse.day = Number(nDate.substr(8, 2))
				console.log(JSON.stringify(this.newCourse))
			},
			formSubmit: function(e) {
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				console.log("提交设置，现在课程的内容为： " + JSON.stringify(this.newCourse))

				console.log("是否应用到该课程的所有课:" + this.colorAllChecked)

				let url = url_timetable + "/update"
				let data = this.newCourse
				console.log("发送的data : " + data)
				let token = uni.getStorageSync('token')
				var _this = this
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"token": token
					},
					success(res) {
						console.log(res)
						// assignment(_this.newCourse, _this.nCourse)
						_this.initCourse()
						uni.showToast({
							title: "修改成功",
							icon: "success"
						})
					},
					fail(res) {

						console.log(res)
					}
				})

				//如果需要改变所有对应的颜色，就改变
				if (this.colorAllChecked) {
					let url = url_timetable + "/updateCourseColor"
					let data = this.newCourse
					console.log("发送的data : " + data)
					let token = uni.getStorageSync('token')
					var _this = this
					uni.request({
						url: url,
						data: data,
						method: "POST",
						header: {
							"token": token
						},
						success(res) {
							console.log(res)
						},
						fail(res) {
							console.log(res)
						}
					})
				}
				// var formdata = e.detail.value
				this.modalName = null
			},


			showModal(e) {
				console.log(e)
				this.nCourse = e
				this.modalName = "Modal"
				// this.pickerColor = this.nCourse.color
				this.dateValue = this.nCourse.year.toString() + "-" + (this.nCourse.month < 10 ? "0" : "") + this.nCourse
					.month.toString() + "-" + (this.nCourse.day < 10 ? "0" : "") + this.nCourse.day.toString()
				this.classValue = [this.nCourse.begClass - 1, this.nCourse.endClass - this.nCourse.begClass]

				this.classRange[1] = new Array()
				for (let i = this.nCourse.begClass; i <= this.classList.length; i++) {
					this.classRange[1][i - this.nCourse.begClass] = i
				}


				this.newCourse = clone(this.nCourse)
			},
			hideModal(e) {
				this.modalName = null
			},
			toSetting() {
				uni.navigateTo({
					url: '../setting/setting'
				})
			},
			async returnToday() {
				console.log("return ")
				this.thisMonth()
			},
			getSize() {
				this.fontSize = ((this.courseHeight / 13 + this.courseWidth / 11))
				// "courseNameSizeDev":0,
				// "courseContentSizeDev":0,
				// "classroomSizeDev":0,
				// "teacharSizeDev":0

				this.courseeNameSize = this.fontSize + size.courseNameSizeDev
				this.courseContentSize = this.fontSize + size.courseContentSizeDev
				this.classroomSize = this.fontSize + size.classroomSizeDev
				this.teacharSize = this.fontSize + size.teacharSizeDev


				this.weeksFontSize = ((this.weeksHeight / 13 + this.courseWidth / 6))
				this.classFontSize = ((this.courseHeight / 13 + this.classWidth / 7))
				this.aDayHeigth = (this.aDayClassLength + 1) * this.courseHeight + this.morningAfternoonGap
			},
			watchCourse() {
				// console.log("监听ing")

				if (this.classTimeout) {
					// console.log("end")
					// console.log(this.endSetY)
					this.Y = this.endSetY
					clearTimeout(this.classTimeout);
					this.classTimeout = null
				}
			},
			onChange: function(e) {

				let ny = e.detail.y
				this.endSetY = e.detail.y
				// if(e.detail.source != "friction"){
				this.classTimeout = setTimeout(() => {
					// console.log("set " + this.endSetY)
					this.watchCourse()
					// 这里添加您的逻辑		
				}, 500)

			},
			touchstart(e) {
				// console.log("触摸开始！")
				// console.log(e)

				if (e.changedTouches.length == 1) {
					this.changeY = true
					// this.preY =  e.changedTouches[0].pageY
				}

				if (e.touches.length >= 2) {
					this.touching = true
					this.yGap = Math.abs(e.touches[0].pageY - e.touches[1].pageY)
				}
			},
			touchmove(e) {
				// console.log("触摸移动中！")
				// console.log(e.touches)
				// this.testInfo = e.touches
				if (e.touches.length >= 2 && this.touching == true) {

					let nyGap = Math.abs(e.touches[0].pageY - e.touches[1].pageY)
					let yChange = nyGap - this.yGap
					// console.log(this.courseWidth + " " + this.courseHeight)

					if (Math.abs(yChange) > 0 &&
						(this.courseHeight + yChange) * (this.classList.length + 1) + this.weeksHeight >
						this.windowHeight) {
						this.courseHeight = this.courseHeight + yChange
						this.yGap = nyGap
					}
					this.getSize()
					// this.testInfo = xChange + " | " + yChange
				}
			},
			touchend(e) {

				if (e.changedTouches.length == 1 && this.changeY) {
					// console.log("touchend y :")
					// console.log(e.changedTouches)

					// this.Y += e.changedTouches[0].pageY - this.preY
					// console.log( e.changedTouches[0].pageY - this.preY )

				}

				setTimeout(() => {
					this.touching = false
				}, 1000)


				this.changeY = false
			},
			tabSelect(e) {
				this.week = +e.currentTarget.dataset.id + 1;
				this.time = formatDayTime(this.mondayDayTimeStamp + oneDayTimeStamp * (this.week - 1));
				console.log('星期' + this.week);
			},
			async preMonth() {
				console.log('上一月');
				this.mondayDayTimeStamp -= oneDayTimeStamp * 7 * config.weekNum
				this.dayList();
				this.initCourse();

			},
			async nextMonth() {
				console.log('下一月');
				this.mondayDayTimeStamp += oneDayTimeStamp * 7 * config.weekNum
				this.dayList()

				this.initCourse();
				// const teacherdata = await teacherData({
				// 	data: {
				// 		startTime: this.mondayDayTimeStamp,
				// 		endTime: this.sundayDayTimeStamp
				// 	}
				// });
				// const { data } = teacherdata.data;
				// this.list = Object.values(data);
			},
			async thisMonth() {
				// console.log('本月');
				this.today = {
					year: now.getYear() + 1900,
					month: now.getMonth() + 1,
					day: now.getDate()
				};
				// console.log(typeof(now))
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1); // 星期一的时间戳
				this.dayList();
				// const teacherdata = await teacherData({
				// 	data: {
				// 		startTime: this.mondayDayTimeStamp,
				// 		endTime: this.sundayDayTimeStamp
				// 	}
				// });
				// const { data } = teacherdata.data;
				// this.list = Object.values(data);
			},
			dayList() {
				// console.log(getDay)
				this.weekNum = config.weekNum
				for (let j = 0; j < config.weekNum; j++)

					// 获取本周日期
					for (let i = 0; i < config.oneWeekNum; i++) {
						let addTime = (j * 7) + i
						let nowDate = new Date()
						nowDate.setTime(this.mondayDayTimeStamp + addTime * oneDayTimeStamp);
						// console.log(nowDate.toDateString())
						// console.log(nowDate.getDate())  


						this.weeksList[j][i].day = nowDate.getDate();
						this.weeksList[j][i].month = nowDate.getMonth() + 1
						this.weeksList[j][i].year = nowDate.getFullYear();
						this.weeksList[j][i].week = weekStr[i]
						// console.log(this.weeksList[j][i].year + " "+ this.weeksList[j][i].month + " "+ this.weeksList[j][i].day)

						let nowTime = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8);
						// console.log(nowTime)

					}
				this.$forceUpdate()
			},
			onUnload() {

				if (this.classTimeout) {
					clearTimeout(this.classTimeout);
					this.classTimeout = null;
				}
			},
			onShow() {
				console.log("show!")
				this.allInit()
			},
			initJson() {
				return new Promise((resolve, reject) => {
					var nconfig = {}
					try {
						const value = uni.getStorageSync('timetableConfig');
						if (value) {
							// console.log("Yes!")
							nconfig = value
							// console.log(value);
						} else {
							// console.log("oH No!")
							nconfig = require('../../../static/timetable/config.json')
							uni.setStorageSync('timetableConfig', nconfig)
						}
					} catch (e) {
						// error
					}
					size = nconfig.size
					color = nconfig.color
					colorList = nconfig.colorList
					config = nconfig.config
					this.morningAfternoonGap = size.morningAfternoonGap,

						this.courseWidth = (750 - size.classWidthInit) / config.oneWeekNum,

						this.classWidth = size.classWidthInit,
						this.courseHeight = size.courseHeightInit,
						this.weeksHeight = size.weeksHeightInit,
						this.oneWeekNum = config.oneWeekNum


					this.getSize()
					resolve('suc');

				})

			},
			initCourse() {
				var mp = new Map();
				var colori = 0
				var _this = this
				return new Promise((resolve, reject) => {
					let beg = this.weeksList[0][0]
					let end = this.weeksList[this.weeksList.length - 1][this.weeksList[this.weeksList.length - 1]
						.length - 1
					]
					let data = {
						"begYear": beg.year,
						"endYear": end.year,
						"begMonth": beg.month,
						"endMonth": end.month,
						"begDay": beg.day,
						"endDay": end.day
					}
					let token = uni.getStorageSync('token')
					// console.log(data)
					// console.log(token)
					let url = url_timetable + "/selectByDate"
					uni.request({
						url: url,
						data: data,
						header: {
							"token": token
						},
						method: "POST",
						success(res) {
							console.log(res.data.data)
							var ndata = clone(res.data.data)
							console.log(ndata)
							_this.courseList = res.data.data
							// console.log(_this.courseList)
							// // _this.courseList = []
							let maxEndClass = 0
							for (let i = 0; i < _this.courseList.length; i++) {
								// console.log(_this.courseList[i])
								let dateStr = _this.courseList[i]['date']
								_this.courseList[i].year = Number(dateStr.substr(0, 4))
								_this.courseList[i].month = Number(dateStr.substr(5, 2))
								_this.courseList[i].day = Number(dateStr.substr(8, 2))
								delete _this.courseList[i].date;

								maxEndClass = Math.max(maxEndClass, _this.courseList[i].endClass)
							}
							_this.aDayClassLength = maxEndClass
							_this.getSize()
						},
						fail(e) {
							console.log(e)
						}
					})
					resolve('suc');

				})


				// this.courseList = require('../../../static/timetable/juniorNext.json');


				// for (let i = 0; i < this.courseList.length; i++) {
				// 	// console.log(this.courseList[i].courseName)
				// 	if (mp.has(this.courseList[i].courseName)) {
				// 		this.courseList[i].color = mp.get(this.courseList[i].courseName)
				// 	}
				// 	if (this.courseList[i].color == "") {
				// 		mp.set(this.courseList[i].courseName, colorList[colori])
				// 		this.courseList[i].color = mp.get(this.courseList[i].courseName)
				// 		colori = (colori + 1) % colorList.length
				// 		// console.log(colori)
				// 		// console.log(this.courseList[i].color)
				// 	}
				// }


			},
			initClass() {
				let url = url_classList + "/select"
				let token = uni.getStorageSync('token')
				var _this = this
				uni.request({
					url: url,
					method: "GET",
					header: {
						"token": token
					},
					success(res) {
						// console.log(res)
						_this.classList = res.data.data

						_this.classList.sort(function(a, b) {
							return (a.begTime) > (b.begTime)
						})
						_this.classRange = new Array()
						_this.classRange[0] = new Array()
						_this.classRange[1] = new Array()
						for (let i = 0; i <= _this.classList.length; i++) {
							_this.classRange[0][i] = _this.classRange[1][i] = i + 1
						}
						console.log(JSON.stringify(_this.classRange))
					}
				})


				this.classRange = new Array()
				this.classRange[0] = new Array()
				this.classRange[1] = new Array()
				for (let i = 0; i <= this.classList.length; i++) {
					this.classRange[0][i] = this.classRange[1][i] = i + 1
				}
				// console.log(JSON.stringify(this.classRange))
				// var nList = clone(this.classList)

				// for(let i = 0;i < nList.length;i++){
				// 	// console.log(nList[i])
				// 	nList[i].beg_time = nList[i].begTime
				// 	nList[i].end_time = nList[i].endTime
				// 	nList[i].user_phone = "123test"
				// }
				// console.log(JSON.stringify( nList ))
			},
			async allInit() {
				let me = await this.getUser()
				if (!me) {
					//跳转
					uni.redirectTo({
						url: "../../index/index"
					})
				}

				console.log("all Init")
				await this.initJson()
				// console.log("获取之后")


				this.getSize()
				await this.initClass()
				this.initWeek()
				this.thisMonth()
				this.initCourse()

			},
			initWeek() {
				// console.log(config.weekNum)

				// console.log(config.oneWeekNum)
				this.weeksList = new Array()


				for (var j = 0; j < config.weekNum; j++) {
					this.weeksList[j] = new Array()
					for (var i = 0; i < config.oneWeekNum; i++) {
						this.weeksList[j][i] = {
							month: 2,
							day: 28,
							week: '一'
						}
					}
					// console.log(this.weeksList[j][i])
				}
			},
			switchCouple() {
				let url = api_url + "/getCoupleToken"
				let token = uni.getStorageSync('token')
				var _this = this
				uni.request({
					url: url,
					method: "GET",
					header: {
						"token": token
					},
					success(res) {
						console.log(res)
						if (res.data.code == 1) {
							uni.showToast({
								title: "切换成功！",
								icon: "success"
							})
							uni.setStorageSync('token', res.data.data)
							_this.allInit()
						}

					}
				})
			},
			gestureStart(e) {
				// console.log("gestureStart")
				// console.log(e.changedTouches[0])

				gastureX = e.changedTouches[0].pageX
				gastureY = e.changedTouches[0].pageY
			},
			gestureEnd(e) {
				// console.log("gestureEnd")
				// console.log(e.changedTouches[0])
				var nx = e.changedTouches[0].pageX
				var ny = e.changedTouches[0].pageY

				var lr = 75
				if (Math.abs(nx - gastureX) > lr &&
					Math.abs(ny - gastureY) < 20) {
					if (nx - gastureX > 0) {
						console.log("左滑")
					} else {
						console.log("右滑")
						uni.navigateTo({
							url: "../../right/right"
						})
					}
				}
				var tb = 100
				var minTop = 600
				if (Math.abs(ny - gastureY) > tb && this.touching == false) {
					if (ny - gastureY > 0) {
						if (gastureY < minTop) {
							console.log("上滑")
							uni.navigateTo({
								animationType: "slide-in-top",
								url: "../../today/today"
							})
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
						this.$refs.addTask.showTaskModal(0,'待办事项')
					}
					this.touchNum = 0
				}, 250)
			}
		}
	}
</script>

<style>
	@import "../timetable.css";
	@import "month.css";
	/* 	.aWeek {
		display: flex;
		flex-direction: column;
	} */
	/* .text{
	/* font-size: v-bind(fontSize); */
	/* height: v-bind(testSize)rpx; */
	/* color: v-bind(testColor);
} */
	/* 	movable-area {
		height: 700rpx;
		width: 100%;
		background-color: #D8D8D8;
		overflow: hidden;
	} */
</style>

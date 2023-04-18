<template>
	<view class="time-table flex flex-direction uni-padding-wrap uni-common-mt" style="height: 100%">
		<view class="cu-bar bg-white text-primary" style="height: 100rpx;">
			<view class="action" @click="previousWeek">
				<text class="cuIcon-back" style="margin-right: unset;"></text>
				<text class="text-bold text-lg">上一周</text>
			</view>
			<text class="content text-bold">{{ time }}</text>
			<view class="action" @click="nextWeek">
				<text class="text-bold text-lg">下一周</text>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="">
			{{testInfo}}
		</view>
		<!-- 	<movable-area scale-area>
			<movable-view direction="all" inertia @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
 -->
		<!-- 		<view class=""> -->

		<movable-area>

			<movable-view :x="X" direction="horizontal" disabled="true" style="z-index:2;"
				damping="100">
				
				<view  :style="{left:classWidth+'rpx',width:(timeList.length+1)*courseWidth+'rpx'}" class="weeks">
					
					
					<view :style="{width:courseWidth+'rpx'}" v-for="(item, index) in timeList" :key="index">
						<view :style="{height: weeksHeight+'rpx'}" class="class-title" @click="tabSelect" :data-id="index">
							<view class="">{{ item.week }}</view>
							<view class="text-bold text-lg time"
								:class="item.time === today.day ? 'radio-circle':'' " >
								{{ item.time }}
							</view>
							
						</view>
					</view>
				</view>
				
			</movable-view>
			<movable-view  disabled="true"  style="z-index:999;">
				<view :style="{width:classWidth+'rpx',height:weeksHeight+'rpx'} " class="left-top">
					
				</view>
			</movable-view>

			<movable-view :y="Y" direction="vertical" style="z-index:2;"
				damping="100">
				
				<view :style="{top:weeksHeight+'rpx',height:(classList.length+1)*courseHeight+'rpx'}" class="class-view flex text-center page-bg-white margin-bottom-sm">
					<view :style="{width:classWidth+'rpx'}">
						<view :style="{height: courseHeight + 'rpx'}" v-for="(item, index) in classList" :key="index"
							class="class-one page-bg-primary solid">
							<view>
								<view>{{index+1}}</view>
								<view>{{item.begTime}}</view>
								<view>{{item.endTime}}</view>
							</view>
						</view>
					</view>
				</view>
			</movable-view>
			
			<movable-view :x="X" :y="Y" direction="all" inertia="true" @touchstart="touchstart"
				@touchmove="touchmove" @touchend="touchend" @change="onChange"
				 friction="1" out-of-bounds="true">
				<view :style="{width:(timeList.length+1)*courseWidth+'rpx',
				height:(classList.length+1)*courseHeight+'rpx',
				top: weeksHeight+'rpx',
				left: classWidth+'rpx'}"
				 class="courses solid">
					
					<view :style="{width:courseWidth+'rpx'}" v-for="(item, index) in timeList" :key="index"
						>
						<view  v-for="(itemCourse,indexCourse) in courseList">

							<view :style="{ height: (itemCourse.endClass-itemCourse.begClass+1)*courseHeight + 'rpx'}"
								v-if="itemCourse.day == item.time">
								<view :style="{'background-color': itemCourse.color}" class="course">
									<view class="">
										{{itemCourse.courseName}}
										<text style="color:#ff9d00">{{itemCourse.classroom}}</text>
										
									</view>
									
								    <view class="">
								    	{{itemCourse.courseContent}}
								    </view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</movable-view>
		</movable-area>
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
	
	import {size,color} from "../config.js"
	
	
	const oneDayTimeStamp = 86400000; // 一天的时间戳
	const now = new Date();
	const todayDayTimeStamp = now.getTime(); //今天的时间戳
	const day = now.getDay();
	const getDay = day === 0 ? 7 : day; // 今天的星期



	const maxX = 0
	const maxY = 60
	export default {
		name: 'time-table',
		data() {

			return {

				windowWidth: 0,
				windowHeight: 0,
				testInfo: "",
				touching: false,
				yGap: 0, //计算双指x轴的间隙
				xGap: 0, //计算双指x轴的间隙
				courseWidth:  size.courseWidthInit,
				classWidth: size.classWidthInit,
				courseHeight: size.courseHeightInit,
				weeksHeight: size.weeksHeightInit,
				
				X: 0,
				Y: 0,
				week: getDay, // 今天的星期
				today:{
					month:3,
					day:17,
					year:2022,
				},
				courseList: [{
						color: color.purple,
						year: 2022,
						month: 3,
						day: 14,
						begClass: 1,
						endClass: 2,
						courseName: "预防医学",
						teacher: "李思思",
						courseContent: "第六章 筛检与诊断试验",
						classroom: "105大班（黄金：一教）"
					},
					{
						color: color.pink,
						year: 2022,
						month: 3,
						day: 15,
						begClass: 1,
						endClass: 2,
						courseName: "核医学",
						teacher: "黄铀新",
						courseContent: "骨骼系统",
						classroom: "623大班（黄金：一教）"
					},
					{
						color: color.pinkLight,
						year: 2022,
						month: 3,
						day: 16,
						begClass: 1,
						endClass: 2,
						courseName: "中医学",
						teacher: "孙小勇",
						courseContent: "四诊",
						classroom: "417大班（黄金：一教）"
					},
					{
						color: color.blueLight,
						year: 2022,
						month: 4,
						day: 17,
						begClass: 1,
						endClass: 2,
						courseName: "全科医学概论",
						teacher: "朱韵雅",
						courseContent: "以家庭为单位的健康照顾（1）",
						classroom: "222大班（黄金：一教）"
					},
					{
						color: color.orange,
						year: 2022,
						month: 4,
						day: 14,
						begClass: 3,
						endClass: 4,
						courseName: "预防医学",
						teacher: "吴清锋",
						courseContent: "第八章 临床预防服务概论",
						classroom: "206大班（黄金：一教）"
					},
					{
						color: color.blueLight,
						year: 2022,
						month: 4,
						day: 15,
						begClass: 3,
						endClass: 4,
						courseName: "预防医学",
						teacher: "何小娜",
						courseContent: "第九章 健康行为干预",
						classroom: "206大班（黄金：一教）"
					},
					{
						color: color.yellow,
						year: 2022,
						month: 4,
						day: 16,
						begClass: 3,
						endClass: 4,
						courseName: "内科学",
						teacher: "谢东明",
						courseContent: "心律失常",
						classroom: "219大班（黄金：一教）"
					},
					{
						color: color.yellowLight,
						year: 2022,
						month: 4,
						day: 17,
						begClass: 3,
						endClass: 4,
						courseName: "医学伦理学",
						teacher: "肖杰峰",
						courseContent: "医学伦理的规范体系",
						classroom: "302大班（黄金：一教）"
					},
					{
						color: color.green,
						year: 2022,
						month: 4,
						day: 14,
						begClass: 5,
						endClass: 6,
						courseName: "内科学",
						teacher: "待定51",
						courseContent: "呼吸系统疾病",
						classroom: "见习场所4（章）"
					},
					{
						color: color.greenLight,
						year: 2022,
						month: 4,
						day: 15,
						begClass: 5,
						endClass: 6,
						courseName: "内科学",
						teacher: "谢东明",
						courseContent: "心律失常",
						classroom: "317大班（黄金：一教）"
					},
					{
						color: color.purpleLight,
						year: 2022,
						month: 4,
						day: 16,
						begClass: 5,
						endClass: 6,
						courseName: "医学影像学",
						teacher: "郭少华",
						courseContent: "中枢神经系统",
						classroom: "206大班（黄金：一教）"
					},
				],
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
				timeList: [{
						time: '1',
						week: '一'
					},
					{
						time: '2',
						week: '二'
					},
					{
						time: '3',
						week: '三'
					},
					{
						time: '4',
						week: '四'
					},
					{
						time: '5',
						week: '五'
					},
					{
						time: '6',
						week: '六'
					},
					{
						time: '7',
						week: '日'
					}
				],

				num: 0, // 记录周数，下一周加一，上一周减一, 0:本周
				isCard: false, // 卡片是否铺满全屏
				time: now.toISOString().slice(0, 10),
				mondayDayTimeStamp: 0, // 星期一的时间戳
				sundayDayTimeStamp: 0 // 星期天的时间戳,
			};
		},
		async created() {
			// console.log(now.getDate());
			this.today = {
				year:now.getYear()+1900,
				month:now.getMonth()+1,
				day:now.getDate()
			};
			console.log(this.today)
			this.thisWeek(); // 一开始进入页面获取本周的课程表
			let _this = this
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();	
			this.windowHeight = windowHeight*2
			this.windowWidth = windowWidth*2
			console.log(this.windowWidth + " " + this.windowHeight)
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
			onChange: function(e) {
				// console.log(e)
				this.X = e.detail.x
				this.Y = e.detail.y
				if (this.X > maxX) {
					this.X = maxX
				}
				if (this.Y > maxY) {
					this.Y = maxY
				}
				// this.testInfo = this.X + " " + this.Y
			},
			touchstart(e) {
				// console.log("触摸开始！")
				// console.log(e.touches)

				if (e.touches.length >= 2) {
					this.touching = true
					// this.testInfo = this.xGap + " | "+this.yGap
					this.xGap = Math.abs(e.touches[0].pageX - e.touches[1].pageX)
					this.yGap = Math.abs(e.touches[0].pageY - e.touches[1].pageY)
				}
			},
			touchmove(e) {
				// console.log("触摸移动中！")
				// console.log(e.touches)
				// this.testInfo = e.touches
				if (e.touches.length >= 2 && this.touching == true) {

					let nxGap = Math.abs(e.touches[0].pageX - e.touches[1].pageX)
					let nyGap = Math.abs(e.touches[0].pageY - e.touches[1].pageY)
					let xChange = nxGap - this.xGap
					let yChange = nyGap - this.yGap
					console.log(this.courseWidth + " " + this.courseHeight)
					if (Math.abs(xChange) > size.minXChange && 
					(this.courseWidth + xChange) * (this.timeList.length+1) + this.classWidth > 
					    this.windowWidth) {
						// this.testInfo = (this.courseWidth + xChange)*(this.timeList.length+1)
						// this.testInfo = this.windowWidth
						this.courseWidth = this.courseWidth + xChange
						this.xGap = nxGap
					}

					if (Math.abs(yChange) >  size.minYChange && 
					(this.courseHeight + yChange) * (this.classList.length+1) + this.weeksHeight >
						this.windowHeight) {
						this.courseHeight = this.courseHeight + yChange
						this.yGap = nyGap
					}

					// this.testInfo = xChange + " | " + yChange
				}
			},
			touchend(e) {
				this.touching = false
			},
			tabSelect(e) {
				this.week = +e.currentTarget.dataset.id + 1;
				this.time = formatDayTime(this.mondayDayTimeStamp + oneDayTimeStamp * (this.week - 1));
				console.log('星期' + this.week);
			},
			async previousWeek() {
				console.log('上一周');
				this.week = 1;
				this.num = this.num - 1;
				if (this.num === 0) this.num === -1;
				if (this.num >= 0) {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (
						7 * this.num); // 上星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (
						7 * this.num); //上星期天的时间戳
				} else {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (
						7 * Math.abs(this.num)); // 上星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (
						7 * Math.abs(this.num)); //上星期天的时间戳
				}
				this.dayList();
				this.time = formatDayTime(this.mondayDayTimeStamp);

			},
			async nextWeek() {
				console.log('下一周');
				this.week = 1;
				this.num = this.num + 1;
				if (this.num === 0) this.num === 1;
				if (this.num <= 0) {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (
						7 * Math.abs(this.num)); // 下星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (
						7 * Math.abs(this.num)); //下星期天的时间戳
				} else {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (
						7 * this.num); // 下星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (
						7 * this.num); //下星期天的时间戳
				}
				this.dayList();
				this.time = formatDayTime(this.mondayDayTimeStamp);
				console.log(this.time)
				// const teacherdata = await teacherData({
				// 	data: {
				// 		startTime: this.mondayDayTimeStamp,
				// 		endTime: this.sundayDayTimeStamp
				// 	}
				// });
				// const { data } = teacherdata.data;
				// this.list = Object.values(data);
			},
			async thisWeek() {
				console.log('本周');
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1); // 星期一的时间戳
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp; //星期天的时间戳
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
				console.log(getDay)
				// 获取本周日期
				for (let i = 0; i < 7; i++) {
					if (this.num === 0) {
						// i + 1 === getDay ? (this.timeList[i].time = '今') : (this.timeList[i].time = +formatDayTime(this
						// 	.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8));
						i + 1 === (this.timeList[i].time = +formatDayTime(this
							.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8));
					} else {
						this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8);
					}
				}
			},
			onUnload() {},
			// tap: function(e) {
			// 	// 解决view层不同步的问题
			// 	this.x = this.old.x
			// 	this.y = this.old.y
			// 	this.$nextTick(function() {
			// 		this.x = 30
			// 		this.y = 30
			// 	})
			// },
			// tap2() {
			// 	// 解决view层不同步的问题
			// 	this.scale = this.old.scale
			// 	this.scale = this.old.scale
			// 	this.$nextTick(function() {
			// 		this.scale = 3
			// 	})
			// },
			// onChange: function(e) {
			// 	this.old.x = e.detail.x
			// 	this.old.y = e.detail.y
			// },
			// onScale: function(e) {
			// 	this.old.scale = e.detail.scale
			// }
		}
	}
</script>

<style>
	@import "../timetable.css";




</style>

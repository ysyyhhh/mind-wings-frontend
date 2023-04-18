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
		<movable-area scale-area>
			<movable-view direction="all" inertia  @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">

				<!-- 		<view class=""> -->


				<view class="flex text-center page-bg-white margin-bottom-sm">
					<view :style="{width:classWidth+'rpx'}">

						<view class="class-title">
						</view>

						<view :style="{ height: courseHeight + 'rpx'}" v-for="(item, index) in classList" :key="index"
							class="page-bg-primary solid">
							<view>
								<view>{{index+1}}</view>
								<view>{{item.begTime}}</view>
								<view>{{item.endTime}}</view>
							</view>
						</view>
					</view>


					<view class="" v-for="(item, index) in timeList" :key="index" @click="tabSelect" :data-id="index">
						<view class="class-title">
							<view class="" style="color: #B1B1B1;">{{ item.week }}</view>
							<view class="text-bold text-lg time radio-circle"
								:class="index + 1 === week ? 'text-white page-bg-primary radio-circle' : ''">
								{{ item.time }}
							</view>
							<text class="text-gray" style="font-size: 80rpx;line-height: 20rpx;"
								v-if="index + 1 === week">·</text>
						</view>

						<view :style="{width:courseWidth+'rpx'}" v-for="(itemCourse,indexCourse) in courseList">

							<view :style="{ height: (itemCourse.endClass-itemCourse.begClass+1)*courseHeight + 'rpx'}"
								v-if="itemCourse.day == item.time">
								<view :style="{'background-color': itemCourse.color}" class="course">
									{{itemCourse.day}}
								</view>


							</view>
						</view>

					</view>

				</view>


				<!-- <view v-for="(item, index) in list" :key="index" v-if="index + 1 === week" class="flex-sub">
					<view class="" v-for="(items, i) in item" :key="i" v-if="item.length !== 0">
						<view class="cu-card article" :class="isCard ? 'no-card' : ''">
							<view class="cu-item padding-bottom-xs margin-bottom-xs cu-shadow">
								<view class="cu-list menu-avatar">
									<view class="cu-item flex justify-between margin-lr text-xl height-50 ">
										<view class="text-lg">
											<text class="cuIcon-time text-orange"></text>
											<text class="margin-lr-xs text-bold">{{ items.time }}</text>
										</view>
									</view>
								</view>
								<view class="text-lg">
									<view style="height: 60rpx;">
										<text class="title padding-right-unset">课程：</text>
										<text>{{ items.courseName }}</text>
									</view>
									<view>
										<text class="title padding-right-unset">地址：</text>
										<text>{{ items.className }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex justify-center" style="margin-top: 260rpx;">
						<image
							src="./not.png"
							mode=""
							v-if="item.length === 0"
							class=""
							style="width: 100px;
			height: 80px;"
						></image>
					</view>
				</view> -->



			</movable-view>
		</movable-area>
	</view>

</template>

<script>
	import {
		formatDayTime,
		teacherData
	} from './common.js';
	const oneDayTimeStamp = 86400000; // 一天的时间戳
	const now = new Date();
	const todayDayTimeStamp = now.getTime(); //今天的时间戳
	const day = now.getDay();
	const getDay = day === 0 ? 7 : day; // 今天的星期
	const minYChange = 10
	const minXChange = 10
	export default {
		name: 'time-table',
		data() {

			return {
				windowWidth:0,
				windowHeight:0,
				testInfo:"",
				touching : false,
				yGap:0,//计算双指x轴的间隙
				xGap:0,//计算双指x轴的间隙
				courseWidth: 150,
				classWidth: 100,
				courseHeight: 150,
				week: getDay, // 今天的星期
				
				courseList: [{
						color: "#66ccff",

						year: 2022,
						mouth: 3,
						day: 16,
						begClass: 1,
						endClass: 2,
						courseName: "12",
						teacher: "12",
						courseContent: "1212",
						classroom: "1212"
					},
					{
						color: "#66ccff",
						year: 2022,
						mouth: 3,
						day: 16,
						begClass: 1,
						endClass: 2,
						courseName: "12",
						teacher: "12",
						courseContent: "1212",
						classroom: "1212"
					},
					{
						color: "#66ccff",
						year: 2022,
						mouth: 3,
						day: 15,
						begClass: 1,
						endClass: 2,
						courseName: "12",
						teacher: "12",
						courseContent: "1212",
						classroom: "1212"
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

				list: [
					// 一个星期的所有课程
					[{
							time: '10:00',
							courseName: 'js开发',
							className: '广州珠江新城'
						},
						{
							time: '14:30',
							courseName: 'java开发',
							className: '广州珠江新城'
						}
					],
					[],
					[],
					[],
					[{
							time: '16:30',
							courseName: '编程课',
							className: '广州珠江新城'
						},
						{
							time: '10:30',
							courseName: '数据库结构',
							className: '广州珠江新城'
						}
					],
					[],
					[]
				],
				num: 0, // 记录周数，下一周加一，上一周减一, 0:本周
				isCard: false, // 卡片是否铺满全屏
				time: now.toISOString().slice(0, 10),
				mondayDayTimeStamp: 0, // 星期一的时间戳
				sundayDayTimeStamp: 0 // 星期天的时间戳,
			};
		},
		async created() {

			this.thisWeek(); // 一开始进入页面获取本周的课程表
			let _this = this
			uni.getSystemInfo({
			    success: function (res) {
			        // console.log(res.model);
			        // console.log(res.pixelRatio);
			        console.log(res.windowWidth);
					_this.windowHeight = res.windowHeight
					_this.windowWidth = res.windowWidth
			        console.log(res.windowHeight);
			        // console.log(res.language);
			        // console.log(res.version);
			        // console.log(res.platform);
			    }
			});
		},
		methods: {
			touchstart (e){
				// console.log("触摸开始！")
				// console.log(e.touches)
				
				if(e.touches.length >= 2){
					this.touching = true
					// this.testInfo = this.xGap + " | "+this.yGap
					this.xGap = Math.abs(e.touches[0].pageX - e.touches[1].pageX)
					this.yGap = Math.abs(e.touches[0].pageY - e.touches[1].pageY)
				}
			},
			touchmove(e){
				// console.log("触摸移动中！")
				// console.log(e.touches)
				// this.testInfo = e.touches
				if(e.touches.length >= 2 && this.touching == true){

					let nxGap = Math.abs(e.touches[0].pageX - e.touches[1].pageX)
					let nyGap = Math.abs(e.touches[0].pageY - e.touches[1].pageY)
					let xChange = nxGap - this.xGap 
					let yChange = nyGap - this.yGap
					if(Math.abs(xChange) > minXChange && (this.courseWidth + xChange)*(this.timeList.length+1) > this.windowWidth){
						// this.testInfo = (this.courseWidth + xChange)*(this.timeList.length+1)
						// this.testInfo = this.windowWidth
						this.courseWidth = this.courseWidth + xChange
						this.xGap = nxGap
					}
					
					if(Math.abs(yChange) > minYChange && (this.courseHeight + yChange)*(this.classList.length+1) > this.windowHeight){
							this.courseHeight = this.courseHeight + yChange
							this.yGap = nyGap
					}
					
					// this.testInfo = xChange + " | " + yChange
				}
			},
			touchend(e){
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
				// const teacherdata = await teacherData({
				// 	data: {
				// 		startTime: this.mondayDayTimeStamp,
				// 		endTime: this.sundayDayTimeStamp
				// 	}
				// });
				// const { data } = teacherdata.data;
				// this.list = Object.values(data);
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
			tap: function(e) {
				// 解决view层不同步的问题
				this.x = this.old.x
				this.y = this.old.y
				this.$nextTick(function() {
					this.x = 30
					this.y = 30
				})
			},
			tap2() {
				// 解决view层不同步的问题
				this.scale = this.old.scale
				this.scale = this.old.scale
				this.$nextTick(function() {
					this.scale = 3
				})
			},
			onChange: function(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			onScale: function(e) {
				this.old.scale = e.detail.scale
			}
		}
	}
</script>

<style>
	@import "timetable.css";

	.radio-circle {
		border-radius: 100% !important;
	}

	movable-view {
		display: flex;
/* 		align-items: center;
		justify-content: center; */
		height: auto;
		width: auto;
		background-color: #007AFF;
		color: #fff;
	}

	movable-area {
		height: 100%;
		width: 100%;
		/* background-color: #aa00ff; */
		overflow: hidden;
	}
</style>

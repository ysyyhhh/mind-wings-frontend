<template>
	<view>
		<!-- 		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">表单</block>
		</cu-custom> -->

		<form>
			<view class="cu-form-group margin-top">
				<view class="title">页面周数</view>
				<picker @change="weekNumPickerChange" :value="weekNumIndex" :range="weekNumPicker">
					<view class="picker">
						{{weekNum}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">一周天数</view>
				<picker @change="oneWeekNumPickerChange" :value="oneWeekNumIndex" :range="oneWeekNumPicker">
					<view class="picker">
						{{oneWeekNum}}
					</view>
				</picker>
			</view>

			<view class="uni-padding-wrap uni-common-mt margin-top">
				<view class="uni-title margin-top">上下午间隙大小</view>
				<view>
					<slider :value="morningAfternoonGap" @change="gapChange" min="0" max="200" show-value />
				</view>

				<view class="uni-title margin-top">顶部栏高度</view>
				<view>
					<slider :value="weeksHeightInit" @change="weeksHeightChange" min="50" max="200" show-value />
				</view>

				<view class="uni-title margin-top">左侧节宽度</view>
				<view>
					<slider :value="classWidthInit" @change="classWidthChange" min="50" max="200" show-value />
				</view>

				<view class="uni-title margin-top">字体设置
					<view class="uni-title">课程名称</view>
					<view>
						<slider :value="nconfig.size.courseNameSizeDev" @change="courseNameSizeDevChange" min="0" max="30" show-value />
					</view>
					<view class="uni-title">教室</view>
					<view>
						<slider :value="nconfig.size.classroomSizeDev" @change="classroomSizeDevChange" min="0" max="30" show-value />
					</view>

					<view class="uni-title">课程内容</view>

					<view>
						<slider :value="nconfig.size.courseContentSizeDev" @change="courseContentSizeDevChange" min="0" max="30" show-value />
					</view>
					<view class="uni-title">教师</view>
					<view>
						<slider :value="nconfig.size.teacharSizeDev" @change="teacharSizeDevChange" min="0" max="30" show-value />
					</view>
				</view>



				<view style="display: flex; flex-direction: row; margin-top:50rpx; z-index: 1;">


					<view :style="{width:classWidthInit+'rpx',height:(weeksHeightInit*2+morningAfternoonGap )+'rpx',
					top:weeksHeightInit+'rpx'}" class="solid">

						<view v-for="(item,index) in 2" :key="index">
							<view :style="{height: courseHeightInit + 'rpx'}" class="class-one solid">
								<view style="display: flex; flex-direction: column; text-align: center;">

									<view :style="{fontSize:(classFontSize+6)+'rpx',height:(classFontSize+1)+'rpx'}">4
									</view>
									<view :style="{fontSize:(classFontSize+1)+'rpx',height:(classFontSize+2)+'rpx'}"
										class="text-gray">
										11:10
									</view>
									<view :style="{fontSize:(classFontSize+1)+'rpx',height:(classFontSize+2)+'rpx'}"
										class="text-gray">
										11:50
									</view>
								</view>
							</view>
						</view>


						<view :style="{height:morningAfternoonGap+'rpx'}">

						</view>

						<view :style="{height: courseHeightInit + 'rpx'}" class="class-one solid">
							<view style="display: flex; flex-direction: column; text-align: center;">

								<view :style="{fontSize:(classFontSize+6)+'rpx',height:(classFontSize+1)+'rpx'}">5
								</view>
								<view :style="{fontSize:(classFontSize+1)+'rpx',height:(classFontSize+2)+'rpx'}"
									class="text-gray">
									13:40
								</view>
								<view :style="{fontSize:(classFontSize+1)+'rpx',height:(classFontSize+2)+'rpx'}"
									class="text-gray">
									14:20
								</view>
							</view>
						</view>


					</view>

					<view
						style="top:0rpx;display: flex; flex-direction: column; text-align: center; align-items: center;">


						<view
							:style="{height:(weeksHeightInit+courseHeightInit*2)+'rpx',width:(oneWeekNum)*courseWidthInit+'rpx'}"
							class="weeks solid">
							<view :style="{width:courseWidthInit+'rpx'}" v-for="(item, index) in weekList" :key="index"
								v-if="index<=oneWeekNum">

								<view :style="{height: weeksHeightInit+'rpx',
								fontSize:weeksFontSize+'rpx'}" class="flex_col solid" @click="tabSelect" :data-id="index">
									<view style="display: flex;
									flex-direction: column;
									height: 100%;
				justify-content: center;
				align-items: center;">
										<view class="">{{ item.week }}</view>
										<view style="font-weight: 100;">
											{{item.month}}/{{ item.day }}
										</view>
									</view>

								</view>


								<view :style="{
								fontSize:fontSize+'rpx',
								height: (itemCourse.endClass-itemCourse.begClass+1)*courseHeightInit + 'rpx',
								width:(courseWidthInit)+'rpx'
								}">
									<view :style="{'background-color': itemCourse.color,
										}" class="course shadow-blur" @click="showModal(itemCourse)">
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
			<view style="display: flex; height: 200rpx; position: absolute; background-color:#FFFFDD;z-index: 10;">

			</view>
			<view class="padding flex" style="position: fixed;flex-direction: row;
			 bottom:0rpx;	text-align: center;
		align-items: center;
		justify-content: center; width: 100%; z-index: 999;">
				<button class="cu-btn bg-grey lg margin-lr" style="width: 60%;" @click="reDefault">恢复默认</button>
                <button class="cu-btn bg-grey lg margin-lr" style="width: 60%;" @click="logout">退出登录</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fontSize: 20,

				weekNumIndex: -1,
				oneWeekNumIndex: -1,
				weekNumPicker: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				oneWeekNumPicker: [7, 6, 5, 4, 3, 2, 1],
				nconfig: {},
				defaultConfig: {},
				morningAfternoonGap: 0,
				weeksHeightInit: 2,
				classWidthInit: 2,
				courseHeightInit: 150,
				courseWidthInit: 150,
				weekList: [{
						month: 2,
						day: 28,
						week: '周一',
					},
					{
						month: 3,
						day: 1,
						week: '周二'
					},
					{
						month: 3,
						day: 2,
						week: '周三'
					},
					{
						month: 3,
						day: 3,
						week: '周四'
					},
					{
						month: 3,
						day: 4,
						week: '周五'
					},
					{
						month: 3,
						day: 5,
						week: '周六'
					},
					{
						month: 3,
						day: 6,
						week: '周末'
					}
				],
				weeksFontSize: 0,
				classFontSize: 0,
				itemCourse: {
					"color": "",
					"year": 2022,
					"month": 3,
					"day": 15,
					"begClass": 7,
					"endClass": 8,
					"courseName": "医学影像学",
					"teacher": "任苓",
					"courseContent": "妇科、产科超声诊断",
					"classroom": "222大班"
				},
				courseeNameSize: 0,
				courseContentSize: 0,
				classroomSize: 0,
				teacharSize: 0,
				oneWeekNum: 7,
				weekNum: 4,
			};
		},
		methods: {
			logout(){
				uni.showModal({
					title:"是否退出登录",
					icon:"exception",
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.setStorageSync('token','');
							uni.redirectTo({
								url:"../../index/index"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
					fail(e){
						console.log("fail")
						console.log(e)
					}
				})
			},
			onLoad() {
				// this.nconfig = require('../../../static/timetable/config.json')

				try {
					const value = uni.getStorageSync('timetableConfig');
					if (value) {
						this.nconfig = value
						console.log(value);
					} else {
						this.nconfig = require('../../../static/timetable/config.json')
						uni.setStorageSync('timetableConfig', this.nconfig)
					}
				} catch (e) {
					// error
				}

				this.defaultConfig = require('../../../static/timetable/defaultConfig.json')

				this.init()

			},
			init() {


				// console.log(this.weekNumIndex)
				this.weekNum = this.nconfig.config.weekNum
				this.oneWeekNum = this.nconfig.config.oneWeekNum
				this.classWidthInit = this.nconfig.size.classWidthInit
				this.courseHeightInit = this.nconfig.size.courseHeightInit
				this.weeksHeightInit = this.nconfig.size.weeksHeightInit
				this.morningAfternoonGap = this.nconfig.size.morningAfternoonGap
				this.change()
			},
			configStore() {

				this.nconfig.config.weekNum = this.weekNum
				this.nconfig.config.oneWeekNum = this.oneWeekNum
				this.nconfig.size.classWidthInit = this.classWidthInit
				this.nconfig.size.courseHeightInit = this.courseHeightInit
				this.nconfig.size.weeksHeightInit = this.weeksHeightInit
				this.nconfig.size.morningAfternoonGap = this.morningAfternoonGap
				
				
				uni.setStorageSync('timetableConfig', this.nconfig)
			},
			change() {
				this.courseWidthInit = (750 - this.classWidthInit) / (this.oneWeekNum),
				// 	console.log(this.oneWeekNum)
				// console.log(this.classWidthInit)
				this.fontSize = ((this.courseHeightInit / 13 + this.courseWidthInit / 11))
				this.weeksFontSize = ((this.weeksHeightInit / 13 + this.courseWidthInit / 6))
				this.classFontSize = ((this.courseHeightInit / 13 + this.classWidthInit / 7))

				this.courseeNameSize = this.fontSize + this.nconfig.size.courseNameSizeDev
				
				console.log(this.courseeNameSize)
				this.courseContentSize = this.fontSize + this.nconfig.size.courseContentSizeDev
				this.classroomSize = this.fontSize + this.nconfig.size.classroomSizeDev
				this.teacharSize = this.fontSize + this.nconfig.size.teacharSizeDev

				this.configStore()
			},
			weekNumPickerChange(e) {


				this.weekNumIndex = Number(e.detail.value)
				this.weekNum = this.weekNumPicker[this.weekNumIndex]
				this.change()
			},
			oneWeekNumPickerChange(e) {

				this.oneWeekNumIndex = Number(e.detail.value)
				this.oneWeekNum = this.oneWeekNumPicker[this.oneWeekNumIndex]
				this.change()
			},
			gapChange(e) {
				this.morningAfternoonGap = e.detail.value
				this.change()
				// console.log(e.detail)
			},
			weeksHeightChange(e) {
				this.weeksHeightInit = e.detail.value
				this.change()
			},
			classWidthChange(e) {
				this.classWidthInit = e.detail.value
				this.change()
			},
			courseNameSizeDevChange(e){
				console.log(e.detail.value)
				this.nconfig.size.courseNameSizeDev = e.detail.value
				this.change()
			},
			courseContentSizeDevChange(e){
				this.nconfig.size.courseContentSizeDev = e.detail.value
				this.change()
			},
			classroomSizeDevChange(e){
				this.nconfig.size.classroomSizeDev = e.detail.value
				this.change()
			},
			teacharSizeDevChange(e){
				this.nconfig.size.teacharSizeDev = e.detail.value
				this.change()
			},

			reDefault() {
				this.nconfig = this.defaultConfig
				this.init()
			},
		}
	}
</script>

<style>
	@import "../timetable.css";
	@import "../month/month.css";

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.sliderShow {
		width: 200rpx;
	}
</style>

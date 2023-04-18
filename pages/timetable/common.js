	// 时间戳转 yyyy-mm-dd格式
export const formatDayTime = (val) => {
	if (val) {
		let date = new Date(val);
		let Y = date.getFullYear();
		let M = date.getMonth() + 1;
		let D = date.getDate();

		if (M < 10) {
			M = '0' + M;
		}
		if (D < 10) {
			D = '0' + D;
		}

		return Y + '-' + M + '-' + D;
	} else {
		return '';
	}
}


export const formatTime = (val) => {
	if (val) {
		let date = new Date(val);
		let H = date.getHours();
		let M = date.getMinutes();

		if (M < 10) {
			M = '0' + M;
		}
		if (H < 10) {
			H = '0' + H;
		}

		return H + ':' + M;
	} else {
		return '';
	}
}

export const formatTimeS = (val) => {
	if (val) {
		let date = new Date(val);
		let H = date.getHours();
		let M = date.getMinutes();
		let S = date.getSeconds();
		if (M < 10) {
			M = '0' + M;
		}
		if (H < 10) {
			H = '0' + H;
		}
		if(S < 10){
			S = '0' + S;
		}

		return H + ':' + M + ':' + S;
	} else {
		return '';
	}
}


export const preDate = (date,days) => {
	if (date) {
		let preTimeStamp = days*24*3600*1000
		var newDate = new Date(date.getTime() - preTimeStamp)
		return newDate
	} else {
		return date;
	}
}
// 课表
// import http from '@/request-interceptor/interceptor.js'
// import {
// 	wx
// } from '@/api/index.js'

// // 获取老师课程表
// export const teacherData = (data) => {
// 	return http.request({
// 		url: wx + '/course/teacherCourse',
// 		method:'GET',
// 		data:data.data
// 	})
// }

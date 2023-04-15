import request from '@/utils/request.js'

// 小程序登录
export function login(data) {
	return request({
		url: '/api/wx_login/',
		method: 'post',
		data,
	})
}
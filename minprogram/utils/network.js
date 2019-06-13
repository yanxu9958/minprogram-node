import { wxToast, wxLoading } from './loading.js';
export default function callApi({url, params, loading=true,method="POST"}) {
  let baseUrl = 'https://easy-mock.com/mock/5bc94237364160152beb30e7/'
	let initPrm = {
		token: wx.getStorageSync("token")
	};
	for (let item in params) {
		typeof params[item] === 'undefined' && (params[item] = '');
	}
	
	Object.assign(initPrm, params);
	loading && wxLoading();
	return new Promise(function (resolve, reject) {
		wx.request({
			url: baseUrl+url,
			data: initPrm,
			method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			header: {
				
			}, 
			success: function (res) {
				//TODO: logon_failure  登录失败的字段
				wx.hideLoading();
				if (res.data.code == 0) {
					resolve(res.data);
				}else {
					if(res.data.code == 2){
						wx.setStorageSync("token", "");
						wx.reLaunch({
							url: '/pages/index/index'
						})
					}
					wxToast(res.data.message);
					reject(res.data);
				}
			},
			fail: function (res) {
				wx.hideLoading();
				reject(res);
			}
		})
	})
}

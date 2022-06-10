let url = 'http://182.150.116.22:18113/';
let tv_meeting_ctrl_url = url + 'api/room/videoConferenceControl';

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			static_param: {
				// 呼叫功能
				num_list: [
					{ name: '7', type: 7 },
					{ name: '8', type: 8 },
					{ name: '9', type: 9 },
					{ name: '0', type: 10 },
					{ name: '*', type: 11 },
					{ name: '#', type: 12 },
				],
			},
		};
	},
	mounted() {
		if (!location.search) {
			this.loginToken = window.sessionStorage.loginToken;
			this.userName = window.sessionStorage.userName;
			this.device_id = window.sessionStorage.device_id;
		} else {
			this.get_token();
		}
	},
	methods: {
		// 返回首页
		return_home() {
			window.location.href = `../index.html?loginToken=${this.loginToken}&userName=${this.userName}`;
		},
		// 获取地址栏token
		get_token() {
			let temp = location.search.substring(1).split('&');
			temp.forEach((e) => {
				if (e.indexOf('loginToken') != -1) {
					this.loginToken = e.split('=')[1];
					window.sessionStorage.loginToken = this.loginToken;
				} else if (e.indexOf('userName') != -1) {
					this.userName = e.split('=')[1];
					window.sessionStorage.userName = this.userName;
				} else if (e.indexOf('deviceId') != -1) {
					this.device_id = e.split('=')[1];
					window.sessionStorage.device_id = this.device_id;
				}
			});
			let url = location.href.split('?')[0];
			history.replaceState('', '', url);
		},
		request(method, url, data, key, token, func) {
			axios({
				method: method,
				url: url,
				data: {
					client: 'PC',
					user: '',
					version: '1.0.1',
					data: data,
					key: key,
				},
				headers: { token: token },
			}).then((res) => {
				if (res.data.code == 1000) {
					if (res.data.data) {
						func(res);
					} else {
						this.$message.error('数据为空');
					}
				} else {
					this.$alert(res.data.message, '提示', {
						confirmButtonText: '确定',
						callback: () => {
							if (res.data.code == 3005 || res.data.code == 3006) {
								window.location.href = '../login/login.html';
							}
						},
					});
				}
			});
		},
		// 视频会议
		tv_meeting(type) {
			this.request('post', tv_meeting_ctrl_url, { device_id: this.device_id, type: type }, '123456', this.loginToken, () => {});
		},
	},
});

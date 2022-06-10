let url = 'http://182.150.116.22:18113/';
let camera_ctrl_url = url + 'api/room/cameraLocationControl';

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			static_param: {
				camera_list: ['A1', 'A2', 'A3'],
				camera_select: 0, //选中的摄像机位
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
		// 摄像机
		camera_style(index) {
			let style = {
				fontSize: '14px',
				color: this.static_param.camera_select == index ? '#FFFFFF' : '#84D5FE',
			};
			return style;
		},
		camera_ctrl(type) {
			let name = this.static_param.camera_list[this.static_param.camera_select];
			this.request('post', camera_ctrl_url, { device_id: this.device_id, type: type, name: name }, '123456', this.loginToken, (res) => {
				if (res.data.code == 1000) {
					setTimeout(() => {
						this.request('post', camera_ctrl_url, { device_id: this.device_id, type: 4, name: name }, '123456', this.loginToken, () => {});
					}, 1000);
				}
			});
		},
	},
});

let url = 'http://182.150.116.22:18009/';
let alarmDetail = `${url}api/radio/alarmDetail`;
let update = `${url}api/radio/update`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '20210727_140009_1277033880741141',
			static_param: {
				option_selected: 0, //选项卡
				options: ['报警器'],
				is_online: 0, //在线状态
			},
			alarm: {
				name: '', //采集器名称
				status: '', //连接状态
				ip: '', //ip地址
				channelStatus: [], //通道状态
			},
		};
	},
	mounted() {
		// this.request('post', 'http://182.150.116.22:18009/api/user/login', { userName: 'houjie', password: '123456Aa' }, '74935343174538', '123', (res) => {
		// 	this.loginToken = res.data.data.token;
		// 	this.module_select(0);
		// });
		if (!location.search) {
			this.loginToken = window.sessionStorage.loginToken;
			this.userName = window.sessionStorage.userName;
			this.device_id = window.sessionStorage.device_id;
		} else {
			this.get_token();
		}
		this.module_select(0);
	},
	methods: {
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
		// 导航栏选择
		module_select(index) {
			switch (index) {
				case 0:
					this.request('post', alarmDetail, { id: this.device_id }, '74935343174538', this.loginToken, (res) => {
						this.alarm.name = res.data.data.name;
						this.alarm.status = res.data.data.status;
						this.alarm.ip = res.data.data.ip;
						this.alarm.channelStatus = res.data.data.channelStatus;
						this.static_param.option_selected = index;
					});
					break;
			}
		},
		// 状态方格中不足10的补零
		status_num(num) {
			return num < 10 ? `0${num}` : num;
		},
		// 保存设置
		save_set() {
			let reg = /^[a-zA-Z0-9\u4e00-\u9fa5_-]+$/;
			if (reg.test(this.alarm.name)) {
				this.request('post', update, { id: this.device_id, name: this.alarm.name }, '74935343174538', this.loginToken, () => {});
			} else {
				this.$message.error('名称不能为空或除了- _之外的特殊字符');
			}
		},
	},
});

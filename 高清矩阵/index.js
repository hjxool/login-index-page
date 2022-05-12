let url = 'http://182.150.116.22:18113/';
let video_out_url = url + 'api/room/hdMatrixControl';

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			static_param: {
				video_source: ['前摄像头', '左摄像机', '右摄像机', '备用', '视频会议', '无线投屏器', '备用', '备用'],
				video_source_checked: -1,
				video_out: ['LED大屏', '视频会议辅流', '钉钉会议', '视频会议主流'],
				video_out_checked: -1,
			},
		};
	},
	mounted() {
		if (!location.search) {
			this.loginToken = window.sessionStorage.loginToken;
			this.userName = window.sessionStorage.userName;
		} else {
			this.get_token();
		}
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
		// 选择输入信号才能选输出
		video_select(index, flag) {
			if (flag == 'in') {
				this.static_param.video_source_checked = index;
			} else {
				if (this.static_param.video_source_checked != -1) {
					this.static_param.video_out_checked = index;
					this.request('post', video_out_url, { device_id: '0x12345622F955000000000000', input_no: this.static_param.video_source_checked + 1, output_no: this.static_param.video_out_checked + 1 }, '123456', this.loginToken, () => {});
				} else {
					this.$message.warning('请先选择输入信号');
				}
			}
		},
		// 视频
		video_style(index) {
			let style = {
				fontSize: '14px',
				color: this.static_param.video_source_checked == index ? '#FFFFFF' : '#84D5FE',
			};
			return style;
		},
		video_style2(index) {
			let style = {
				fontSize: '14px',
				color: this.static_param.video_out_checked == index ? '#FFFFFF' : '#84D5FE',
			};
			return style;
		},
	},
});

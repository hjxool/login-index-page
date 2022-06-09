new Vue({
	el: '#index',
	data() {
		return {
			temp: {
				switch_status: true,
				timing_main_switch: false,
				num: '',
			},
			static_par: {
				main_option: ['调试', '通道配置'], //选项
				main_option_select: 0, //选中的选项
				setting_list_display: false, //场景列表弹窗
			},
			loginToken: window.sessionStorage.loginToken,
			deviceId: '0x044440000000000000000000',
			detail: {
				is_online: '', //是否在线
				sequence_switch: '', //时序开关状态
				channel_list: [], //通道参数列表
				setting_list: [], //场景配置列表
			},
		};
	},
	mixins: [common_functions],
	mounted() {
		if (!location.search) {
			this.loginToken = window.sessionStorage.loginToken;
			this.userName = window.sessionStorage.userName;
		} else {
			this.get_token();
		}
		this.request('post', timing_detail_url, { device_id: this.deviceId }, '55555', this.loginToken, this.timing_detail);
	},
	methods: {
		// 返回首页
		return_home() {
			window.location.href = `../index.html?loginToken=${this.loginToken}&userName=${this.userName}`;
		},
		// 切换选项卡
		switch_main_option(index) {
			this.static_par.main_option_select = index;
		},
		// 横向滚动
		scroll_x(e) {
			if (e.wheelDelta < 0) {
				e.currentTarget.scrollLeft += 100;
			} else {
				e.currentTarget.scrollLeft -= 100;
			}
		},
		// 验证输入并发送设置延迟命令
		set_delay(obj, string) {
			let reg = /^\d+$/;
			if (string == 'on') {
				if (reg.test(obj.delay_on)) {
					this.request('post', push_set_delay_url, { device_id: this.deviceId, channel_no: obj.channel_no, delay_on: obj.delay_on }, '123456', this.loginToken, () => {});
				} else {
					this.$message.error('只能输入整数数字');
				}
			} else {
				if (reg.test(obj.delay_off)) {
					this.request('post', push_set_delay_url, { device_id: this.deviceId, channel_no: obj.channel_no, delay_off: obj.delay_off }, '123456', this.loginToken, () => {});
				} else {
					this.$message.error('只能输入整数数字');
				}
			}
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
		// 时序器详情
		timing_detail(res) {
			console.log(res);
			this.detail.is_online = res.data.data.isOnline;
			this.detail.sequence_switch = res.data.data.sequence_switch;
			this.detail.channel_list = res.data.data.channel;
		},
		// 切换通道状态开关
		channel_switch_status(channel) {
			switch (channel.status) {
				case 0:
					channel.status = 1;
					break;
				case 1:
					channel.status = 0;
					break;
			}
			this.request('post', push_channel_switch_url, { device_id: this.deviceId, channel_no: channel.channel_no, status: channel.status }, '123456', this.loginToken, () => {});
		},
		// 时序开关按钮
		sequence_switch_button() {
			switch (this.detail.sequence_switch) {
				case 0:
					this.detail.sequence_switch = 1;
					break;
				case 1:
					this.detail.sequence_switch = 0;
					break;
			}
			this.request('post', push_sequence_switch_url, { device_id: this.deviceId, sequence_switch: this.detail.sequence_switch }, '55555', this.loginToken, () => {
				if (this.detail.sequence_switch == 0) {
					this.detail.channel_list.forEach((element) => {
						setTimeout(() => {
							element.status = 0;
						}, element.delay_off * 1000);
					});
				} else {
					this.detail.channel_list.forEach((element) => {
						setTimeout(() => {
							element.status = 1;
						}, element.delay_on * 1000);
					});
				}
			});
		},
		// 场景列表加载
		res_setting_list(e) {
			this.request('post', setting_list_url, { device_id: this.deviceId }, '123456', this.loginToken, (res) => {
				this.detail.setting_list = res.data.data;
				this.detail.setting_list.forEach((obj) => {
					this.$set(obj, 'input_display', false);
				});
			});
			let dom = e.currentTarget;
			dom.firstChild.src = './img/大按钮2变色.png';
			dom.onmouseup = () => {
				dom.firstChild.src = './img/大按钮2.png';
				this.static_par.setting_list_display = true;
			};
		},
		// 加载到指定场景
		loading_setting(obj) {
			this.request('post', loading_setting_url, { device_id: this.deviceId, scene_no: obj.scene_no }, '123456', this.loginToken, () => {
				this.request('post', timing_detail_url, { device_id: this.deviceId }, '55555', this.loginToken, this.timing_detail);
				this.static_par.setting_list_display = false;
			});
		},
		// 编辑场景名称
		edit_setting_name(obj) {
			this.request('post', edit_setting_name_url, { device_id: this.deviceId, scene_no: obj.scene_no, scene_name: obj.scene_name }, '123456', this.loginToken, () => {
				this.$message.success('修改成功');
			});
			obj.input_display = false;
		},
		// 保存到指定场景
		save_setting(obj) {
			this.request('post', save_setting_url, { device_id: this.deviceId, scene_no: obj.scene_no, scene_name: obj.scene_name }, '123456', this.loginToken, () => {
				this.$message.success('修改成功');
			});
		},
	},
	directives: {
		focus: {
			update(e, obj) {
				e.focus();
			},
		},
	},
});

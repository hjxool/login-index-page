new Vue({
	el: '#index',
	data() {
		return {
			static_par: {
				main_option: ['调试', '通道配置'], //选项
				main_option_select: 0, //选中的选项
				setting_list_display: false, //场景列表弹窗
			},
			loginToken: window.sessionStorage.loginToken,
			deviceId: '20210628_141157_2446121203218804',
			ws: {}, //websocket对象
			detail: {
				is_online: '', //是否在线
				sequence_switch: '', //时序开关状态
				channel_list: [], //通道参数列表
				setting_list: [], //场景配置列表
				voltage: '', //电压
			},
		};
	},
	mounted() {
		if (window.sessionStorage.loginToken) {
			this.loginToken = window.sessionStorage.loginToken;
		} else {
			this.get_token();
		}
		this.request('post', timing_detail_url, { device_id: this.deviceId }, '55555', this.loginToken, this.timing_detail);
		this.ws = new WebSocket(timing_detail_ws + this.deviceId);
		this.ws.onmessage = (res) => {
			console.log(res);
			let data = JSON.parse(res.data);
			this.detail.voltage = data.voltage;
		};
		this.ws.onclose = () => {
			alert('服务器断开');
		};
	},
	methods: {
		// 获取地址栏token
		get_token() {
			let tempurl = window.location.search;
			this.loginToken = tempurl.substring(1).split('&')[0].split('=')[1];
			let str = location.href.split('?')[0];
			window.history.replaceState('', '', str);
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
		set_delay(obj) {
			let reg = /^\d+$/;
			if (reg.test(obj.delay)) {
				let channels = [];
				this.detail.channel_list.forEach((element) => {
					let t_obj = {};
					t_obj.channel_no = element.channel_no;
					t_obj.delay = element.delay;
					channels.push(t_obj);
				});
				this.request('post', push_set_delay_url, { device_id: this.deviceId, channels: channels }, '123456', this.loginToken, () => {});
			} else {
				this.$message.error('只能输入整数数字');
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
								window.location.href = './login.html';
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
			// this.detail.voltage = res.data.data.voltage;
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
			this.request('post', push_sequence_switch_url, { device_id: this.deviceId, sequence_switch: this.detail.sequence_switch }, '55555', this.loginToken, () => {});
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

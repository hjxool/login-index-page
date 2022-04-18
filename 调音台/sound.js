let url = 'http://192.168.30.66:18113/';
let sound_url = url + 'api/dm/channelDetail';
let sound_control_url = url + 'api/dm/sendInstruction';

let sound = new Vue({
	el: '#sound',
	data: {
		loginToken: '', //保存跳转token
		deviceId: '', //保存跳转查询设备ID
		detail: {
			channel_in: [], //输入通道
			channel_out: [], //输出通道
			is_online: 0, //在线状态
			channel_public: [], //公共通道
		},
		static_params: {
			input_max: 12, //输入通道最大最小值
			input_min: -56,
		},
	},
	mounted() {
		this.temp();
		this.loginToken = window.sessionStorage.loginToken;
		this.deviceId = '0x022222222200000000000000';
		this.request('post', sound_url, { device_id: this.deviceId }, '74935343174538', this.loginToken, this.sound_console_detail);
	},
	methods: {
		// 获取地址栏token
		temp() {
			let tempurl = window.location.search;
			this.loginToken = tempurl.substring(1).split('&')[0].split('=')[1];
			let str = location.href.split('?')[0];
			window.history.replaceState('', '', str);
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
		// 设备详情
		sound_console_detail(res) {
			console.log(res);
			this.detail.channel_in = res.data.data.channels_input;
			this.detail.channel_out = res.data.data.channels_output;
			this.detail.channel_public = res.data.data.channels_public;
			this.detail.is_online = res.data.data.isOnline;
			// 构造添加临时变量
			this.detail.channel_in.forEach((element) => {
				this.$set(element, 'temp', element.gain);
			});
			this.detail.channel_out.forEach((element) => {
				this.$set(element, 'temp', element.gain);
			});
			this.detail.channel_public.forEach((element) => {
				this.$set(element, 'temp', element.gain);
			});
		},
		// 改变滑块高度
		change_cover_height(val) {
			let temp = (val - this.static_params.input_min) / (this.static_params.input_max - this.static_params.input_min);
			return `height:${temp * 100}%;`;
		},
		change_slider_bottom(val) {
			let temp = (val - this.static_params.input_min) / (this.static_params.input_max - this.static_params.input_min);
			return `bottom:calc(${temp * 100}% - 15px);`;
		},
		// 控制命令
		common_control(...obj) {
			let channels = [];
			obj.forEach((element) => {
				channels.push(element);
			});
			this.request('post', sound_control_url, { device_id: this.deviceId, channels: channels }, '123456', this.loginToken, () => {});
		},
		// 特殊通道同时控制
		special_channel_control(obj) {
			if ((obj.channel_name == 'IN9') | (obj.channel_name == 'IN11')) {
				this.detail.channel_in[obj.channel_no].gain = this.detail.channel_in[obj.channel_no].temp = obj.temp;
				this.common_control(obj, this.detail.channel_in[obj.channel_no]);
			} else if (obj.channel_name == 'Bus1') {
				this.detail.channel_out[obj.channel_no].gain = this.detail.channel_out[obj.channel_no].temp = obj.temp;
				this.common_control(obj, this.detail.channel_out[obj.channel_no]);
			} else if ((obj.channel_name == 'IN10') | (obj.channel_name == 'IN12')) {
				this.detail.channel_in[obj.channel_no - 2].gain = this.detail.channel_in[obj.channel_no - 2].temp = obj.temp;
				this.common_control(obj, this.detail.channel_in[obj.channel_no - 2]);
			} else if (obj.channel_name == 'Bus2') {
				this.detail.channel_out[obj.channel_no - 2].gain = this.detail.channel_out[obj.channel_no - 2].temp = obj.temp;
				this.common_control(obj, this.detail.channel_out[obj.channel_no - 2]);
			} else {
				this.common_control(obj);
			}
		},
		// 反相按钮
		reverse_button(obj) {
			if (obj.reverse_phase == 0) {
				obj.reverse_phase = 1;
			} else {
				obj.reverse_phase = 0;
			}
			this.common_control(obj);
		},
		// 静音按钮
		mute_button(obj) {
			if (obj.mute == 0) {
				obj.mute = 1;
			} else {
				obj.mute = 0;
			}
			this.common_control(obj);
		},
		// 增益控制
		gain_control(obj) {
			let reg = /(^\-?\d+$)|(^\+?\d+$)|(^\-?\d+\.\d{1}$)|(^\+?\d+\.\d{1}$)/;
			if (reg.test(obj.temp)) {
				if (obj.temp < this.static_params.input_min) {
					obj.temp = this.static_params.input_min;
				} else if (obj.temp > this.static_params.input_max) {
					obj.temp = this.static_params.input_max;
				} else {
					obj.temp = Math.floor(obj.temp * 10 + 0.5) / 10;
				}
				obj.gain = obj.temp;
				this.special_channel_control(obj);
			}
		},
		// 滑块控制
		slider_turn_to(e, obj) {
			let dom = e.currentTarget;
			let height = dom.offsetHeight - (e.clientY - Math.ceil(dom.getBoundingClientRect().top));
			if (height < 0) {
				height = 0;
			} else if (height > dom.offsetHeight) {
				height = dom.offsetHeight;
			}
			height = (height / dom.offsetHeight) * (this.static_params.input_max - this.static_params.input_min) + this.static_params.input_min;
			height = Math.floor(height * 10 + 0.5) / 10;
			obj.gain = obj.temp = height;
			this.special_channel_control(obj);
		},
		slider_move(e, obj) {
			let parent_dom = e.currentTarget.parentNode;
			let height;
			let client_top = Math.ceil(parent_dom.getBoundingClientRect().top);
			let total_height = parent_dom.offsetHeight;
			document.onmousemove = (event) => {
				height = total_height - (event.clientY - client_top);
				if (height < 0) {
					height = 0;
				} else if (height > total_height) {
					height = total_height;
				}
				height = (height / total_height) * (this.static_params.input_max - this.static_params.input_min) + this.static_params.input_min;
				height = Math.floor(height * 10 + 0.5) / 10;
				obj.gain = obj.temp = height;
				if ((obj.channel_name == 'IN9') | (obj.channel_name == 'IN11')) {
					this.detail.channel_in[obj.channel_no].gain = this.detail.channel_in[obj.channel_no].temp = height;
				} else if (obj.channel_name == 'Bus1') {
					this.detail.channel_out[obj.channel_no].gain = this.detail.channel_out[obj.channel_no].temp = height;
				} else if ((obj.channel_name == 'IN10') | (obj.channel_name == 'IN12')) {
					this.detail.channel_in[obj.channel_no - 2].gain = this.detail.channel_in[obj.channel_no - 2].temp = height;
				} else if (obj.channel_name == 'Bus2') {
					this.detail.channel_out[obj.channel_no - 2].gain = this.detail.channel_out[obj.channel_no - 2].temp = height;
				}
			};
			document.onmouseup = () => {
				this.special_channel_control(obj);
				document.onmousemove = false;
			};
		},
		// 通用 横线滚动
		scroll_x(e) {
			if (e.wheelDelta < 0) {
				e.currentTarget.scrollLeft += 100;
			} else {
				e.currentTarget.scrollLeft -= 100;
			}
		},
	},
});

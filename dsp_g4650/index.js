let url = 'http://182.150.116.22:18113/';
let channelDetail = `${url}api/dsp/channelDetail`;
let powerControl = `${url}api/dsp/powerControl`;
let channelControl = `${url}api/dsp/channelControl`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '0x066666666666000000000000',
			static_param: {
				options: ['状态显示', '通道控制'], //导航栏
				option_selected: 0, //导航栏模块显示
				input_max: 18, //输入最大值
				input_min: -80,
			},
			channel_ctrl: {
				is_online: -1, //设备在线状态
				list: [],
				power_temperature: '', //电源温度
				power_status: -1, //电源开关
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
		this.module_select(0);
	},
	methods: {
		// 导航栏选择
		module_select(index) {
			switch (index) {
				case 0:
					this.request(
						'post',
						channelDetail,
						{
							device_id: this.device_id,
						},
						'123456',
						this.loginToken,
						(res) => {
							this.channel_ctrl.list = res.data.data.channels;
							this.channel_ctrl.is_online = res.data.data.isOnline;
							this.channel_ctrl.power_temperature = this.channel_ctrl.list[0].power_temperature;
							this.channel_ctrl.power_status = this.channel_ctrl.list[0].power_status;
							this.static_param.option_selected = index;
						}
					);
					break;
				case 1:
					this.static_param.option_selected = index;
					break;
			}
		},
		// 横向滚动
		scroll_x(e) {
			e.wheelDelta > 0 ? (e.currentTarget.scrollLeft -= 100) : (e.currentTarget.scrollLeft += 100);
		},
		// 电源开关
		power_ctrl() {
			this.request(
				'post',
				powerControl,
				{
					device_id: this.device_id,
					power_status: this.channel_ctrl.power_status == 0 ? 1 : 0,
				},
				'123456',
				this.loginToken,
				() => {
					this.channel_ctrl.power_status = this.channel_ctrl.power_status == 0 ? 1 : 0;
				}
			);
		},
		// 静音
		mute_button(obj) {
			this.request(
				'post',
				channelControl,
				{
					device_id: this.device_id,
					channel_no: obj.channel_no,
					channel_mute: obj.channel_mute == 0 ? 1 : 0,
				},
				'123456',
				this.loginToken,
				() => {
					obj.channel_mute = obj.channel_mute == 0 ? 1 : 0;
				}
			);
		},
		// 滑块
		slider_move(e, obj) {
			let parent_dom = e.currentTarget.parentNode;
			let total_height = parent_dom.offsetHeight;
			let client_top = Math.ceil(parent_dom.getBoundingClientRect().top);
			document.onmousemove = (event) => {
				let height = total_height - (event.clientY - client_top);
				if (height < 0) {
					height = 0;
				} else if (height > total_height) {
					height = total_height;
				}
				height = (height / total_height) * (this.static_param.input_max - this.static_param.input_min) + this.static_param.input_min;
				height = Math.floor(height * 10 + 0.5) / 10;
				obj.channel_gain = height;
			};
			document.onmouseup = () => {
				this.request(
					'post',
					channelControl,
					{
						device_id: this.device_id,
						channel_no: obj.channel_no,
						channel_gain: obj.channel_gain,
					},
					'123456',
					this.loginToken,
					() => {}
				);
				document.onmousemove = null;
				document.onmouseup = null;
			};
		},
		// 滑块样式
		change_cover_height(value) {
			if (value > this.static_param.input_max) {
				value = this.static_param.input_max;
			} else if (value < this.static_param.input_min) {
				value = this.static_param.input_min;
			}
			let temp = (value - this.static_param.input_min) / (this.static_param.input_max - this.static_param.input_min);
			return `height:${temp * 100}%`;
		},
		change_slider_bottom(value) {
			if (value > this.static_param.input_max) {
				value = this.static_param.input_max;
			} else if (value < this.static_param.input_min) {
				value = this.static_param.input_min;
			}
			let temp = (value - this.static_param.input_min) / (this.static_param.input_max - this.static_param.input_min);
			return `bottom:calc(${temp * 100}% - 18px)`;
		},
	},
});

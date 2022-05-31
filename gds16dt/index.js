let url = 'http://182.150.116.22:18113/';
let channelDetail = `${url}api/gds16dt/channelDetail`;
let channelControl = `${url}api/gds16dt/channelControl`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '0x161611111111000000000000',
			static_param: {
				options: [''], //导航栏
				option_selected: 0, //导航栏模块显示
				input_max: 48, //输入最大值
				input_min: -48,
			},
			channel_ctrl: {
				is_online: -1, //设备在线状态
				input_list: [],
				output_list: [],
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
							this.channel_ctrl.input_list = res.data.data.channels_input;
							this.channel_ctrl.output_list = res.data.data.channels_output;
							this.channel_ctrl.is_online = res.data.data.isOnline;
							this.static_param.option_selected = index;
						}
					);
					break;
			}
		},
		// 横向滚动
		scroll_x(e) {
			e.wheelDelta > 0 ? (e.currentTarget.scrollLeft -= 100) : (e.currentTarget.scrollLeft += 100);
		},
		// 静音
		mute_button(obj, tag) {
			let isInput = tag == 'input' ? 1 : 0;
			this.request(
				'post',
				channelControl,
				{
					device_id: this.device_id,
					channel_no: obj.channel_no,
					isInput: isInput,
					mute: obj.mute == 0 ? 1 : 0,
				},
				'123456',
				this.loginToken,
				() => {
					obj.mute = obj.mute == 0 ? 1 : 0;
				}
			);
		},
		// 反相
		reverse_button(obj, tag) {
			let isInput = tag == 'input' ? 1 : 0;
			this.request(
				'post',
				channelControl,
				{
					device_id: this.device_id,
					channel_no: obj.channel_no,
					isInput: isInput,
					reverse_phase: obj.reverse_phase == 0 ? 1 : 0,
				},
				'123456',
				this.loginToken,
				() => {
					obj.reverse_phase = obj.reverse_phase == 0 ? 1 : 0;
				}
			);
		},
		// 滑块
		slider_move(e, obj, tag) {
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
				obj.gain = height;
			};
			document.onmouseup = () => {
				let isInput = tag == 'input' ? 1 : 0;
				this.request(
					'post',
					channelControl,
					{
						device_id: this.device_id,
						channel_no: obj.channel_no,
						isInput: isInput,
						gain: obj.gain,
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

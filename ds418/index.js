let url = 'http://182.150.116.22:18113/';
let channelDetail = `${url}api/ds/channelDetail`;
let channelControl = `${url}api/ds/channelControl`;
let programControl = `${url}api/ds/programControl`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '0x418E00000000000000000000',
			static_param: {
				options: ['通道', 'program'], //导航栏
				option_selected: 0, //导航栏模块显示
				input_max: 12, //输入最大值
				input_min: -12,
			},
			channel_ctrl: {
				is_online: -1, //设备在线状态
				list: [],
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
		// 音量控制
		volume_ctrl(obj, tag) {
			if (tag === 'mute') {
				this.request('post', channelControl, { device_id: this.device_id, channel_no: obj.channel_no, type: obj.mute == 0 ? 3 : 4 }, '123456', this.loginToken, () => {
					obj.mute = obj.mute == 0 ? 1 : 0;
				});
			} else {
				this.request('post', channelControl, { device_id: this.device_id, channel_no: obj.channel_no, type: tag }, '123456', this.loginToken, () => {});
			}
		},
		// program控制
		program_ctrl(tag) {
			this.request('post', programControl, { device_id: this.device_id, type: tag }, '123456', this.loginToken, () => {});
		},
	},
});

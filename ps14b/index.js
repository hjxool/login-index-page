let url = 'http://182.150.116.22:18113/';
let channelDetail = `${url}api/ps14b/channelDetail`;
let channelControl = `${url}api/ps14b/channelControl`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '20220422_101019_4322084284051468',
			static_param: {
				options: [''], //导航栏
				option_selected: 0, //导航栏模块显示
				input_max: 12, //输入最大值
				input_min: -12,
			},
			channel_ctrl: {
				channel_list: [], //通道信息
				is_online: -1, //设备在线状态
			},
		};
	},
	mixins: [common_functions],
	mounted() {
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
		// 返回首页
		return_home() {
			window.location.href = `../index.html?loginToken=${this.loginToken}&userName=${this.userName}`;
		},
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
							this.channel_ctrl.channel_list = res.data.data.channels;
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
		// 切换通道状态开关
		channel_switch_status(channel) {
			channel.channel_status = channel.channel_status == 0 ? 1 : 0;
			this.request('post', channelControl, { device_id: this.device_id, channel_no: channel.channel_no }, '123456', this.loginToken, () => {});
		},
		// 通道全开全关
		channel_ctrl_all(e, tag) {
			let dom = e.currentTarget;
			dom.firstChild.src = './img/大按钮2变色.png';
			dom.onmouseup = () => {
				dom.firstChild.src = './img/大按钮2.png';
				dom.onmouseup = null;
			};
			this.request('post', channelControl, { device_id: this.device_id, channel_no: tag }, '123456', this.loginToken, () => {
				this.module_select(0);
			});
		},
	},
});

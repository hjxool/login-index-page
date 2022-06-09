let url = 'http://182.150.116.22:18113/';
let ah215fOperation = `${url}api/newRoom/ah215fOperation`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '0x12345622F955000000000000',
			static_param: {
				options: ['控制'], //导航栏
				option_selected: 0, //导航栏模块显示
				//设备列表
				device_list: [
					{ name: '话筒1', add_tag: 7, de_tag: 11 },
					{ name: '话筒2', add_tag: 8, de_tag: 12 },
					{ name: '话筒3', add_tag: 9, de_tag: 13 },
					{ name: '话筒4', add_tag: 10, de_tag: 14 },
				],
			},
			device_ctrl: {
				is_online: -1, //设备在线状态
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
			this.static_param.option_selected = index;
			// switch (index) {
			// 	case 0:
			// 		this.request(
			// 			'post',
			// 			channelDetail,
			// 			{
			// 				device_id: this.device_id,
			// 			},
			// 			'123456',
			// 			this.loginToken,
			// 			(res) => {
			// 				this.channel_ctrl.is_online = res.data.data.isOnline;
			// 				this.static_param.option_selected = index;
			// 			}
			// 		);
			// 		break;
			// }
		},
		// 横向滚动
		scroll_x(e) {
			e.wheelDelta > 0 ? (e.currentTarget.scrollLeft -= 100) : (e.currentTarget.scrollLeft += 100);
		},
		// 按钮指令
		ctrl_button(tag) {
			this.request(
				'post',
				ah215fOperation,
				{
					device_id: this.device_id,
					type: tag,
				},
				'123456',
				this.loginToken,
				() => {}
			);
		},
		// 返回首页
		return_home() {
			window.location.href = `../index.html?loginToken=${this.loginToken}&userName=${this.userName}`;
		},
	},
});

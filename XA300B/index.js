let url = 'http://182.150.116.22:18113/';
let xa300bOperation = `${url}api/newRoom/xa300bOperation`;

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
					{ name: '话筒1', add_tag: 11, de_tag: 12, mute_tag: 3 },
					{ name: '话筒2', add_tag: 13, de_tag: 14, mute_tag: 4 },
					{ name: '话筒', add_tag: 9, de_tag: 10, mute_tag: 6 },
					{ name: '线路', add_tag: 15, de_tag: 16, mute_tag: 5 },
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
				xa300bOperation,
				{
					device_id: this.device_id,
					type: tag,
				},
				'123456',
				this.loginToken,
				() => {}
			);
		},
	},
});

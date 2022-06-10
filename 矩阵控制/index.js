let url = 'http://182.150.116.22:18113/';
let unitControl = `${url}api/newRoom/unitControl`;
let channelSelection = `${url}api/newRoom/channelSelection`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '0x12345622F955000000000000',
			static_param: {
				options: ['矩阵', '预设'], //导航栏
				option_selected: 0, //导航栏模块显示
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
		// 矩阵控制
		ctrl_rect(row, col, input) {
			this.request(
				'post',
				channelSelection,
				{
					device_id: this.device_id,
					output_no: row + 1,
					input_no: col + 1,
				},
				'123456',
				this.loginToken,
				() => {}
			);
		},
		// 单元控制
		unit_ctrl(index, tag) {
			this.request(
				'post',
				unitControl,
				{
					device_id: this.device_id,
					unitNo: index,
					type: tag,
				},
				'123456',
				this.loginToken,
				() => {}
			);
		},
	},
});

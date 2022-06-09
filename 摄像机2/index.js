let url = 'http://182.150.116.22:18113/';
let cameraControl = `${url}api/newRoom/cameraControl`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '0x12345622F955000000000000',
			static_param: {
				options: [''], //导航栏
				option_selected: 0, //导航栏模块显示
				camera_list: ['A1', 'A2', 'A3'],
				camera_select: 0, //选中的摄像机位
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
		// 摄像机
		camera_style(index) {
			let style = {
				fontSize: '14px',
				color: this.static_param.camera_select == index ? '#FFFFFF' : '#84D5FE',
			};
			return style;
		},
		camera_ctrl(type) {
			// let name = this.static_param.camera_list[this.static_param.camera_select];
			this.request(
				'post',
				cameraControl,
				{
					device_id: this.device_id,
					type: type,
					// name: name,
				},
				'123456',
				this.loginToken,
				(res) => {}
			);
		},
	},
});

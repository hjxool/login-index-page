let url = 'http://182.150.116.22:18113/';
let modeSelection = `${url}api/newRoom/modeSelection`;
let chooseUnit = `${url}api/newRoom/chooseUnit`;
let closeAll = `${url}api/newRoom/closeAll`;
let unitPower = `${url}api/newRoom/unitPower`;
let chairmanUnit = `${url}api/newRoom/chairmanUnit`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '0x12345622F955000000000000',
			static_param: {
				options: ['发言模式', '指定发言', '开关机'], //导航栏
				option_selected: 0, //导航栏模块显示
				input_max: 12, //输入最大值
				input_min: -12,
				// 发言模式
				speak_module: ['轮替模式', '限制模式', '自由模式'],
				speak_module_selected: 0, //发言模式选中
			},
			device_ctrl: {
				is_online: 0, //在线状态
				speak_num: 0, //限制话筒数量
				ID_set: '', //指定话筒ID
				ID_set2: '', //普通单元开关机指定ID
				info: {
					status: 0, //连接状态 0未连接 1连接
					ip: '192.168.33.6', //ip地址
					name: '', //设备名称
				},
			},
		};
	},
	mixins: [common_functions],
	mounted() {
		// 临时自动登陆获取token
		this.request(
			'post',
			'http://182.150.116.22:18009/api/user/login',
			{
				userName: 'libo',
				password: '123456Aa',
			},
			'74935343174538',
			this.loginToken,
			(res) => {
				this.loginToken = res.data.data.token;
				this.userName = 'libo';
				this.module_select(0);
			}
		);
		if (!location.search) {
			this.loginToken = window.sessionStorage.loginToken;
			this.userName = window.sessionStorage.userName;
		} else {
			this.get_token();
		}
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
		// 限制发言人数
		speak_limit(value) {
			this.request(
				'post',
				modeSelection,
				{
					device_id: this.device_id,
					type: this.static_param.speak_module_selected,
					people_num: value,
				},
				'123456',
				this.loginToken,
				() => {}
			);
		},
		// 模式选中样式
		option_class(index) {
			let style = ['option', 'flex_shrink', this.static_param.speak_module_selected == index ? 'option_selected' : ''];
			return style;
		},
		// 模式选择
		select_module(index) {
			this.static_param.speak_module_selected = index;
			let params = {
				device_id: this.device_id,
				type: index,
			};
			if (index != 2) {
				if (this.device_ctrl.speak_num == -1) {
					this.$message.info('限制人数不能为0');
				} else {
					params.people_num = this.device_ctrl.speak_num;
				}
			}
			this.request('post', modeSelection, params, '123456', this.loginToken, () => {});
		},
		// 验证输入
		verify_input(val) {
			let reg = /(^[1-9]{1}$)|(^10$)/;
			if (!reg.test(val)) {
				this.$message.error('只能输入1到10的整数');
			}
		},
		// 指定发言
		assign_button(status) {
			this.request(
				'post',
				chooseUnit,
				{
					device_id: this.device_id,
					unit_no: this.device_ctrl.ID_set,
					status: status,
				},
				'123456',
				this.loginToken,
				() => {}
			);
		},
		// 禁言全部
		ban_all_button() {
			this.request(
				'post',
				closeAll,
				{
					device_id: this.device_id,
				},
				'123456',
				this.loginToken,
				() => {}
			);
		},
		// 开启关闭
		close_open_button(status) {
			this.request(
				'post',
				unitPower,
				{
					device_id: this.device_id,
					unit_no: this.device_ctrl.ID_set2,
					status: status,
				},
				'123456',
				this.loginToken,
				() => {}
			);
		},
		// 主席位按钮
		primary_button(index) {
			this.request(
				'post',
				chairmanUnit,
				{
					device_id: this.device_id,
					type: index,
				},
				'123456',
				this.loginToken,
				() => {}
			);
		},
	},
});

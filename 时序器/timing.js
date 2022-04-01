new Vue({
	el: '#index',
	data() {
		return {
			temp: {
				switch_status: true,
				timing_main_switch: false,
				num: '',
			},
			static_par: {
				main_option: ['调试', '定时任务', '系统设置'], //选项
				main_option_select: 0, //选中的选项
				timing_on_off: false,
			},
		};
	},
	methods: {
		// 切换选项卡
		switch_main_option(index) {
			this.static_par.main_option_select = index;
		},
		// 横向滚动
		scroll_x(e) {
			if (e.wheelDelta < 0) {
				e.currentTarget.scrollLeft += 100;
			} else {
				e.currentTarget.scrollLeft -= 100;
			}
		},
		// 验证输入并发送命令
		verify_input(value) {
			let reg = /^\d*$/;
			if (reg.test(value)) {
			} else {
				this.$message.error('只能输入整数数字');
			}
		},
	},
});

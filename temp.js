new Vue({
	el: '#temp',
	data() {
		return {
			sound_item_options: [
				{ name: '功放参数', light_icon: './img/功放icon亮.png', dark_icon: './img/功放icon暗.png' },
				{ name: 'DSP参数', light_icon: './img/dsp参数亮.png', dark_icon: './img/dsp参数暗.png' },
				{ name: '系统功能', light_icon: './img/系统功能亮.png', dark_icon: './img/系统功能暗.png' },
			],
			option_focus: 0,
			dsp_option: {
				channel1: {
					digitalgain: -12,
					hz: 100,
				},
				channel2: {
					gain: -30,
				},
				output: [
					{ dynamic: false, mute: false },
					{ dynamic: true, mute: true },
				],
			},
			sys_option: {
				status: [
					{ dsp: 0, amplify: 0, sound: 0 },
					{ dsp: 0, amplify: 0, sound: 1 },
				],
				set_time: {
					day: true,
					week: false,
					month: false,
				},
				weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'],
			},
		};
	},
	methods: {
		option_style(index) {
			let style = {
				background: this.option_focus == index ? '#1431a0' : 'rgba(32, 44, 92, 0.48)',
				border: this.option_focus == index ? '' : '1px solid #1B59CA',
				boxShadow: this.option_focus == index ? '' : '0px 0px 65px 0px rgba(4, 15, 51, 0.8)',
			};
			return style;
		},
	},
});

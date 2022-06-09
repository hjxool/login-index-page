new Vue({
	el: '#temp',
	data() {
		return {
			loginToken: '',
			device_id: '20220331_141135_6623415100445969',
			channel_num: 2, //通道数
			// 总选项卡
			sound_item_options: [
				{ name: '功放参数', light_icon: './img/功放icon亮.png', dark_icon: './img/功放icon暗.png' },
				{ name: 'DSP参数', light_icon: './img/dsp参数亮.png', dark_icon: './img/dsp参数暗.png' },
				{ name: '系统功能', light_icon: './img/系统功能亮.png', dark_icon: './img/系统功能暗.png' },
			],
			option_focus: 0, //总选项卡选中
			// DSP参数
			dsp_option: {
				input: [],
				output: [],
				geq_list: [], //geq通道列表
				geq_title_list: ['60Hz', '230Hz', '910Hz', '4000Hz', '14000Hz'], //geq通道名称
				output1LimitTh: '+20', //输出通道1压限上限
				output2LimitTh: '+20', //输出通道2压限上限
				limit1_flag: false, //压限打开时轮询标识
				limit2_flag: false,
			},
			// 系统功能参数
			sys_option: {
				status: [], //通道状态
				power_value: '', //电源电压
				select_time: -1, //选择是天 周 月其一
				select_week: -1, //选择一周中的某天
				select_month: -1, //选择一月中的某天
				weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'],
				day_time: {}, //当天时间
				check_ststus: 0, //自检开关状态
			},
			history: {
				history_data_option: 0, //查询历史数据选项
				history_option: ['电压', '电流', '功率', '温度'], //历史记录选项
				output1: {
					// timeList: [], //横轴时间间隔，但不显示
					// currentList: [], //纵轴电流值
					// voltageList: [], //电压
					// powerList: [], //功率
					// temperatureList: [], //温度
					// y_data: [], //Y轴数据是动态的 根据选项卡切换
				},
				output2: {},
				data_null: false,
				history_day: '',
				display_title: '', //不同选项提示框不同
				display_unit: '',
			},
		};
	},
	mounted() {
		if (!location.search) {
			this.loginToken = window.sessionStorage.loginToken;
			this.userName = window.sessionStorage.userName;
		} else {
			this.get_token();
		}
		// 第一次加载echart页面时才初始化echart对象
		this.first_load = true;
		// echart设置
		let dom = document.getElementsByClassName('history_echart');
		for (let i = 0; i < this.channel_num; i++) {
			this[`echarts${i}`] = echarts.init(dom[i]); //动态创建对象属性并赋值
		}
		this.res_history();
		this.history_timer = setInterval(this.res_history, 600000);
		this.limit_timer = setInterval(() => {
			if (this.dsp_option.limit1_flag) {
				this.request('post', getLimitThreshold, { deviceid: this.device_id }, '123456', this.loginToken, (res) => {
					this.dsp_option.output1LimitTh = res.data.data.output1LimitTh;
				});
			}
			if (this.dsp_option.limit2_flag) {
				this.request('post', getLimitThreshold, { deviceid: this.device_id }, '123456', this.loginToken, (res) => {
					this.dsp_option.output2LimitTh = res.data.data.output2LimitTh;
				});
			}
		}, 180000);
		// websocket获取DSP页面数据
		this.ws_link = new WebSocket(`${ws_url}/${this.device_id}/level?token=${this.loginToken}`);
		this.ws_link.onmessage = (res) => {
			let data = JSON.parse(res.data);
			if (Object.keys(data).indexOf('data') != -1) {
				let keys = Object.keys(data.data);
				if (this.option_focus == 1) {
					// 能找到input1说明有数据
					if (keys.indexOf('input1') != -1) {
						this.dsp_option.input[0].level = data.data.input1;
						this.dsp_option.output[0].level = data.data.output1;
						this.dsp_option.output[1].level = data.data.output2;
					} else {
						this.$message.info(data.message);
					}
				}
			} else {
				this.$message.info(data.message);
			}
		};
		this.ws_link.onerror = (res) => {
			this.$message.error(res.message);
		};
		this.ws_link.onopen = (res) => {
			console.log('连接成功');
		};
	},
	methods: {
		// 获取地址栏token
		get_token() {
			let temp = location.search.substring(1).split('&');
			temp.forEach((e) => {
				if (e.indexOf('loginToken') != -1) {
					this.loginToken = e.split('=')[1];
					window.sessionStorage.loginToken = this.loginToken;
				} else if (e.indexOf('userName') != -1) {
					this.userName = e.split('=')[1];
					window.sessionStorage.userName = this.userName;
				}
			});
			let url = location.href.split('?')[0];
			history.replaceState('', '', url);
		},
		request(method, url, data, key, token, func) {
			axios({
				method: method,
				url: url,
				data: {
					client: 'PC',
					user: '',
					version: '1.0.1',
					data: data,
					key: key,
				},
				headers: { token: token },
			}).then((res) => {
				if (res.data.code == 1000) {
					if (res.data.data) {
						func(res);
					} else {
						this.$message.error('数据为空');
					}
				} else {
					this.$alert(res.data.message, '提示', {
						confirmButtonText: '确定',
						callback: () => {
							if (res.data.code == 3005 || res.data.code == 3006) {
								window.location.href = '../login/login.html';
							}
						},
					});
				}
			});
		},
		// 总选项选中样式
		option_style(index) {
			let style = {
				background: this.option_focus == index ? '#1431a0' : 'rgba(32, 44, 92, 0.48)',
				border: this.option_focus == index ? '' : '1px solid #1B59CA',
				boxShadow: this.option_focus == index ? '' : '0px 0px 65px 0px rgba(4, 15, 51, 0.8)',
			};
			return style;
		},
		// 切换选项卡同时重新获取节点初始化echart
		switch_option(index) {
			// let message = { deviceid: this.device_id };
			switch (index) {
				case 0:
					// message.type = 'xxx';
					this.res_history();
					this.option_focus = index;
					break;
				case 1:
					// message.type = 'level';
					this.request('post', getChannelDetail, { deviceid: this.device_id }, '74935343174538', this.loginToken, (res) => {
						console.log(res);
						this.dsp_option.input = res.data.data.input;
						this.dsp_option.output = res.data.data.output;
						// 将特殊通道抽出 重新组成对象数组
						this.dsp_option.geq_list = [];
						for (let e of this.dsp_option.output) {
							let array2 = [];
							let array = Object.entries(e).filter((e2) => {
								return e2[0].indexOf('geq') != -1;
							});
							for (let e3 of array) {
								let obj = {};
								obj.gain = e3[1];
								obj.channel_id = e.channel_id; //下达命令时需要有当前通道id geq所属一个通道id
								array2.push(obj);
							}
							this.dsp_option.geq_list.push(array2);
						}
						this.option_focus = index; //数据加载回来以后再跳转
					});
					break;
				case 2:
					// message.type = 'xxx';
					this.request('post', getPowerVol, { deviceid: this.device_id }, '74935343174538', this.loginToken, (res) => {
						this.sys_option.power_value = res.data.data.powerVol;
					});
					this.request('post', getOutputStatus, { deviceid: this.device_id }, '74935343174538', this.loginToken, (res) => {
						this.sys_option.status = [];
						this.sys_option.status.push(res.data.data.output1);
						this.sys_option.status.push(res.data.data.output2);
					});
					this.option_focus = index;
					break;
			}
			// if (this.ws_link.readyState == 1) {
			// this.ws_link.send(JSON.stringify(message));
			// }
		},
		// 历史记录选中样式
		history_option_style(index) {
			let style = {
				fontSize: '14px',
				color: this.history.history_data_option == index ? '#FFFFFF' : '#84D5FE',
			};
			return style;
		},
		// 切换历史记录
		history_switch(index) {
			this.history.history_data_option = index;
			switch (index) {
				case 0:
					this.history.output1.y_data = this.history.output1.voltageList;
					this.history.output2.y_data = this.history.output2.voltageList;
					this.history.display_title = '电压';
					this.history.display_unit = 'V';
					break;
				case 1:
					this.history.output1.y_data = this.history.output1.currentList;
					this.history.output2.y_data = this.history.output2.currentList;
					this.history.display_title = '电流';
					this.history.display_unit = 'A';
					break;
				case 2:
					this.history.output1.y_data = this.history.output1.powerList;
					this.history.output2.y_data = this.history.output2.powerList;
					this.history.display_title = '功率';
					this.history.display_unit = 'W';
					break;
				case 3:
					this.history.output1.y_data = this.history.output1.temperatureList;
					this.history.output2.y_data = this.history.output2.temperatureList;
					this.history.display_title = '温度';
					this.history.display_unit = '℃';
					break;
			}
			for (let i = 0; i < this.channel_num; i++) {
				this[`echarts${i}`].setOption({
					tooltip: {
						formatter: `${this.history.history_day}<br/>时间：{b}<br>${this.history.display_title}：{c} ${this.history.display_unit}`,
					},
					series: [
						{
							data: this.history[`output${i + 1}`].y_data,
						},
					],
				});
			}
		},
		// 每隔十分钟查询历史数据
		res_history() {
			if (this.option_focus == 0) {
				this.request('post', getAmpHistoryData, { deviceid: this.device_id }, '74935343174538', this.loginToken, (res) => {
					console.log(res);
					let num = Object.keys(res.data.data);
					if (num.length > 0) {
						this.history.data_null = false; //控制数据为空时的显示
						this.channel_num = num.length;
						// 获取当天日期
						this.history.history_day = res.data.data.output1.timeList[0].split(' ')[0];
						// 截取时间戳组成新数组
						this.history.output1.timeList = [];
						for (const e of res.data.data.output1.timeList) {
							let time = e.split(' ')[1];
							this.history.output1.timeList.push(time);
						}
						// 将数据进行取整
						this.history.output1.currentList = [];
						for (const e of res.data.data.output1.currentList) {
							let temp = Math.floor(Number(e) * 10) / 10;
							this.history.output1.currentList.push(temp);
						}
						this.history.output1.voltageList = [];
						for (const e of res.data.data.output1.voltageList) {
							let temp = Math.floor(Number(e) * 10) / 10;
							this.history.output1.voltageList.push(temp);
						}
						this.history.output1.powerList = [];
						for (const e of res.data.data.output1.powerList) {
							let temp = Math.floor(Number(e) * 10) / 10;
							this.history.output1.powerList.push(temp);
						}
						this.history.output1.temperatureList = [];
						for (const e of res.data.data.output1.temperatureList) {
							let temp = Math.floor(Number(e) * 10) / 10;
							this.history.output1.temperatureList.push(temp);
						}

						this.history.output2.timeList = [];
						for (const e of res.data.data.output2.timeList) {
							let time = e.split(' ')[1];
							this.history.output2.timeList.push(time);
						}
						// 通道2
						this.history.output2.currentList = [];
						for (const e of res.data.data.output2.currentList) {
							let temp = Math.floor(Number(e) * 10) / 10;
							this.history.output2.currentList.push(temp);
						}
						this.history.output2.voltageList = [];
						for (const e of res.data.data.output2.voltageList) {
							let temp = Math.floor(Number(e) * 10) / 10;
							this.history.output2.voltageList.push(temp);
						}
						this.history.output2.powerList = [];
						for (const e of res.data.data.output2.powerList) {
							let temp = Math.floor(Number(e) * 10) / 10;
							this.history.output2.powerList.push(temp);
						}
						this.history.output2.temperatureList = [];
						for (const e of res.data.data.output2.temperatureList) {
							let temp = Math.floor(Number(e) * 10) / 10;
							this.history.output2.temperatureList.push(temp);
						}
						if (this.first_load) {
							for (let i = 1; i <= this.channel_num; i++) {
								this.history_echart(i);
							}
							this.first_load = false;
						} else {
							this.history_switch(this.history.history_data_option);
						}
					} else {
						// this.history.data_null = true;
						this.history.output1.timeList = ['04:43', '04:53', '05:03', '05:13'];
						this.history.output1.voltageList = [1, 2, 3];
						this.history.output2.timeList = ['04:43', '04:53', '05:03', '05:13'];
						this.history.output2.voltageList = [1, 2, 3];
						for (let i = 1; i <= this.channel_num; i++) {
							this.history_echart(i);
						}
					}
				});
			}
		},
		// 第一次加载页面时 设置图表配置
		history_echart(index) {
			let option = {
				grid: {
					show: true,
					backgroundColor: 'rgba(7, 61, 44, 0.2)',
					borderColor: '#065950',
				},
				xAxis: {
					type: 'category',
					data: this.history[`output${index}`].timeList,
					// 轴线配置
					axisLine: {
						// 线相关样式
						lineStyle: {
							color: '#0A6D62',
							shadowBlur: 0,
							shadowColor: '#0A6D62',
							shadowOffsetX: 16,
						},
						// 轴线装饰
						symbol: ['none', 'triangle'],
						symbolOffset: [0, 20],
					},
					// 轴线上的刻度
					axisTick: {
						show: false,
						// alignWithLabel: true,//与刻度对齐
					},
					// 轴线上的文字配置
					axisLabel: {
						color: '#4F81FF',
					},
					// 分割线配置
					splitLine: {
						show: true,
						lineStyle: {
							color: '#065950',
						},
					},
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: true,
						lineStyle: {
							color: '#0A6D62',
							shadowBlur: 0,
							shadowColor: '#0A6D62',
							shadowOffsetY: -16,
						},
						symbol: ['none', 'triangle'],
						symbolOffset: [0, 20],
					},
					axisLabel: {
						color: '#00F2F1',
					},
					splitLine: {
						lineStyle: {
							color: '#065950',
						},
					},
					// 最大最小边界处理方式，即是否留白等等
					boundaryGap: ['0%', '20%'],
				},
				tooltip: {
					trigger: 'axis',
					formatter: `${this.history.history_day}<br/>时间：{b}<br>电压：{c} V`,
				},
				series: [
					{
						type: 'line',
						data: this.history[`output${index}`].voltageList,
						smooth: true, //平滑显示
						symbol: 'none', //线段上的装饰点
						lineStyle: {
							color: '#E1C506',
						},
						cursor: 'none',
					},
				],
			};
			this[`echarts${index - 1}`].setOption(option);
		},
		// dsp界面按钮控制
		dsp_button(channel, key) {
			let params_obj = {
				deviceid: this.device_id,
				channel: channel,
			};
			switch (channel) {
				case 0:
					this.dsp_option.input[0].mute = this.dsp_option.input[0].mute == 0 ? 1 : 0;
					params_obj[key] = this.dsp_option.input[0].mute;
					break;
				default:
					if (key == 'mute') {
						this.dsp_option.output[channel - 1].mute = this.dsp_option.output[channel - 1].mute == 0 ? 1 : 0;
						params_obj[key] = this.dsp_option.output[channel - 1].mute;
					} else if (key == 'limit_enable') {
						this.dsp_option.output[channel - 1].limit_enable = this.dsp_option.output[channel - 1].limit_enable == 0 ? 1 : 0;
						params_obj[key] = this.dsp_option.output[channel - 1].limit_enable;
					}
					break;
			}
			this.request('post', sendCmdtoDevice, params_obj, '74935343174538', this.loginToken, () => {
				// 判断是否点下的是压限开关且是否开启 将标识符置为true
				if (key === 'limit_enable') {
					this.dsp_option[`limit${channel}_flag`] = this.dsp_option.output[channel - 1].limit_enable == 1 ? true : false;
					if (!this.dsp_option[`limit${channel}_flag`]) {
						this.dsp_option[`output${channel}LimitTh`] = '+20';
					}
				}
			});
		},
		// 格式化时间 收集数据 在点自检按钮时再发出
		set_time() {
			let params = {
				channel: 0,
				deviceid: this.device_id,
				schedule: {},
			};
			if (this.sys_option.check_ststus == 0) {
				if (JSON.stringify(this.sys_option.day_time).length < 10) {
					this.$message.error('请选择时间');
				} else if (this.sys_option.select_time == -1) {
					this.$message.error('请选择自检类型');
				} else {
					// 开了自检才能发送参数
					params.schedule.sys_check = 1;
					params.schedule.timing_type = this.sys_option.select_time;
					// 格式化时间
					let temp = this.sys_option.day_time.toString();
					params.schedule.check_time = temp.split(' ')[4];
					// 分类发送
					switch (this.sys_option.select_time) {
						case 0:
							this.request('post', schedule, params, '74935343174538', this.loginToken, () => {
								this.sys_option.check_ststus = 1;
							});
							break;
						case 1:
							if (this.sys_option.select_week == -1) {
								this.$message.error('请指定一周中的哪一天');
							} else {
								params.schedule.week = this.sys_option.select_week;
								this.request('post', schedule, params, '74935343174538', this.loginToken, () => {
									this.sys_option.check_ststus = 1;
								});
							}
							break;
						case 2:
							if (this.sys_option.select_month == -1) {
								this.$message.error('请指定每月中的哪一天');
							} else {
								params.schedule.day = this.sys_option.select_month;
								this.request('post', schedule, params, '74935343174538', this.loginToken, () => {
									this.sys_option.check_ststus = 1;
								});
							}
							break;
					}
				}
			} else {
				params.schedule.sys_check = 0;
				this.request('post', schedule, params, '74935343174538', this.loginToken, () => {
					this.sys_option.check_ststus = 0;
				});
			}
		},
		// 自检开关样式
		check_button_style() {
			let style = {
				background: this.sys_option.check_ststus == 1 ? '#1431A0' : 'linear-gradient(0deg, #061c47, #092d73)',
				color: this.sys_option.check_ststus == 1 ? '#fff' : '#84d5fe',
				border: this.sys_option.check_ststus == 1 ? 'none' : '1px solid #325ecb',
			};
			return style;
		},
		// 返回首页
		return_home() {
			window.location.href = `../index.html?loginToken=${this.loginToken}&userName=${this.userName}`;
		},
	},
});

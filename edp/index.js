let url = 'http://182.150.116.22:18113/';
let getEdpMatrixInfo = `${url}api/edp/getEdpMatrixInfo`;
let matrixControl = `${url}api/edp/matrixControl`;
let channelDetail = `${url}api/edp/channelDetail`;
let channelControl = `${url}api/edp/channelControl`;
let sceneInfo = `${url}api/edp/sceneInfo`;
let loadScene = `${url}api/edp/loadScene`;
let updateSceneName = `${url}api/edp/updateSceneName`;
let saveScene = `${url}api/edp/saveScene`;

new Vue({
	el: '#index',
	data() {
		return {
			loginToken: '',
			userName: '',
			device_id: '0x111111111111000000000000',
			static_param: {
				options: ['通道控制', '矩阵', '场景'], //导航栏
				option_selected: 0, //导航栏模块显示
				input_max: 12, //输入最大值
				input_min: -12,
			},
			rect: {
				list: [], //二维数组 第一层数组代表输出 里面每个元素代表输入
			},
			channel_ctrl: {
				input_list: [], //通道信息
				output_list: [],
				is_online: -1, //设备在线状态
				input_start_channel: -1, //1通道从0开始
				input_end_channel: -1, //开始到结束 同时控制这中间的所有通道
				output_start_channel: -1,
				output_end_channel: -1,
			},
			scene: {
				list: [], //场景列表
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
							this.channel_ctrl.input_list = res.data.data.channels_input;
							this.channel_ctrl.input_list.forEach((e) => {
								this.$set(e, 'step', 0);
								// 哪一种选中边框标识 0是单选 1是多选开始 2是多选中间 3是多选结束
								this.$set(e, 'selected', -1);
							});
							this.channel_ctrl.output_list = res.data.data.channels_output;
							this.channel_ctrl.output_list.forEach((e) => {
								this.$set(e, 'step', 0);
								this.$set(e, 'selected', -1);
							});
							this.channel_ctrl.is_online = res.data.data.isOnline;
							this.static_param.option_selected = index;
						}
					);
					break;
				case 1:
					this.request(
						'post',
						getEdpMatrixInfo,
						{
							device_id: this.device_id,
						},
						'123456',
						this.loginToken,
						(res) => {
							console.log(res);
							this.rect.list = res.data.data;
							this.static_param.option_selected = index;
						}
					);
					break;
				case 2:
					this.request('post', sceneInfo, { device_id: this.device_id }, '123456', this.loginToken, (res) => {
						this.scene.list = res.data.data;
						this.scene.list.forEach((obj) => {
							this.$set(obj, 'input_display', false);
						});
						this.static_param.option_selected = index;
					});
					break;
			}
		},
		// 矩阵控制
		ctrl_rect(row, col, input) {
			this.request(
				'post',
				matrixControl,
				{
					device_id: this.device_id,
					channel_out_no: row + 1,
					channel_in_no: col + 1,
					matrix_status: input == 0 ? 1 : 0,
				},
				'55555',
				this.loginToken,
				() => {
					this.rect.list[row].splice(col, 1, input == 0 ? 1 : 0);
				}
			);
		},
		// 横向滚动
		scroll_x(e) {
			// currentTarget没有wheelDelta属性
			e.wheelDelta > 0 ? (e.currentTarget.scrollLeft -= 100) : (e.currentTarget.scrollLeft += 100);
		},
		// 滑块样式
		change_cover_height(value) {
			let temp = (value - this.static_param.input_min) / (this.static_param.input_max - this.static_param.input_min);
			return `height:${temp * 100}%`;
		},
		change_slider_bottom(value) {
			let temp = (value - this.static_param.input_min) / (this.static_param.input_max - this.static_param.input_min);
			return `bottom:calc(${temp * 100}% - 18px)`;
		},
		// 滑块静音
		mute_button(obj, flag) {
			switch (flag) {
				case 'output':
					this.request(
						'post',
						channelControl,
						{
							device_id: this.device_id,
							isInput: 0,
							start_channel: this.channel_ctrl.output_start_channel,
							end_channel: this.channel_ctrl.output_end_channel,
							mute: obj.mute == 0 ? 1 : 0,
						},
						'123456',
						this.loginToken,
						() => {
							let temp = obj.mute == 0 ? 1 : 0;
							let iteration = this.channel_ctrl.output_end_channel - this.channel_ctrl.output_start_channel + 1;
							for (let i = 0; i < iteration; i++) {
								this.channel_ctrl.output_list[this.channel_ctrl.output_start_channel - 1 + i].mute = temp;
							}
						}
					);
					break;
				case 'input':
					this.request(
						'post',
						channelControl,
						{
							device_id: this.device_id,
							isInput: 1,
							start_channel: this.channel_ctrl.input_start_channel,
							end_channel: this.channel_ctrl.input_end_channel,
							mute: obj.mute == 0 ? 1 : 0,
						},
						'123456',
						this.loginToken,
						() => {
							let temp = obj.mute == 0 ? 1 : 0;
							let iteration = this.channel_ctrl.input_end_channel - this.channel_ctrl.input_start_channel + 1;
							for (let i = 0; i < iteration; i++) {
								this.channel_ctrl.input_list[this.channel_ctrl.input_start_channel - 1 + i].mute = temp;
							}
						}
					);
					break;
			}
		},
		// 滑块控制步长
		slider_move(e, obj, flag) {
			let parent_dom = e.currentTarget.parentNode;
			let total_height = parent_dom.offsetHeight;
			let client_top = Math.ceil(parent_dom.getBoundingClientRect().top);
			document.onmousemove = (event) => {
				let height = total_height - (event.clientY - client_top);
				if (height < 0) {
					height = 0;
				} else if (height > total_height) {
					height = total_height;
				}
				height = (height / total_height) * (this.static_param.input_max - this.static_param.input_min) + this.static_param.input_min;
				height = Math.floor(height * 10 + 0.5) / 10;
				let iteration;
				switch (flag) {
					case 'output':
						iteration = this.channel_ctrl.output_end_channel - this.channel_ctrl.output_start_channel + 1;
						for (let i = 0; i < iteration; i++) {
							let element = this.channel_ctrl.output_list[this.channel_ctrl.output_start_channel - 1 + i];
							element.step = height;
						}
						break;
					case 'input':
						iteration = this.channel_ctrl.input_end_channel - this.channel_ctrl.input_start_channel + 1;
						for (let i = 0; i < iteration; i++) {
							let element = this.channel_ctrl.input_list[this.channel_ctrl.input_start_channel - 1 + i];
							element.step = height;
						}
						break;
				}
			};
			document.onmouseup = () => {
				switch (flag) {
					case 'output':
						this.request(
							'post',
							channelControl,
							{
								device_id: this.device_id,
								isInput: 0,
								start_channel: this.channel_ctrl.output_start_channel,
								end_channel: this.channel_ctrl.output_end_channel,
								step: obj.step,
							},
							'123456',
							this.loginToken,
							() => {
								let iteration = this.channel_ctrl.output_end_channel - this.channel_ctrl.output_start_channel + 1;
								for (let i = 0; i < iteration; i++) {
									let element = this.channel_ctrl.output_list[this.channel_ctrl.output_start_channel - 1 + i];
									element.volume = Math.floor((element.volume + obj.step) * 10 + 0.5) / 10;
								}
							}
						);
						break;
					case 'input':
						this.request(
							'post',
							channelControl,
							{
								device_id: this.device_id,
								isInput: 1,
								start_channel: this.channel_ctrl.input_start_channel,
								end_channel: this.channel_ctrl.input_end_channel,
								step: obj.step,
							},
							'123456',
							this.loginToken,
							() => {
								let iteration = this.channel_ctrl.input_end_channel - this.channel_ctrl.input_start_channel + 1;
								for (let i = 0; i < iteration; i++) {
									let element = this.channel_ctrl.input_list[this.channel_ctrl.input_start_channel - 1 + i];
									element.volume = Math.floor((element.volume + obj.step) * 10 + 0.5) / 10;
								}
							}
						);
						break;
				}
				document.onmousemove = null;
				document.onmouseup = null;
			};
		},
		// 选择通道
		select_channel(e, flag, obj, index) {
			let old_clentX = e.clientX;
			let old_clentY = e.clientY;
			// 获取滑动条总容器
			let parent_dom = e.currentTarget.parentNode;
			// 计算容器在视窗中位置
			let position = parent_dom.getBoundingClientRect();
			if (old_clentY > position.top + 50 && old_clentY < position.bottom - 50 && old_clentX > position.left && old_clentX < position.right) {
				switch (flag) {
					case 'input':
						// 每次点击时清除所有样式
						for (let e of this.channel_ctrl.input_list) {
							e.selected = -1;
						}
						// 确认点的是输入或输出时 在点下的时候就选中一个
						obj.selected = 0;
						this.channel_ctrl.input_start_channel = index + 1;
						// 计算鼠标点击位置到触发元素的距离 再加上鼠标移动距离从而计算是否大于元素宽度
						// 还要考虑滚动条的位置 offset是相对父容器的 所以要减去滚动距离
						let remain_in = old_clentX - (this.get_clientX(this.$refs.input_channel[index]) - parent_dom.scrollLeft);
						// 第一次边界设置为初始点的offset加宽度
						let last_width_in = this.get_clientX(this.$refs.input_channel[index]) - parent_dom.scrollLeft + 68;
						let count_in = 0;
						document.onmousemove = (event) => {
							// if (event.clientX < position.right && event.clientX > position.left) {
							if (event.clientX - position.left > parent_dom.clientWidth - 150) {
								parent_dom.scrollLeft += 5;
							}
							if (event.clientX - position.left < 150) {
								parent_dom.scrollLeft -= 5;
							}
							if (count_in == 0) {
								let width = remain_in + (event.clientX - old_clentX);
								if (width > 68) {
									count_in++;
									// 当只移动了两个 给前后对象加样式
									this.channel_ctrl.input_list[index].selected = 1;
									this.channel_ctrl.input_list[index + count_in].selected = 3;
								}
							} else if (event.clientX - last_width_in > 68 && count_in + index < 15 && count_in > 0) {
								last_width_in += 68;
								// 增加的时候要 后一个节点更新 所以先加后用
								count_in++;
								// 当移动大于2个时，把前一个修改 最后一个增加
								this.channel_ctrl.input_list[index + count_in - 1].selected = 2;
								this.channel_ctrl.input_list[index + count_in].selected = 3;
							} else if (event.clientX < last_width_in && count_in > 0) {
								if (count_in == 1) {
									this.channel_ctrl.input_list[index].selected = 0;
									this.channel_ctrl.input_list[index + count_in].selected = -1;
								} else if (count_in > 1) {
									this.channel_ctrl.input_list[index + count_in].selected = -1;
									this.channel_ctrl.input_list[index + count_in - 1].selected = 3;
									last_width_in -= 68;
								}
								// 减少的时候要把原先的节点删除 所以先用后减
								count_in--;
							}
							//#region
							// else if (count_in + index < 15 && event.clientX - position.left > parent_dom.clientWidth - 200) {
							// 	console.log('滚动');
							// 	last_width_in += 68;
							// 	last_width_in = last_width_in - parent_dom.scrollLeft + 68;
							// 	count_in++;
							// 	this.channel_ctrl.input_list[index + count_in - 1].selected = 2;
							// 	this.channel_ctrl.input_list[index + count_in].selected = 3;
							// 	parent_dom.scrollLeft += 100;
							// }
							//#endregion
							this.count_in = count_in;
							// }
						};
						break;
					case 'output':
						for (let e of this.channel_ctrl.output_list) {
							e.selected = -1;
						}
						obj.selected = 0;
						this.channel_ctrl.output_start_channel = index + 1;
						let remain_out = old_clentX - (this.get_clientX(this.$refs.output_channel[index]) - parent_dom.scrollLeft);
						let last_width_out = this.get_clientX(this.$refs.output_channel[index]) - parent_dom.scrollLeft + 68;
						let count_out = 0;
						document.onmousemove = (event) => {
							if (event.clientX - position.left > parent_dom.clientWidth - 150) {
								parent_dom.scrollLeft += 5;
							}
							if (event.clientX - position.left < 150) {
								parent_dom.scrollLeft -= 5;
							}
							if (count_out == 0) {
								let width = remain_out + (event.clientX - old_clentX);
								if (width > 68) {
									count_out++;
									this.channel_ctrl.output_list[index].selected = 1;
									this.channel_ctrl.output_list[index + count_out].selected = 3;
								}
							} else if (event.clientX - last_width_out > 68 && count_out + index < 15 && count_out > 0) {
								last_width_out += 68;
								count_out++;
								this.channel_ctrl.output_list[index + count_out - 1].selected = 2;
								this.channel_ctrl.output_list[index + count_out].selected = 3;
							} else if (event.clientX < last_width_out && count_out > 0) {
								if (count_out == 1) {
									this.channel_ctrl.output_list[index].selected = 0;
									this.channel_ctrl.output_list[index + count_out].selected = -1;
								} else if (count_out > 1) {
									this.channel_ctrl.output_list[index + count_out].selected = -1;
									this.channel_ctrl.output_list[index + count_out - 1].selected = 3;
									last_width_out -= 68;
								}
								count_out--;
							}
							this.count_out = count_out;
						};
						break;
				}
			}
			document.onmouseup = () => {
				if (flag === 'input') {
					this.channel_ctrl.input_end_channel = index + this.count_in + 1;
				} else if (flag === 'output') {
					this.channel_ctrl.output_end_channel = index + this.count_out + 1;
				}
				document.onmousemove = null;
				document.onmouseup = null;
			};
		},
		// 通道样式
		channel_style(obj) {
			let array = [
				'single_slider',
				obj.selected == 0 ? 'channel_selected' : obj.selected == 1 ? 'channel_selected_start' : obj.selected == 2 ? 'channel_selected_middle' : obj.selected == 3 ? 'channel_selected_end' : '',
			];
			return array;
		},
		// 加载到指定场景
		loading_setting(obj) {
			this.request('post', loadScene, { device_id: this.device_id, scene_no: obj.scene_no }, '123456', this.loginToken, () => {});
		},
		// 编辑场景名称
		edit_setting_name(obj) {
			this.request('post', updateSceneName, { device_id: this.device_id, scene_no: obj.scene_no, scene_name: obj.scene_name }, '123456', this.loginToken, () => {
				this.$message.success('修改成功');
			});
			obj.input_display = false;
		},
		// 保存到指定场景
		save_setting(obj) {
			this.request('post', saveScene, { device_id: this.device_id, scene_no: obj.scene_no, scene_name: obj.scene_name }, '123456', this.loginToken, () => {
				this.$message.success('修改成功');
			});
		},
	},
	directives: {
		focus: {
			update(e, obj) {
				e.focus();
			},
		},
	},
});

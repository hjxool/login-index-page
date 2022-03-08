// 电平显示组件
Vue.component('level-component', {
	template: `
    <div class="level_box">
      <div class="level_title">电平</div>
      <div class="level_display">
        <div class="level_bar">
          <span class="level_range">{{level_max}}</span>
          <div class="level_color_lump" ref="total_height">
            <div v-for="i,index in total_num" class="single_lump" :style="bg_draw(index)"></div>
          </div>
          <span class="level_range">{{level_min}}</span>
        </div>
      </div>
    </div>
  `,
	props: ['level_max', 'level_min', 'display_value'],
	data() {
		return {
			total_height: 0, //色块容器高度，组件
		};
	},
	mounted() {
		// this.total_height = $('.level_color_lump')[0].offsetHeight;
		this.total_height = this.$refs.total_height.offsetHeight;
		// v-for不能及时将节点渲染上去，但同时mounted已经执行，所以找不到节点
		// this.$nextTick(() => {
		// 	this.total_lump = $('.single_lump');
		// });
	},
	methods: {
		bg_draw(index) {
			let color;
			// 10是单位，一个小方格大小+间隔=10
			let max = Math.floor((this.total_height * 0.05) / 10 + 0.5);
			let mid = Math.floor((this.total_height * 0.1) / 10 + 0.5);
			let min = Math.floor((this.total_height * 0.15) / 10 + 0.5);
			if (index < max) {
				color = '#AB152E';
			} else if (index >= max && index < mid) {
				color = '#CB7E05';
			} else if (index >= mid && index < min) {
				color = '#BCB605';
			} else {
				color = '#23CB82';
			}
			// 显示效果时从下往上，但是节点渲染是从上往下，所以要用总数-基数
			let lump_opacity = '0.5'; //单独维护的色块透明度
			let total_num = Math.floor(this.total_height / 10);
			let percent = (this.display_value - Number(this.level_min)) / (Number(this.level_max) - Number(this.level_min));
			let rendering_num = Math.floor((this.total_height * percent) / 10 + 0.5);
			if (index + 1 > total_num - rendering_num) {
				lump_opacity = '1';
			}
			return { background: color, opacity: lump_opacity };
		},
	},
	computed: {
		total_num() {
			return Math.floor(this.total_height / 10);
		},
	},
});

// 滑块组件
Vue.component('single-slider', {
	props: ['channel', 'device_id', 'token', 'in_title', 'out_title', 'in_or_out', 'slider_max', 'slider_min'],
	data: function () {
		return {
			// mute: this.channel.mute, //静音
			sliderNum: Number, //音量
			newValue: 0, //监听器传入的新值
			sliderNum_temp: Number, //传递给子组件的中间变量
		};
	},
	created: function () {
		this.obj_key_judge();
	},
	methods: {
		// 因为读取数组不同，属性名不同
		obj_key_judge() {
			if (this.in_or_out == 0) {
				this.sliderNum = this.channel.digitalgain;
				this.sliderNum_temp = this.channel.digitalgain;
			} else {
				this.sliderNum = this.channel.gain;
				this.sliderNum_temp = this.channel.gain;
			}
		},
		// 封装的请求方法
		request: function (method, url, data, key, token, func) {
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
								window.location.href = '../test demo/login/login.html';
							}
						},
					});
				}
			});
		},
		// 静音
		// soundOff: function () {
		// 	if (this.mute == 0) {
		// 		this.mute = 1;
		// 	} else {
		// 		this.mute = 0;
		// 	}
		// 	let channelsData = [];
		// 	let obj = {};
		// 	obj.mute = this.mute;
		// 	obj.number = this.channel.number;
		// 	obj.volume = this.sliderNum;
		// 	channelsData.push(obj);
		// 	// this.request('post', channelControlUrl, { id: this.device_id, channelsData: channelsData }, '123456', this.token, function () {});
		// },
		// 命令下发
		order_set: function () {
			// 根据输入改变滑块
			let channelsData = [];
			let obj = {};
			// obj.mute = this.mute;
			// obj.number = this.channel.number;
			obj.volume = this.sliderNum;
			channelsData.push(obj);
			// this.request('post', channelControlUrl, { id: this.device_id, channelsData: channelsData }, '123456', this.token, function () {});
		},
		command_send: function () {
			console.log('按下回车');
			if (this.sliderNum.length > 0) {
				if (this.sliderNum < Number(this.slider_min)) {
					this.sliderNum = Number(this.slider_min);
				} else if (this.sliderNum > Number(this.slider_max)) {
					this.sliderNum = Number(this.slider_max);
				} else {
					this.sliderNum = Math.floor(this.sliderNum * 10 + 0.5) / 10;
				}
				this.sliderNum_temp = this.sliderNum;
				this.order_set();
			}
		},
		silderMove: function (e) {
			let _this = this;
			let nowY_temp;
			let content = this.$refs.slider;
			let sliderBottom = content.offsetHeight - e.target.offsetTop - e.target.offsetHeight / 2;
			let mouseY = e.clientY;
			window.onmousemove = function (e) {
				let mouseH = mouseY - e.clientY;
				let nowY = mouseH + sliderBottom;
				if (nowY < 0) {
					nowY = 0;
				}
				if (nowY > content.offsetHeight) {
					nowY = content.offsetHeight;
				}
				nowY = (nowY / content.offsetHeight) * (Number(_this.slider_max) - Number(_this.slider_min)) + Number(_this.slider_min);
				nowY = Math.floor(nowY * 10 + 0.5) / 10;
				nowY_temp = nowY;
				// sliderNum和sliderNum_temp不一样 前者是用于显示在面板上 后者用于回调改变滑块高度 两者没有关联关系 仅在面板输入时做了一次等值
				_this.sliderNum = nowY;
				_this.sliderNum_temp = nowY;
			};
			window.onmouseup = function () {
				let channelsData = [];
				let obj = {};
				// obj.mute = _this.mute;
				// obj.number = _this.channel.number;
				obj.volume = nowY_temp;
				channelsData.push(obj);
				// _this.request('post', channelControlUrl, { id: _this.device_id, channelsData: channelsData }, '123456', _this.token, function () {});
				window.onmousemove = false;
			};
		},
		sliderTurnTo: function (e) {
			let content = this.$refs.slider;
			let nowY = content.offsetHeight - (e.clientY - Math.ceil(content.getBoundingClientRect().top));
			if (nowY < 0) {
				nowY = 0;
			}
			if (nowY > content.offsetHeight) {
				nowY = content.offsetHeight;
			}
			// 差值是以0为基准的
			nowY = (nowY / content.offsetHeight) * (Number(this.slider_max) - Number(this.slider_min)) + Number(this.slider_min);
			nowY = Math.floor(nowY * 10 + 0.5) / 10;
			this.sliderNum = nowY;
			this.sliderNum_temp = nowY;
			let channelsData = [];
			let obj = {};
			// obj.mute = this.mute;
			// obj.number = this.channel.number;
			obj.volume = nowY;
			channelsData.push(obj);
			// this.request('post', channelControlUrl, { id: this.device_id, channelsData: channelsData }, '123456', this.token, function () {});
		},
		// 改变滑块进度条高度
		change_cover_height: function (par) {
			let temp = (par - Number(this.slider_min)) / (Number(this.slider_max) - Number(this.slider_min));
			return `height:${temp * 100}%;`;
		},
		// 改变滑块离底部距离
		change_slider_bottom: function (par) {
			let temp = (par - Number(this.slider_min)) / (Number(this.slider_max) - Number(this.slider_min));
			return `bottom:calc(${temp * 100}% - 18px);`;
		},
	},
	template: `
        <div class="single_slider_content">
          <div class="slider_name">{{in_or_out==0?in_title:out_title}}</div>
          <div class="slider_display">
            <div class="slider_num">
              <input @keyup.enter="command_send" v-model.number="sliderNum" maxlength="5" class="slider_num_input">
              <span style="font-size: 12px;color: #ABCBFF;">dB</span>
            </div>
            <div class="slider_box">
              <span class="slider_range">{{slider_max}}</span>
              <div @mousedown="sliderTurnTo($event)" class="slider" ref="slider">
                <img src="./img/滑块大.png" style="width: 100%;height: 100%;position: absolute;">
                <div class="slider_bar"></div>
                <div :style="change_cover_height(sliderNum_temp)" class="slider_cover"></div>
                <div :style="change_slider_bottom(sliderNum_temp)" @mousedown.stop="silderMove($event)" class="slider_img"></div>
              </div>
              <span class="slider_range">{{slider_min}}</span>
            </div>
          </div>
          <!--  <div @click="soundOff" class="soundOff">
                <img :src="[mute==0?'./img/静音通常.png':'./img/静音.png']" style="position: absolute;width: 100%;height: 100%;z-index: -99;">
                <span :style="{fontSize: '12px',color:mute==0?'#ABCBFF':'#FFABCF'}">静音</span>
          </div> -->
        </div>
    `,
});

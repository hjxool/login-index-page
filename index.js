var index = new Vue({
	el: '#index',
	data: {
		calender: '', //日期
		weekDay: '', //星期
		time: '', //当前时间
		timer: {}, //清除计时器
		loginToken: '', //登陆获取的密匙
		itemPageNum: 1, //项目第一页
		itemPageSize: 999, //单页显示数量
		itemTotalPage: '', //总页数
		placePageNum: 1, //场所页码
		placePageSize: 999, //场所单页显示
		currentPage: '', //当前页
		oldPlatformCurrentPage: 1, //旧页面当前页
		sceneType: 2, //手动/自动场景
		sceneStatus: 0, //指定场景状态
		startTime: '', //自启动时间
		groupMin: 0, //用户组最小值
		groupMax: 0, //用户组最大值
		orderMin: 0, //顺序最小值
		orderMax: 0, //顺序最大值
		sceneDeviceSelected: -1, //点的是哪一个设备配置
		checkPlatform: -1, //点击卡片按钮判断是哪个平台的设备
		configPlatform: -1, //点击配置按钮判断是哪个平台设备
		userName: '',
		showDeviceList: false, //设备列表显示和隐藏
		showPower: false, //电源设备列表
		newTag: false, //新建场所输入框可见性
		newItem: false, //新建项目输入框可见
		editTagName: false, //编辑场所名称框可见
		showAddScene: false, //场景列表显示和隐藏
		showEditScene: false, //编辑列表显示和隐藏
		manualFocus: false, //手动场景是否选中
		autoFocus: false, //自动场景
		autoPowerFocus: true, //自动强制电源点选
		setUserGroupAndOrder: false, //新建场景配置框显示
		showWeekContainer: false, //显示日期选择框
		tipsOfDeleteDevice: false, //删除提示
		checkAllFlag: 1, //场景全选标记
		checkAll: false, //全选
		eduDevicecheckAllFlag: 1, //教育设备全选标记
		educheckAll: false, //教育设备全选
		showDistributeButton: true, //显示编辑设备按钮
		new_and_edit_alert_rule: 0, //新建和编辑告警规则
		alert_method_no_check: true, //告警规则方法有被选中
		alert_method_option_box_show: false, //显示告警规则选项框
		message_detail_display: false, //消息详情页面
		message_badge_hidden: false, //当消息数为0时隐藏图标
		download_list_td_header: true, //是否是下载中心列表表头
		refresh_place_device: false, //是否刷新设备管理列表
		message_center_badge: 0, //消息提示条数
		deviceInput: '', //搜索框
		alert_content: '', //输入的告警内容
		tagName: '', //场所名
		itemName: '', //项目名
		projectId: '', //项目ID
		customerId: '', //用户ID
		placeId: '', //场所ID
		sceneName: '', //新增场景名
		deviceId: '', //设备ID
		sceneId: '', //场景ID
		deviceLinkToPlaceId: 0, //设备和场所关系主键
		imgSrc: '', //存取点击设备的图片地址
		alert_rule_id: '', //单条告警规则ID
		soundDeviceNameInput: '吸顶音响', //广播设备名称
		volumeInput: 0, //广播设备音量
		soundDeviceConnect: '', //广播设备连接状态对应文字
		soundDeviceConnectStatus: -1, //广播设备连接状态
		soundDeviceIp: '', //广播设备IP
		soundDeviceSessionStatus: '', //广播设备任务状态
		download_list_search: '', //下载模块列表搜索
		soundDevicePower: 1, //广播设备电源
		alert_rule_status: -1, //告警规则状态
		allDeviceList: [], //所有可添加设备
		tags: [], //标签栏
		timing: [], //定时场景列表
		manual: [], //手动场景列表
		sceneEdit: {}, //编辑查看场景时候的列表
		item: [], //项目栏
		placeDeviceListArray: [], //场所已添加设备列表
		addSceneDeviceList: [], //新建场景中的设备列表
		eduDeivceList: [], //筛选出来的教育设备列表
		checkedEduDeviceID: [], //勾选的教育设备ID
		refer_alert_rule_list: [], //告警规则列表
		message_center_list: [], //消息中心消息列表
		message_center_detail: {}, //消息详情
		download_center_list: {}, //下载中心列表
		download_center_detail: [], //下载中心详情页
		placeFocus: '', //是否选中
		itemFocus: 0, //点中的项目
		item_temp_focus: 0, //临时变量
		managerFocus: 0, //右边栏中点的是哪个
		alert_button_focus: 0, //告警按钮点中的是哪个
		nav_bar_click: -1, //左边导航栏点中的是哪一个
		platformJump: 0, //右侧内容容器切换,0代表项目场所详情，1代表左边栏
		download_center_jump: 0, //下载中心跳转层级,0表示最外层功能模块，1表示二级跳转，2表示3级跳转
		download_center_sort_type: -1, //跨域时保存下载中心类别，请求用
		// 右边栏
		manager: [
			{ name: '设备管理', dark: './img/设备暗.png', light: './img/设备明.png' },
			{ name: '场景管理', dark: './img/场景暗.png', light: './img/场景明.png' },
			{ name: '告警管理', dark: './img/告警暗.png', light: './img/告警亮.png' },
			// { name: '平台入口', dark: './img/pingtaian.png', light: './img/pingtailiang.png' },
		],
		// 选择执行日期
		selectWeeks: [
			{ value: '星期一', checked: false, date: 1 },
			{ value: '星期二', checked: false, date: 2 },
			{ value: '星期三', checked: false, date: 3 },
			{ value: '星期四', checked: false, date: 4 },
			{ value: '星期五', checked: false, date: 5 },
			{ value: '星期六', checked: false, date: 6 },
			{ value: '星期日', checked: false, date: 7 },
		],
		alert_button: ['告警记录', '告警规则'], // 告警按钮
		//告警日志
		alert_logs: [
			{ time: '2021.01.20', deivce_name: '测试1', content: 'dasdaseqweq' },
			{ time: '2021.01.21', deivce_name: '测试2', content: 'gfdgdfgfd' },
			{ time: '2021.01.22', deivce_name: '测试3', content: 'oiiiii' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
			{ time: '2021.01.23', deivce_name: '测试4', content: 'ewrtreter' },
		],
		// 告警规则
		alert_rules: [
			{ content: 'qeqweqw', inform_type: 'auto', status: '启用', update_time: '2021.01.23' },
			{ content: 'qeqweqw', inform_type: 'auto', status: '启用', update_time: '2021.01.23' },
			{ content: 'qeqweqw', inform_type: 'auto', status: '启用', update_time: '2021.01.23' },
			{ content: 'qeqweqw', inform_type: 'auto', status: '启用', update_time: '2021.01.23' },
			{ content: 'qeqweqw', inform_type: 'auto', status: '启用', update_time: '2021.01.23' },
			{ content: 'qeqweqw', inform_type: 'auto', status: '启用', update_time: '2021.01.23' },
			{ content: 'qeqweqw', inform_type: 'auto', status: '启用', update_time: '2021.01.23' },
			{ content: 'qeqweqw', inform_type: 'auto', status: '启用', update_time: '2021.01.23' },
		],
		// 告警方式
		alert_method_options: [
			{ name: '方式1', check: false },
			{ name: '方式2', check: false },
			{ name: '方式3', check: false },
			{ name: '方式4', check: false },
		],
		// 下载中心
		download_center_sort: [
			{ type: 1, src_normal: './img/下载桌面.png', src_hover: './img/下载桌面选中.png' },
			{ type: 2, src_normal: './img/下载移动.png', src_hover: './img/下载移动选中.png' },
			{ type: 3, src_normal: './img/下载固件.png', src_hover: './img/下载固件选中.png' },
			{ type: 4, src_normal: './img/下载其他.png', src_hover: './img/下载其他选中.png' },
		],
		draging: '', //正在拖拽元素
		eduDevicePushLoading: false, //教育设备下发时加载遮罩
		temperature: 23, //模拟室温
		smartTempCtrl: false, //智能温度弹框显示
		temperatureNum: 25, //调温
		videoDeviceUrl: 'HsDimmerVideoPlayer://@rtmp://182.150.116.22:19350/live/hscc123456789-252@123123', //视频设备地址
		videoDeviceIP: false,
		clearTimer: null, //场所刷新计时器
		clear_message_num_timer: null, //未跳转消息中心前消息数计时器
		clear_message_all_timer: null, //同时刷新消息数和列表
		message_types: [
			{
				type: 0,
				name: '系统消息',
				value: '12',
				list: [
					{ title: '1111111', content: 'qweqwdsadasd' },
					{ title: '22', content: 'bdfbdfb' },
					{ title: '333333', content: '大苏打' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
					{ title: '44444444', content: '股份大股东' },
				],
			},
			{
				type: 1,
				name: '设备一消息',
				value: '8',
				list: [
					{ title: 'dasdas', content: 'qweqwdsadasd' },
					{ title: 'bv', content: 'bdfbdfb' },
					{ title: 'yyyyyyyyyt', content: '大苏打' },
				],
			},
			{
				type: 1,
				name: '设备二消息',
				value: '8',
				list: [
					{ title: '1111111', content: 'qweqwdsadasd' },
					{ title: '44444444', content: '股份大股东' },
				],
			},
		],
		message_center_focus: -1,
		message_types_list: [],
	},
	created: function () {
		if (!window.location.search) {
			this.loginToken = window.sessionStorage.loginToken;
			this.userName = window.sessionStorage.userName;
		} else {
			this.getToken();
		}
		this.resItemList();
		this.message_unread();
		this.clear_message_num_timer = setInterval(this.message_unread_timer, 2000);
		this.timer = setInterval(this.getTime, 1000);
		this.clear_message_all_timer = setInterval(this.refresh_message_unread_and_list_both, 3000);
		this.replaceUrl();
	},
	mounted: function () {
		this.clearTimer = setInterval(this.checkPlaceAndRefresh, 5000);
	},
	methods: {
		// 未读条数
		message_unread_timer: function () {
			if (this.nav_bar_click != 1) {
				this.message_unread();
			}
		},
		// 封装的请求方法
		request: function (method, url, user, params1, params2, token, func) {
			axios({
				method: method,
				url: url,
				data: {
					client: 'PC',
					user: user,
					version: '1.0.1',
					data: params1,
					key: params2,
				},
				headers: { token: token },
			}).then((res) => {
				document.getElementById('loading').style.display = 'none';
				if (res.data.code == 1000) {
					func(res);
				} else {
					if (res.data.code == 3005 || res.data.code == 3006) {
						clearInterval(this.clear_message_num_timer);
						clearInterval(this.clearTimer);
						clearInterval(this.clear_message_all_timer);
						this.$alert(res.data.message, '提示', {
							confirmButtonText: '确定',
							callback: () => {
								this.loginToken = null;
								this.userName = null;
								window.sessionStorage.clear();
								window.location.href = './login/login.html';
							},
						});
					} else {
						this.$message.error(res.data.message);
					}
				}
			});
		},
		// 依靠地址栏获取token
		getToken: function () {
			let url = window.location.search;
			let str = url.substring(1);
			let str2 = str.split('&');
			let token = str2[0].split('=');
			this.loginToken = token[1];
			let user = str2[1].split('=');
			this.userName = user[1];
		},
		// 改写url
		replaceUrl: function () {
			let url = window.location.href;
			let str = url.split('?')[0];
			window.history.replaceState('', '', str);
		},
		// 获取当前时间
		getTime: function () {
			let date = new Date();
			// 日期
			let year = date.getFullYear();
			let month = check(date.getMonth() + 1);
			let day = check(date.getDate()); //一月中某一天
			this.calender = year + '.' + month + '.' + day;
			// 星期
			let weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			let week = date.getDay(); //一星期中某一天
			this.weekDay = weeks[week];
			// 当前时间
			let hour = check(date.getHours());
			let minute = check(date.getMinutes());
			let second = check(date.getSeconds());
			this.time = hour + ':' + minute + ':' + second;
			// 检查是否需要补零
			function check(params) {
				let num = params < 10 ? '0' + params : params;
				return num;
			}
		},
		// 跳转大屏
		operationCenter: function () {
			// window.open('http://182.150.116.22:10008/screen/index.html');
			window, open('../大屏项目/screen/screen.html');
		},
		// 退出登录按钮
		returnlogin: function () {
			this.loginToken = null;
			this.userName = null;
			window.sessionStorage.clear();
			window.location.href = './login/login.html';
		},
		// 请求项目列表
		resItemList: function () {
			this.request('post', ProjectUrl, this.userName, { pageNum: this.itemPageNum, pageSize: this.itemPageSize }, '74935343174538', this.loginToken, this.itemList);
		},
		// 请求项目列表后执行
		itemList: function (res) {
			this.item = [];
			this.item = res.data.data.list;
			this.itemTotalPage = res.data.data.totalPage;
			this.clickItem(0);
		},
		// 点击项目切换样式
		clickItem: function (index) {
			this.platformJump = 0;
			this.showDeviceList = false;
			this.item_temp_focus = index;
			this.projectId = this.item[index].projectId;
			this.customerId = this.item[index].customerId;
			this.resPlaceList(this.placePageNum);
		},
		// 请求场所标签列表
		resPlaceList: function (placePageNum) {
			this.tags = [];
			this.request('post', placeUrl, this.userName, { projectId: this.projectId, customerId: this.customerId, pageNum: placePageNum, pageSize: this.placePageSize }, '74935343174538', this.loginToken, this.placeList);
		},
		// 获取场所列表后执行事件
		placeList: function (res) {
			this.tagName = '';
			if (res.data.data.list.length > 0) {
				this.itemFocus = this.item_temp_focus;
				this.tags = res.data.data.list;
				this.clickPlace(0);
				this.clickmanager(0);
				this.showDistributeButton = true;
			} else {
				this.placeDeviceListArray = [];
				this.addSceneDeviceList = [];
				this.timing = [];
				this.manual = [];
				this.placeId = null;
				this.showDistributeButton = false;
				this.$message('当前项目下无场所');
			}
		},
		// 新增场所按钮
		clickNewTag: function () {
			this.newTag = true;
			this.$nextTick(() => {
				this.$refs.inputTag.focus();
			});
		},
		// 添加新场所标签
		resNewPlace: function () {
			this.request('post', addPlaceUrl, this.userName, { name: this.tagName, projectId: this.projectId, customerId: this.customerId }, '74935343174538', this.loginToken, this.addTagSucess);
			this.newTag = false;
		},
		// 新增场所成功提示
		addTagSucess: function () {
			this.$message({
				message: '新建 “' + this.tagName + '” 场所成功',
				type: 'success',
			});
			this.tagName = '';
			this.resPlaceList(this.placePageNum);
		},
		// 编辑场所按钮
		clickEditTag: function () {
			this.editTagName = true;
			this.$nextTick(() => {
				this.$refs.inputTag.focus();
			});
		},
		// 编辑场所
		resEditTag: function () {
			this.request('post', editPlaceTagUrl, this.userName, { id: this.placeId, name: this.tagName, projectId: this.projectId, customerId: this.customerId }, '74935343174538', this.loginToken, this.editTagNameSuccess);
			this.editTagName = false;
		},
		// 编辑场所成功提示
		editTagNameSuccess: function () {
			this.$message({
				message: '修改 “' + this.tagName + '” 场所成功',
				type: 'success',
			});
			this.tagName = '';
			this.resPlaceList(this.placePageNum);
		},
		// 新建项目按钮
		clickNewItem: function () {
			this.newItem = true;
			this.$nextTick(() => {
				this.$refs.inputTag.focus();
			});
		},
		// 添加新项目标签
		resNewItem: function () {
			this.request('post', addItemUrl, this.userName, { type: 'project', projectName: this.itemName, customerId: this.customerId }, '74935343174538', this.loginToken, this.addItemSuccess);
			this.newItem = false;
		},
		// 新增项目成功提示
		addItemSuccess: function () {
			location.reload();
			this.$message({
				message: '新建 “' + this.itemName + '” 项目成功',
				type: 'success',
			});
			this.resItemList();
		},
		// 删除场所标签
		resCloseTag: function (id) {
			this.$confirm('是否删除场所?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.request('post', placeDeleteUrl, this.userName, { id: id }, '74935343174538', this.loginToken, this.closeTag);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		// 关闭场所标签后刷新场所列表并删除关闭场所的设备
		closeTag: function (res) {
			this.$message({
				message: '删除场所成功',
				type: 'success',
			});
			this.showDeviceList = false;
			this.resPlaceList(1);
		},
		// 点击场所切换样式之后所取用的场所ID就取自这里
		clickPlace: function (index) {
			this.platformJump = 0;
			this.showDeviceList = false;
			this.placeFocus = index;
			this.placeId = this.tags[index].placeId;
			// 点击场所时不刷新消息列表
			this.nav_bar_click = -1;
			this.clickmanager(0);
			switch (this.managerFocus) {
				case 0:
					this.resPlaceDeviceList();
					break;
				case 1:
					this.resSceneDetail();
					break;
			}
		},
		// 请求场所设备列表详情
		resPlaceDeviceList: function () {
			this.request('post', placeDeviceListUrl, this.userName, { pageNum: 1, placeId: this.placeId, pageSize: 999 }, '74935343174538', this.loginToken, this.placeDeviceList);
		},
		// 获取场所内容后执行
		placeDeviceList: function (res) {
			this.placeDeviceListArray = [];
			this.placeDeviceListArray = res.data.data.list;
		},
		// 点击显示可分配设备列表
		showDeviceListButton: function () {
			this.showDeviceList = !this.showDeviceList;
			if (this.showDeviceList) {
				this.resDeviceList();
			}
		},
		// 请求可分配设备列表
		resDeviceList: function () {
			this.request('post', deviceListUrl, this.userName, { pageNum: 1, pageSize: 999, placeId: this.placeId }, '74935343174538', this.loginToken, this.deviceList);
		},
		// 获取可分配设备后执行
		deviceList: function (res) {
			this.allDeviceList = [];
			this.allDeviceList = res.data.data.list;
			for (let i = 0; i < this.allDeviceList.length; i++) {
				this.allDeviceList[i].checked = false;
			}
		},
		// 添加设备到场所
		resAddDevice: function (deviceIdList) {
			this.request('post', addDeviceUrl, this.userName, { deviceIdList: deviceIdList, placeId: this.placeId }, '74935343174538', this.loginToken, this.refresh);
		},
		// 删除设备
		resDleteDevice: function (idList) {
			this.request('post', deleteDeviceUrl, this.userName, { idList: idList }, '74935343174538', this.loginToken, this.refresh);
		},
		// 刷新场所和列表
		refresh: function () {
			this.resDeviceList();
			this.resPlaceDeviceList();
		},
		// 请求场景详情
		resSceneDetail: function () {
			this.showAddScene = false;
			this.showEditScene = false;
			if (this.placeId) {
				this.request('post', sceneDetailUrl, this.userName, { placeId: this.placeId }, '74935343174538', this.loginToken, this.sceneDetail);
			}
		},
		// 获取场景内容后执行
		sceneDetail: function (res) {
			this.timing = res.data.data.timing;
			this.manual = res.data.data.manual;
			for (let i = 0; i < this.timing.length; i++) {
				if (this.timing[i].status == 0) {
					this.timing[i].switch0or1 = false;
				} else {
					this.timing[i].switch0or1 = true;
				}
			}
		},
		// 保存或修改新场景
		resNewScene: function () {
			let reg = /\s/;
			let exeDate = '';
			let checkedDeviceList = [];
			for (let i = 0; i < 7; i++) {
				if (this.selectWeeks[i].checked) {
					exeDate += this.selectWeeks[i].date;
				}
			}
			if (this.sceneName.length < 1 || reg.test(this.sceneName)) {
				this.$message({
					message: '场景名不能为空或含有空格',
					type: 'error',
				});
			} else {
				for (let i = 0; i < this.addSceneDeviceList.length; i++) {
					if (this.addSceneDeviceList[i].checked) {
						if (this.addSceneDeviceList[i].platform == 2) {
							let obj = {};
							obj.deviceId = this.addSceneDeviceList[i].deviceId;
							obj.param = {};
							obj.param.paramVolume = this.addSceneDeviceList[i].param.paramVolume;
							checkedDeviceList.push(obj);
						} else if (this.addSceneDeviceList[i].platform == 3) {
							let obj = {};
							obj.deviceId = this.addSceneDeviceList[i].deviceId;
							obj.param = {};
							obj.param.paramUser = this.addSceneDeviceList[i].param.paramUser;
							obj.param.paramOrder = this.addSceneDeviceList[i].param.paramOrder;
							checkedDeviceList.push(obj);
						} else {
							let obj = {};
							obj.deviceId = this.addSceneDeviceList[i].deviceId;
							obj.param = {};
							checkedDeviceList.push(obj);
						}
					}
				}
				if (this.showAddScene) {
					this.request('post', addSceneUrl, this.userName, { scene: { placeId: this.placeId, sceneName: this.sceneName, type: this.sceneType, startTime: this.startTime, exeDate: exeDate, status: 1 }, deviceList: checkedDeviceList }, '74935343174538', this.loginToken, this.resSceneDetail);
				} else if (this.showEditScene) {
					this.request('post', addSceneUrl, this.userName, { scene: { id: this.sceneId, placeId: this.placeId, sceneName: this.sceneName, type: this.sceneType, startTime: this.startTime, exeDate: exeDate, status: this.sceneStatus }, deviceList: checkedDeviceList }, '74935343174538', this.loginToken, this.resSceneDetail);
				}
			}
		},
		// 切换-自动执行-开关状态
		switchStatus: function (i) {
			this.request('post', updateSceneStatusUrl, this.userName, { sceneId: i.sceneId }, '74935343174538', this.loginToken, this.resSceneDetail);
			this.$forceUpdate();
		},
		// 删除场景
		delScene: function (i) {
			this.$confirm('是否删除场景？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.request('post', delSceneUrl, this.userName, { sceneId: i.sceneId }, '74935343174538', this.loginToken, this.afterDelScene);
				})
				.catch(() => {
					this.$message({
						message: '已取消删除',
						type: 'info',
					});
				});
		},
		// 删除场景的后续操作
		afterDelScene: function () {
			this.$message({
				message: '删除场景成功',
				type: 'success',
			});
			this.resSceneDetail();
		},
		// 手动场景执行
		resManualScene: function (i) {
			this.request('post', updateSceneStatusUrl, this.userName, { sceneId: i.sceneId }, '74935343174538', this.loginToken, this.resSceneDetail);
		},
		// 拖拽到卡包
		dragstartToAdd: function (e, i) {
			this.deviceId = i.id;
			this.draging = e.target.classList[0];
		},
		// 拖拽到删除
		dragstartToDel: function (e, i) {
			this.deviceLinkToPlaceId = i.id;
			this.draging = e.target.classList[0];
		},
		// 拖拽过程
		dragOver: function (e) {
			e.dataTransfer.dropEffect = 'move';
		},
		// 拖拽到卡包
		dropCardBag: function (e) {
			e.preventDefault();
			if (this.tags.length == 0) {
				this.$message.error('场所列表不能为空');
			} else {
				if (this.draging === 'deviceNum') {
					let deviceIdList = [];
					deviceIdList.push(this.deviceId);
					this.resAddDevice(deviceIdList);
				}
			}
		},
		// 拖拽到删除区域
		dropDelete: function (e) {
			e.preventDefault();
			this.tipsOfDeleteDevice = true;
		},
		// 点击确认删除
		deleteTipsButton: function (e) {
			if (e.target.classList[1] === 'confirm') {
				let idList = [];
				idList.push(this.deviceLinkToPlaceId);
				this.resDleteDevice(idList);
			}
			this.tipsOfDeleteDevice = false;
		},
		// 如果输入框为空则刷新列表
		ifDeviceInputIsEpt: function () {
			if (this.deviceInput == '') {
				this.request('post', deviceListUrl, this.userName, { pageNum: 1, pageSize: 999, placeId: this.placeId }, '74935343174538', this.loginToken, this.deviceList);
			}
		},
		// 搜索按钮
		searchAllDeviceList: function () {
			this.request('post', deviceListUrl, this.userName, { pageNum: 1, pageSize: 9999, placeId: this.placeId, filed: this.deviceInput }, '74935343174538', this.loginToken, this.deviceList);
			this.showPower = true;
		},
		// 点保存批量添加设备到场所
		batchAddDevice: function () {
			let deviceIdList = [];
			for (let i = 0; i < this.allDeviceList.length; i++) {
				if (this.allDeviceList[i].checked) {
					deviceIdList.push(this.allDeviceList[i].id);
				}
			}
			this.resAddDevice(deviceIdList);
		},
		// 设备卡片中间的按钮跳转
		goToCommand: function (i) {
			this.deviceId = i.deviceId;
			this.imgSrc = i.modelPictureUrl;
			switch (i.platform) {
				case 1:
					window.open('http://182.150.116.22:10008/power/index.html?token=' + this.loginToken + '&zh=' + this.userName + '&sbid=' + i.deviceId);
					break;
				case 2:
					this.request('post', soundDeviceDetailUrl, this.userName, { id: this.deviceId }, '74935343174538', this.loginToken, this.soundDeviceDetail);
					break;
				case 3:
					// window.open("HushanIotStudio://" + this.loginToken + " " + i.platform + " " + i.projectId + " " + i.groupId + " " + i.deviceId);
					window.sessionStorage.deviceId = i.deviceId;
					window.open(`../专业设备web版/HiFi.html?token=${this.loginToken}&deviceId=${this.deviceId}`);
					break;
				case 4:
					console.log('4');
					break;
				case 5:
					switch (i.type) {
						case '视频管理':
							window.open('HsDimmerVideoPlayer://@' + window.sessionStorage.videoDeviceUrl + '@123123');
							break;
						case '音频管理':
							this.checkPlatform = 5;
							this.eduDeivceList = [];
							break;
						case '环境控制':
							window.open('http://hs.m2m.city/#/login?username=hushan&password=6570ca231c5e505dd9e347ad69004452');
							break;
						case '智能温度':
							this.smartTempCtrl = true;
							break;
						default:
							this.eduDevicecheckAllFlag = 1;
							this.checkEduDeviceHasConfig();
							this.resGetEduDeviceList();
							break;
					}
			}
		},
		// 跳转广播设备卡片
		soundDeviceDetail: function (res) {
			this.checkPlatform = 2;
			this.soundDeviceNameInput = res.data.data.name;
			switch (res.data.data.power) {
				case 1:
					this.autoPowerFocus = true;
					break;
				case 2:
					this.autoPowerFocus = false;
					break;
			}
			this.volumeInput = res.data.data.vol;
			this.soundDeviceConnectStatus = res.data.data.status;
			switch (this.soundDeviceConnectStatus) {
				case 0:
					this.soundDeviceConnect = '已连接';
					break;
				case 1:
					this.soundDeviceConnect = '未连接';
					break;
			}
			this.soundDeviceIp = res.data.data.ip;
			this.soundDeviceSessionStatus = res.data.data.sessionStatus;
		},
		// 点击保存广播或教育设备参数
		resEditSoundDevice: function () {
			let reg = /\s/;
			let reg2 = /^(0|[1-9]|[1-5][0-9]|6[0-4])$/;
			switch (this.checkPlatform) {
				case 2:
					if (this.autoPowerFocus) {
						this.soundDevicePower = 1;
					} else {
						this.soundDevicePower = 2;
					}
					if (this.soundDeviceNameInput.length < 1 || reg.test(this.soundDeviceNameInput)) {
						this.$message.error('终端名不能为空或含有空格');
					} else if (!reg2.test(this.volumeInput)) {
						this.$message.error('只能为0~64的数字');
					} else {
						this.request('post', soundDeviceEditUrl, this.userName, { power: this.soundDevicePower, vol: Number(this.volumeInput), id: this.deviceId, cmd: 1 }, 'hsIot/cmd/' + this.deviceId, this.loginToken, this.editSoundDeviceConfig);
					}
					break;
				case 5:
					this.checkedEduDeviceID = [];
					for (let i = 0; i < this.eduDeivceList.length; i++) {
						if (this.eduDeivceList[i].checked == true) {
							this.checkedEduDeviceID.push(this.eduDeivceList[i].id);
						}
						this.eduDeivceList[i].isPushSuccess = -1;
					}
					this.eduDeviceLoading();
					break;
			}
		},
		// 保存广播设备参数后执行改名操作
		editSoundDeviceConfig: function () {
			this.request('post', editSoundDeviceNameUrl, this.userName, { id: this.deviceId, name: this.soundDeviceNameInput }, '74935343174538', this.loginToken, this.editSoundDeviceTips);
		},
		// 广播改名成功后提示
		editSoundDeviceTips: function () {
			this.checkPlatform = -1;
			this.resPlaceDeviceList();
			this.$message.success('下发成功');
		},
		// 教育设备下发时loading遮罩
		async eduDeviceLoading() {
			this.eduDevicePushLoading = true;
			await this.request('post', saveEduDeviceConfigUrl, this.userName, { srcDeviceId: this.deviceId, tarDeviceIdList: this.checkedEduDeviceID }, '74935343174538', this.loginToken, this.editEduDeviceTips);
		},
		// 保存教育设备参数成功提示
		editEduDeviceTips: function (res) {
			let array = res.data.data;
			for (let a = 0; a < this.checkedEduDeviceID.length; a++) {
				for (let b = 0; b < this.eduDeivceList.length; b++) {
					if (this.checkedEduDeviceID[a] == this.eduDeivceList[b].id) {
						this.eduDeivceList[b].isPushSuccess = array[a];
					}
				}
			}
			this.eduDevicePushLoading = false;
		},
		// 有教育设备配置后执行
		resEduDeviceDetail: function () {
			axios({
				method: 'post',
				url: getEduDeviceCfgUrl,
				data: {
					client: 'PC',
					user: '',
					version: '1.0.1',
					data: {
						deviceId: this.deviceId,
					},
					key: '74935343174538',
				},
				headers: { token: this.loginToken },
			}).then((res) => {
				if (res.data.code == 1000) {
					document.getElementById('loading').style.display = 'none';
				} else {
					document.getElementById('loading').style.display = 'none';
					this.$alert(res.data.message, '提示', {
						confirmButtonText: '确定',
						callback: () => {
							if (res.data.code == 3005 || res.data.code == 3006) {
								window.location.href = './login/login.html';
							}
						},
					});
				}
			});
		},
		// 教育设备是跨场所的，获取所有场所下的教育设备
		resGetEduDeviceList: function () {
			this.checkPlatform = 5;
			this.request('post', getAllPlaceEduDeviceUrl, this.userName, { currentPage: 1, pageSize: 9999, platform: this.checkPlatform, isOnline: '1' }, '74935343174538', this.loginToken, this.getEduDeviceList);
		},
		// 获取教育设备后执行
		getEduDeviceList: function (res) {
			this.eduDeivceList = [];
			this.eduDeivceList = res.data.data.list;
			for (let i = 0; i < this.eduDeivceList.length; i++) {
				this.eduDeivceList[i].checked = false;
			}
		},
		// 查询是否有教育设备配置
		checkEduDeviceHasConfig: function () {
			axios({
				method: 'post',
				url: checkEduDeviceCfg,
				data: {
					client: 'PC',
					user: '',
					version: '1.0.1',
					data: {
						deviceId: this.deviceId,
					},
					key: '74935343174538',
				},
				headers: { token: this.loginToken },
			}).then((res) => {
				if (res.data.code == 1000) {
					document.getElementById('loading').style.display = 'none';
					this.resEduDeviceDetail();
				} else {
					document.getElementById('loading').style.display = 'none';
					this.$alert(res.data.message, '提示', {
						confirmButtonText: '确定',
						callback: () => {
							if (res.data.code == 3005 || res.data.code == 3006) {
								window.location.href = './login/login.html';
							}
						},
					});
				}
			});
		},
		// 日期全选
		selectAll: function () {
			for (let i = 0; i < 7; i++) {
				this.selectWeeks[i].checked = true;
			}
		},
		// 清除日期选择
		clearAll: function () {
			for (let i = 0; i < 7; i++) {
				this.selectWeeks[i].checked = false;
			}
		},
		// 勾选新建场景设备
		addSceneDevice: function (i) {
			let count = 0;
			i.checked = !i.checked;
			for (let i = 0; i < this.addSceneDeviceList.length; i++) {
				if (this.addSceneDeviceList[i].checked == true) {
					count++;
				}
			}
			if (count === this.addSceneDeviceList.length) {
				this.checkAllFlag = 3;
				this.checkAll = true;
			} else if (count > 0 && count < this.addSceneDeviceList.length) {
				this.checkAllFlag = 2;
				this.checkAll = false;
			} else {
				this.checkAllFlag = 1;
				this.checkAll = false;
			}
			this.$forceUpdate();
		},
		// 新建场景设备配置
		sceneDeviceConfig: function (i, index) {
			this.sceneDeviceSelected = index;
			this.configPlatform = i.platform;
			switch (i.platform) {
				case 2:
					this.deviceId = i.deviceId;
					this.request('post', soundDeviceDetailUrl, this.userName, { id: this.deviceId }, '74935343174538', this.loginToken, this.soundDeviceConfig);
					break;
				case 3:
					this.deviceId = i.deviceId;
					this.request('post', userGroupAndSeqUrl, this.userName, { deviceId: this.deviceId }, '74935343174538', this.loginToken, this.userGroupAndSeq);
					break;
			}
		},
		// 广播设备点击配置后执行
		soundDeviceConfig: function (res) {
			this.setUserGroupAndOrder = true;
			this.addSceneDeviceList[this.sceneDeviceSelected].param.paramVolume = res.data.data.vol;
			this.soundDevicePower = res.data.data.power;
		},
		// 专业设备点击配置后执行
		userGroupAndSeq: function (res) {
			this.setUserGroupAndOrder = true;
			this.groupMin = res.data.data.minUser;
			this.groupMax = res.data.data.maxUser;
			this.orderMin = res.data.data.minOrder;
			this.orderMax = res.data.data.maxOrder;
		},
		// 关闭配置按钮后保存设置
		saveConfigSet: function () {
			switch (this.configPlatform) {
				case 2:
					this.request('post', soundDeviceEditUrl, this.userName, { power: this.soundDevicePower, vol: this.addSceneDeviceList[this.sceneDeviceSelected].param.paramVolume, id: this.deviceId, cmd: 1 }, 'hsIot/cmd/' + this.deviceId, this.loginToken, function () {});
					break;
				case 3:
					break;
			}
			this.setUserGroupAndOrder = false;
		},
		// 新建场景设备全选
		addSceneCheckAll: function () {
			this.checkAll = !this.checkAll;
			if (this.checkAll) {
				for (let i = 0; i < this.addSceneDeviceList.length; i++) {
					this.addSceneDeviceList[i].checked = true;
					this.checkAllFlag = 3;
				}
			} else {
				for (let i = 0; i < this.addSceneDeviceList.length; i++) {
					this.addSceneDeviceList[i].checked = false;
					this.checkAllFlag = 1;
				}
			}
		},
		// 教育设备全选
		eduDeviceCheckAll: function () {
			this.educheckAll = !this.educheckAll;
			if (this.educheckAll) {
				for (let i = 0; i < this.eduDeivceList.length; i++) {
					this.eduDeivceList[i].checked = true;
					this.eduDevicecheckAllFlag = 3;
				}
			} else {
				for (let i = 0; i < this.eduDeivceList.length; i++) {
					this.eduDeivceList[i].checked = false;
					this.eduDevicecheckAllFlag = 1;
				}
			}
		},
		// 勾选教育设备
		addEduDevice: function (i) {
			let count = 0;
			i.checked = !i.checked;
			for (let i = 0; i < this.eduDeivceList.length; i++) {
				if (this.eduDeivceList[i].checked == true) {
					count++;
				}
			}
			if (count == this.eduDeivceList.length) {
				this.eduDevicecheckAllFlag = 3;
				this.educheckAll = true;
			} else if (count == 0) {
				this.eduDevicecheckAllFlag = 1;
				this.educheckAll = false;
			} else {
				this.eduDevicecheckAllFlag = 2;
				this.educheckAll = false;
			}
			this.$forceUpdate();
		},
		// 切换右边栏管理器
		clickmanager: function (index) {
			this.refresh_place_device = false;
			this.managerFocus = index;
			// 关闭场所管理器弹框
			this.showDeviceList = false;
			switch (index) {
				case 0:
					this.refresh_place_device = true;
					this.resPlaceDeviceList();
					break;
				case 1:
					this.resSceneDetail();
					break;
				case 2:
					this.alert_button_focus = 0;
					break;
			}
		},
		// 点击新建场景按钮显示并设置初始值
		clickSceneButton: function () {
			this.addSceneDeviceList = this.placeDeviceListArray;
			// 新建场景里的设备列表，进行再构造将所有设备的特有属性
			for (let i = 0; i < this.addSceneDeviceList.length; i++) {
				this.addSceneDeviceList[i].checked = false;
				this.addSceneDeviceList[i].param = {};
				this.addSceneDeviceList[i].param.paramUser = 0;
				this.addSceneDeviceList[i].param.paramOrder = 0;
				this.addSceneDeviceList[i].param.paramVolume = 0;
			}
			this.showAddScene = true;
			this.sceneName = '';
			this.sceneType = 2;
			this.startTime = '';
			this.showWeekContainer = false;
			this.clearAll();
			this.checkAllFlag = 1;
			this.checkAll = false;
		},
		// 点击编辑按钮查看修改
		clickSceneEditButton: function (i) {
			this.showEditScene = true;
			this.showWeekContainer = false;
			this.sceneId = i.sceneId;
			// 循环改值前先回溯到初始值
			for (let i = 0; i < 7; i++) {
				this.selectWeeks[i].checked = false;
			}
			this.request('post', sceneDetailUrl, this.userName, { sceneId: i.sceneId, placeId: this.placeId }, '74935343174538', this.loginToken, this.editScene);
		},
		// 查询场景后执行
		editScene: function (res) {
			if (res.data.data.timing.length == 0) {
				this.sceneEdit = res.data.data.manual[0];
			} else {
				this.sceneEdit = res.data.data.timing[0];
			}
			this.addSceneDeviceList = this.sceneEdit.deviceList;
			this.sceneName = this.sceneEdit.sceneName;
			this.sceneType = this.sceneEdit.type;
			this.startTime = this.sceneEdit.startTime;
			let array = this.sceneEdit.exeDate.split('');
			for (let i = 0; i < array.length; i++) {
				this.selectWeeks[Number(array[i]) - 1].checked = true;
			}
			this.sceneStatus = this.sceneEdit.status;
			for (let i = 0; i < this.addSceneDeviceList.length; i++) {
				if (this.addSceneDeviceList[i].flag == 1) {
					this.addSceneDeviceList[i].checked = true;
				} else if (this.addSceneDeviceList[i].flag == 0) {
					this.addSceneDeviceList[i].checked = false;
				}
			}
			let count = 0;
			for (let i = 0; i < this.addSceneDeviceList.length; i++) {
				if (this.addSceneDeviceList[i].checked == true) {
					count++;
				}
			}
			if (count === this.addSceneDeviceList.length) {
				this.checkAllFlag = 3;
				this.checkAll = true;
			} else if (count > 0 && count < this.addSceneDeviceList.length) {
				this.checkAllFlag = 2;
				this.checkAll = false;
			} else {
				this.checkAllFlag = 1;
				this.checkAll = false;
			}
			this.$forceUpdate();
		},
		// 展开可分配设备列表
		showPowerList: function () {
			this.showPower = !this.showPower;
			this.$forceUpdate();
		},
		// 替换图片
		switchImg: function (e, url) {
			e.target.src = url;
		},
		// 关闭视频设备弹框后保存到本地
		saveVideoDeviceIpToSession: function () {
			window.sessionStorage.videoDeviceUrl = this.videoDeviceUrl;
			this.videoDeviceIP = false;
		},
		// 强制更新可分配设备列表渲染效果
		forceUpdateAlldeviceList: function (i) {
			i.checked = !i.checked;
			this.$forceUpdate();
		},
		// 查询告警规则
		res_alert_rule_detail: function () {
			this.request('post', refer_alert_rule, this.userName, { pageNum: 1, pageSize: 999 }, '74935343174538', this.loginToken, this.refer_alert_rule_detail);
		},
		// 点击切换告警按钮
		click_alert: function (index) {
			this.alert_button_focus = index;
			if (this.alert_button_focus == 1) {
				this.res_alert_rule_detail();
			}
		},
		// 查询告警规则
		refer_alert_rule_detail: function (res) {
			this.refer_alert_rule_list = res.data.data.list;
		},
		// 编辑告警规则
		edit_alert_rule: function (alert_rule) {
			this.alert_rule_id = alert_rule.id;
			this.alert_rule_status = alert_rule.status;
			this.new_and_edit_alert_rule = 2;
		},
		// 点击新建告警规则按钮
		new_alert_rule: function () {
			this.new_and_edit_alert_rule = 1;
			for (let i of this.alert_method_options) {
				i.check = false;
			}
			this.alert_method_no_check = true;
		},
		// 将选中的告警规则添加到显示列表
		checked_alert_rule_method: function (option) {
			option.check = !option.check;
			for (let i of this.alert_method_options) {
				if (i.check) {
					this.alert_method_no_check = false;
					return;
				}
			}
			this.alert_method_no_check = true;
		},
		// 保存并发送告警规则请求
		save_alert_rule: function () {
			let _this = this;
			// 选项不能为空
			let reg = /\s/;
			let flag = false;
			for (let i of this.alert_method_options) {
				if (i.check) {
					flag = true;
					break;
				}
			}
			if (reg.test(this.alert_content) || this.alert_content.length < 1) {
				this.$message.error('告警内容不能为空或含有空格');
			} else if (!flag) {
				this.$message.error('必须选择通知方式');
			} else {
				let context = [];
				context.push(this.alert_content);
				let method = [];
				for (let i of this.alert_method_options) {
					if (i.check) {
						method.push(i.name);
					}
				}
				if (this.new_and_edit_alert_rule == 1) {
					this.request('post', res_new_alert_url, this.userName, { context: context, method: method }, '74935343174538', this.loginToken, function () {
						_this.res_alert_rule_detail();
						_this.new_and_edit_alert_rule = 0;
						_this.alert_content = '';
						for (let i of _this.alert_method_options) {
							i.check = false;
						}
					});
				} else if (this.new_and_edit_alert_rule == 2) {
					this.request('post', res_edit_alert_url, this.userName, { id: this.alert_rule_id, method: method, context: context, status: this.alert_rule_status }, '74935343174538', this.loginToken, function () {
						_this.res_alert_rule_detail();
						_this.new_and_edit_alert_rule = 0;
						_this.alert_content = '';
						for (let i of _this.alert_method_options) {
							i.check = false;
						}
					});
				}
			}
		},
		// 规则界面直接禁用
		ban_alert_rule: function (alert_rule) {
			let _this = this;
			if (alert_rule.status == 1) {
				this.request('post', res_edit_alert_url, this.userName, { id: alert_rule.id, status: 0 }, '74935343174538', this.loginToken, function () {
					_this.res_alert_rule_detail();
				});
			}
		},
		// 规则界面直接恢复
		recover_alert_rule: function (alert_rule) {
			let _this = this;
			if (alert_rule.status == 0) {
				this.request('post', res_edit_alert_url, this.userName, { id: alert_rule.id, status: 1 }, '74935343174538', this.loginToken, function () {
					_this.res_alert_rule_detail();
				});
			}
		},
		// 跳转消息中心
		left_bar_turn_to: function (par) {
			switch (par) {
				case 0:
					window.open(`${userCenterLink}?token=${this.loginToken}&zh=${this.userName}`);
					break;
				case 1:
					this.nav_bar_click = par;
					this.platformJump = 1;
					//this.managerFocus = -1;//managerFocus层级比platformJump低，理应不用特意更改，但是为了停止定时任务执行还是要设置一下
					this.refresh_place_device = false;
					this.res_message_center_list();
					break;
				case 2:
					break;
				case 3:
					this.nav_bar_click = par;
					this.platformJump = 1;
					// this.managerFocus = -1;
					this.refresh_place_device = false;
					this.download_center_jump = 0;
					break;
				case 4:
					if (this.managerFocus == 0) {
						this.refresh_place_device = true;
					}
					this.platformJump = 0;
					break;
			}
		},
		// 同时刷新消息列表和未读消息数
		refresh_message_unread_and_list_both: function () {
			if (!this.message_detail_display) {
				if (this.nav_bar_click == 1) {
					this.message_unread();
					this.res_message_center_list();
				}
			}
		},
		// 请求消息中心列表
		res_message_center_list: function () {
			let _this = this;
			this.request('post', res_message_center_list_url, this.userName, { currentPage: 1, pageSize: 999 }, '74935343174538', this.loginToken, function (res) {
				_this.message_center_list = res.data.data.list;
			});
		},
		// 用户未读消息条数
		message_unread: function () {
			axios({
				method: 'post',
				url: res_message_unread_url,
				data: {
					client: 'PC',
					user: this.userName,
					version: '1.0.1',
					data: {},
					key: '74935343174538',
				},
				headers: { token: this.loginToken },
			}).then((res) => {
				document.getElementById('loading').style.display = 'none';
				if (res.data.code == 1000) {
					if (res.data.data) {
						this.message_badge_hidden = false;
						this.message_center_badge = res.data.data;
					} else {
						this.message_badge_hidden = true;
					}
				} else {
					if (res.data.code == 3005 || res.data.code == 3006) {
						this.$alert(res.data.message, '提示', {
							confirmButtonText: '确定',
							callback: () => {
								window.location.href = './login/login.html';
							},
						});
					} else {
						this.$message.error(res.data.message);
					}
				}
			});
		},
		// 点击未读消息减少条数
		check_message_unread: function (list) {
			let _this = this;
			if (list.isRead == 0) {
				this.request('post', res_message_isread_url, this.userName, { messageId: list.id }, '74935343174538', this.loginToken, function (res) {
					_this.message_center_badge = res.data.data;
					list.isRead = 1;
				});
			}
			this.request('post', res_message_detail_url, this.userName, { messageId: list.id }, '74935343174538', this.loginToken, function (res) {
				_this.message_center_detail = res.data.data;
			});
			this.message_detail_display = true;
		},
		// 下载中心模块列表
		download_sort: function (type) {
			this.request('post', res_download_module_list_url, this.userName, { currentPage: 1, pageSize: 13, type: type }, 'test123', this.loginToken, (res) => {
				this.download_center_sort_type = type;
				this.download_center_jump = 1;
				this.download_center_list = res.data.data;
			});
		},
		// 查看下载中心详情
		res_download_center_list_detail: function (id) {
			this.request('post', res_download_module_detail_url, this.userName, { id: id }, 'test123', this.loginToken, (res) => {
				this.download_center_jump = 2;
				this.download_center_detail = res.data.data;
			});
		},
		// 下载中心下载
		download_center_list_download: function (down_url) {
			// axios({
			// 	method: 'get',
			// 	url: down_url,
			// 	data: {},
			// 	responseType: 'blob',
			// 	header: {
			//     'Content-Type': 'application/x-download',
			// 	},
			// }).then((res) => {
			// 	console.log(res);
			// });
			// console.log(down_url);
			// let a = new Blob([down_url]);
			// console.log(a);
			// let b = URL.createObjectURL(a);
			// console.log(b);
			// let c = document.createElement('a');
			// c.href = b;
			// c.download = '456';
			// c.click();
			let b = new Blob([down_url]);
			let a = document.createElement('a');
			a.href = URL.createObjectURL(b);
			// a.download = down_url.split('/').pop();
			a.target = '_blank';
			document.body.appendChild(a);
			a.click();
			// var x = new XMLHttpRequest();
			// x.open('GET', down_url + '?t=' + new Date().getTime(), true);
			// x.responseType = 'blob';
			// x.onload = function (e) {
			// 	var url = window.URL.createObjectURL(x.response);
			// 	var a = document.createElement('a');
			// 	a.href = url;
			// 	a.download = 'name';
			// 	a.click();
			// };
			// x.send();
		},
		// 设备管理轮询
		checkPlaceAndRefresh: function () {
			if (this.tags.length != 0) {
				if (this.placeId) {
					if (this.refresh_place_device) {
						this.resPlaceDeviceList();
					}
				}
			}
		},
		// 下载中心搜索列表
		res_download_list_search: function (type) {
			console.log('搜索');
			this.request('post', res_download_module_list_url, this.userName, { currentPage: 1, pageSize: 13, type: type, name: this.download_list_search }, 'test123', this.loginToken, (res) => {
				this.download_center_list = res.data.data;
			});
		},
		// 下载中心搜索为空
		download_list_search_ept: function (type) {
			if (this.download_list_search == '') {
				this.request('post', res_download_module_list_url, this.userName, { currentPage: 1, pageSize: 13, type: type }, 'test123', this.loginToken, (res) => {
					this.download_center_list = res.data.data;
				});
			}
		},
		// 下载列表上翻页
		download_list_pre_page: function (type) {
			if (this.download_center_list.currentPage > 1) {
				if (this.download_list_search == '') {
					this.request('post', res_download_module_list_url, this.userName, { currentPage: this.download_center_list.currentPage - 1, pageSize: 13, type: type }, 'test123', this.loginToken, (res) => {
						this.download_center_list = res.data.data;
					});
				} else {
					this.request('post', res_download_module_list_url, this.userName, { currentPage: this.download_center_list.currentPage - 1, pageSize: 13, type: type, name: this.download_list_search }, 'test123', this.loginToken, (res) => {
						this.download_center_list = res.data.data;
					});
				}
			}
		},
		// 列表下翻
		download_list_next_page: function (type) {
			if (this.download_center_list.currentPage < this.download_center_list.totalPage) {
				if (this.download_list_search == '') {
					this.request('post', res_download_module_list_url, this.userName, { currentPage: this.download_center_list.currentPage + 1, pageSize: 13, type: type }, 'test123', this.loginToken, (res) => {
						this.download_center_list = res.data.data;
					});
				} else {
					this.request('post', res_download_module_list_url, this.userName, { currentPage: this.download_center_list.currentPage + 1, pageSize: 13, type: type, name: this.download_list_search }, 'test123', this.loginToken, (res) => {
						this.download_center_list = res.data.data;
					});
				}
			}
		},
		// 临时
		res_message_list: function (type, index) {
			this.message_center_focus = index;
			this.message_types_list = type.list;
		},
	},
});

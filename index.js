let url = 'http://182.150.116.22:20000/';//统一前缀

var index = new Vue({
    el: '#index',
    data: {
        ProjectUrl: url + 'api/deviceOrg/getProjectList',
        placeUrl: url + 'api/place/list',
        addPlaceUrl: url + 'api/place/new',
        addItemUrl: url + 'api/deviceOrg/addDeviceOrg',
        placeDeleteUrl: url + 'api/place/delete',
        placeDeviceListUrl: url + 'api/place/device/p/list',
        sceneDetailUrl: url + 'api/scene/getScene',
        addSceneUrl: url + 'api/scene/addScene',
        updateSceneStatusUrl: url + 'api/scene/updateSceneStatus',
        delSceneUrl: url + 'api/scene/delScene',
        deviceListUrl: url + 'api/place/device/u/list',
        addDeviceUrl: url + 'api/place/device/add',
        deleteDeviceUrl: url + 'api/place/device/remove',
        userGroupAndSeqUrl: url + 'api/scene/getMaxUserAndOrderList',
        editPlaceTagUrl: url + 'api/place/modify',
        soundDeviceDetailUrl: url + 'api/radio/detail',
        soundDeviceEditUrl: url + 'api/radio/send',
        checkEduDeviceCfg: url + 'api/education/checkDeviceConfigure',
        getEduDeviceCfgUrl: url + 'api/education/getDeviceConfigure',
        saveEduDeviceConfigUrl: url + 'api/education/pushDeviceConfigure',
        editSoundDeviceNameUrl: url + 'api/radio/update',
        getAllPlaceEduDeviceUrl: url + 'api/device/list',
        oldPlatformPageUrl: url + 'api/homePage/getAppList',
        oldPlatformModuleImgPrefix: 'http://182.150.116.22:10008/usr/local/home/static/power',
        calender: '',//日期
        weekDay: '',//星期
        time: '',//当前时间
        timer: {},//清除计时器
        badge: true,//消息提示
        loginToken: '',//登陆获取的密匙
        itemPageNum: 1,//项目第一页
        itemPageSize: 4,//单页显示数量
        itemTotalPage: '',//总页数
        placePageNum: 1,//场所页码
        placePageSize: 5,//场所单页显示
        placeTotalPage: '',//场所总页数
        currentPage: '',//当前页
        oldPlatformTotalPage: 1,//旧页面总页数
        oldPlatformCurrentPage: 1,//旧页面当前页
        sceneType: 2,//手动/自动场景
        sceneStatus: 0,//指定场景状态
        startTime: '',//自启动时间
        groupMin: 0,//用户组最小值
        groupMax: 0,//用户组最大值
        orderMin: 0,//顺序最小值
        orderMax: 0,//顺序最大值
        sceneDeviceSelected: -1,//点的是哪一个设备配置
        checkPlatform: -1,//点击卡片按钮判断是哪个平台的设备
        configPlatform: -1,//点击配置按钮判断是哪个平台设备
        userName: '',
        showDeviceList: false,//设备列表显示和隐藏
        showPower: false,//电源设备列表
        ableToEdit: false,//编辑备注
        newTag: false,//新建场所输入框可见性
        newItem: false,//新建项目输入框可见
        editTagName: false,//编辑场所名称框可见
        showAddScene: false,//场景列表显示和隐藏
        showEditScene: false,//编辑列表显示和隐藏
        manualFocus: false,//手动场景是否选中
        autoFocus: false,//自动场景
        autoPowerFocus: true,//自动强制电源点选
        setUserGroupAndOrder: false,//新建场景配置框显示
        showWeekContainer: false,//显示日期选择框
        tipsOfDeleteDevice: false,//删除提示
        checkAllFlag: 1,//场景全选标记
        checkAll: false,//全选
        eduDevicecheckAllFlag: 1,//教育设备全选标记
        educheckAll: false,//教育设备全选
        platformJump: false,//跳转到旧页面
        deviceInput: '',//搜索框
        note: '设备备注',//备注
        tagName: '',//场所名
        itemName: '',//项目名
        projectId: '',//项目ID
        customerId: '',//用户ID
        placeId: '',//场所ID
        sceneName: '',//新增场景名
        deviceId: '',//设备ID
        sceneId: '',//场景ID
        imgSrc: '',//存取点击设备的图片地址
        soundDeviceNameInput: '吸顶音响',//广播设备名称
        volumeInput: 0,//广播设备音量
        soundDeviceConnect: '',//广播设备连接状态对应文字
        soundDeviceConnectStatus: -1,//广播设备连接状态
        soundDeviceIp: '',//广播设备IP
        soundDeviceSessionStatus: '',//广播设备任务状态
        soundDevicePower: 1,//广播设备电源
        allDeviceList: [],//所有可添加设备
        tags: [],//标签栏
        timing: [],//定时场景列表
        manual: [],//手动场景列表
        sceneEdit: {},//编辑查看场景时候的列表
        item: [],//项目栏
        placeDeviceListArray: [],//场所已添加设备列表
        addSceneDeviceList: [],//新建场景中的设备列表
        eduDeivceList: [],//筛选出来的教育设备列表
        checkedEduDeviceID: [],//勾选的教育设备ID
        oldPlatformModuleList: [],//当前页下功能模块
        placeFocus: '',//是否选中
        itemFocus: '',
        managerFocus: '',//右边栏中点的是哪个
        // 右边栏
        manager: [
            { name: '设备管理', dark: './img/设备暗.png', light: './img/设备明.png' },
            { name: '场景管理', dark: './img/场景暗.png', light: './img/场景明.png' },
            { name: '平台入口', dark: './img/pingtaian.png', light: './img/pingtailiang.png' }
        ],
        // 选择执行日期
        selectWeeks: [
            { value: '星期一', checked: false, date: 1 },
            { value: '星期二', checked: false, date: 2 },
            { value: '星期三', checked: false, date: 3 },
            { value: '星期四', checked: false, date: 4 },
            { value: '星期五', checked: false, date: 5 },
            { value: '星期六', checked: false, date: 6 },
            { value: '星期日', checked: false, date: 7 }
        ],
        draging: '',//正在拖拽元素
        eduDevicePushLoading: false,//教育设备下发时加载遮罩
        temperature: 23,//模拟室温
        smartTempCtrl: false,//智能温度弹框显示
        temperatureNum: 25,//调温
        videoDeviceUrl: 'HsDimmerVideoPlayer://@rtmp://182.150.116.22:19350/live/hscc123456789-252@123123',//视频设备地址
        videoDeviceIP: false,
    },
    created: function () {
        if (!window.location.search) {
            this.loginToken = window.sessionStorage.loginToken;
            this.userName = window.sessionStorage.userName;
        } else {
            this.getToken();
        }
        this.resItemList();
        this.replaceUrl();
    },
    methods: {
        // 封装的请求方法
        request: function (method, url, params1, params2, token, func) {
            axios({
                method: method,
                url: url,
                data: {
                    client: "PC",
                    user: "",
                    version: "1.0.1",
                    data: params1,
                    key: params2
                },
                headers: { 'token': token }
            })
                .then((res) => {
                    if (res.data.code == 1000) {
                        document.getElementById('loading').style.display = 'none';
                        if (res.data.data) {
                            func(res);
                        } else {
                            this.$message.error('数据为空');
                        }
                    } else {
                        document.getElementById('loading').style.display = 'none';
                        this.$alert(res.data.message, '提示', {
                            confirmButtonText: '确定',
                            callback: () => {
                                if (res.data.code == 3005 || res.data.code == 3006) {
                                    window.location.href = './login/login.html';
                                }
                            }
                        });
                    }
                });
        },
        // 依靠地址栏获取token
        getToken: function () {
            let url = window.location.search;
            let str = url.substring(1);
            let str2 = str.split("&");
            let token = str2[0].split("=");
            this.loginToken = token[1];
            let user = str2[1].split("=");
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
            let day = check(date.getDate());//一月中某一天
            this.calender = year + '.' + month + '.' + day;
            // 星期
            let weeks = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            let week = date.getDay();//一星期中某一天
            this.weekDay = weeks[week];
            // 当前时间
            let hour = check(date.getHours());
            let minute = check(date.getMinutes());
            let second = check(date.getSeconds());
            this.time = hour + ':' + minute + ':' + second;
            // 检查是否需要补零
            function check(params) {
                let num = (params < 10) ? ('0' + params) : params;
                return num;
            }
        },
        // 跳转大屏
        operationCenter: function () {
            // window.open('http://182.150.116.22:10008/screen/index.html');
            window, open('../大屏项目/screen/screen.html');
        },
        userCenter: function () {
            window.open('http://182.150.116.22:10008/manage/index.html?token=' + this.loginToken + '&zh=' + this.userName)
        },
        // 退出登录按钮
        returnlogin: function () {
            window.location.href = './login/login.html';
        },
        // 请求项目列表
        resItemList: function () {
            this.request('post', this.ProjectUrl, { pageNum: this.itemPageNum, pageSize: this.itemPageSize }, "74935343174538", this.loginToken, this.itemList);
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
            this.showDeviceList = false;
            this.itemFocus = index;
            this.projectId = this.item[index].projectId;
            this.customerId = this.item[index].customerId;
            this.resPlaceList(this.placePageNum);
        },
        // 请求场所标签列表
        resPlaceList: function (placePageNum) {
            this.tags = [];
            this.request('post', this.placeUrl, { project: this.projectId, customer: this.customerId, currentPage: placePageNum, pageSize: this.placePageSize }, "74935343174538", this.loginToken, this.placeList);
        },
        // 获取场所列表后执行事件
        placeList: function (res) {
            this.tagName = '';
            this.tags = res.data.data.list;
            this.placeTotalPage = res.data.data.totalPage;
            if (this.tags.length != 0) {
                this.clickPlace(0);
            } else {
                this.placeDeviceListArray = [];
                this.addSceneDeviceList = [];
                this.timing = [];
                this.manual = [];
                this.placeId = null;
            }
        },
        // 点击项目上翻页
        itemPrePage: function () {
            if (this.itemPageNum > 1) {
                this.itemPageNum--;
                this.resItemList();
            }
        },
        // 项目下翻页
        itemNextPage: function () {
            if (this.itemPageNum < this.itemTotalPage) {
                this.itemPageNum++;
                this.resItemList();
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
            this.request('post', this.addPlaceUrl, { name: this.tagName, project: this.projectId, customer: this.customerId }, "74935343174538", this.loginToken, this.addTagSucess);
            this.newTag = false;
        },
        // 新增场所成功提示
        addTagSucess: function () {
            this.$message({
                message: '新建 “' + this.tagName + '” 场所成功',
                type: 'success'
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
            this.request('post', this.editPlaceTagUrl, { id: this.placeId, name: this.tagName }, "74935343174538", this.loginToken, this.editTagNameSuccess);
            this.editTagName = false;
        },
        // 编辑场所成功提示
        editTagNameSuccess: function () {
            this.$message({
                message: '修改 “' + this.tagName + '” 场所成功',
                type: 'success'
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
            this.request('post', this.addItemUrl, { type: "project", projectName: this.itemName, customerId: this.customerId }, "74935343174538", this.loginToken, this.addItemSuccess);
            this.newItem = false;
        },
        // 新增项目成功提示
        addItemSuccess: function () {
            location.reload();
            this.$message({
                message: '新建 “' + this.itemName + '” 项目成功',
                type: 'success'
            });
            this.resItemList();
        },
        // 删除场所标签
        resCloseTag: function (id) {
            this.$confirm('是否删除场所?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.request('post', this.placeDeleteUrl, { id: id }, "74935343174538", this.loginToken, this.closeTag);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 关闭场所标签后刷新场所列表并删除关闭场所的设备
        closeTag: function (res) {
            this.$message({
                message: '删除场所成功',
                type: 'success'
            });
            this.showDeviceList = false;
            this.resPlaceList(1);
        },
        // 点击场所切换样式之后所取用的场所ID就取自这里
        clickPlace: function (index) {
            this.showDeviceList = false;
            this.placeFocus = index;
            this.placeId = this.tags[index].id;
            this.resPlaceDeviceList();
            this.resSceneDetail();
        },
        // 请求场所设备列表详情
        resPlaceDeviceList: function () {
            this.request('post', this.placeDeviceListUrl, { currentPage: 1, placeId: this.placeId, pageSize: 999 }, "74935343174538", this.loginToken, this.placeDeviceList);
        },
        // 获取场所内容后执行
        placeDeviceList: function (res) {
            console.log(res)
            this.placeDeviceListArray = [];
            this.placeDeviceListArray = res.data.data.list;
        },
        // 场所向前翻页
        placePrePage: function () {
            if (this.placePageNum > 1) {
                this.placePageNum--;
                this.resPlaceList(this.placePageNum);
            }
        },
        // 场所标签向后翻页
        placeNextPage: function () {
            if (this.placePageNum < this.placeTotalPage) {
                this.placePageNum++;
                this.resPlaceList(this.placePageNum);
            }
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
            this.request('post', this.deviceListUrl, { currentPage: 1, pageSize: 999 }, "74935343174538", this.loginToken, this.deviceList);
        },
        // 获取可分配设备后执行
        deviceList: function (res) {
            this.allDeviceList = [];
            this.allDeviceList = res.data.data.list;
        },
        // 添加设备到场所
        resAddDevice: function () {
            this.request('post', this.addDeviceUrl, { deviceId: this.deviceId, placeId: this.placeId }, "74935343174538", this.loginToken, this.refresh);
        },
        // 删除设备
        resDleteDevice: function () {
            this.request('post', this.deleteDeviceUrl, { deviceId: this.deviceId }, "74935343174538", this.loginToken, this.refresh);
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
                this.request('post', this.sceneDetailUrl, { placeId: this.placeId }, "74935343174538", this.loginToken, this.sceneDetail);
            }
        },
        // 获取场景内容后执行
        sceneDetail: function (res) {
            this.timing = res.data.data.timing;
            this.manual = res.data.data.manual;
            for (let i = 0; i < this.timing.length; i++) {
                if (this.timing[i].scene.status == 0) {
                    this.timing[i].scene.switch0or1 = false;
                } else {
                    this.timing[i].scene.switch0or1 = true;
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
                    type: 'error'
                });
            } else {
                if (this.showAddScene) {
                    for (let i = 0; i < this.addSceneDeviceList.length; i++) {
                        if (this.addSceneDeviceList[i].checked && this.addSceneDeviceList[i].platform == 3) {
                            let obj = {};
                            obj.deviceId = this.addSceneDeviceList[i].id;
                            obj.paramUser = this.addSceneDeviceList[i].paramUser;
                            obj.paramOrder = this.addSceneDeviceList[i].paramOrder;
                            checkedDeviceList.push(obj);
                        } else if (this.addSceneDeviceList[i].checked && this.addSceneDeviceList[i].platform == 2) {
                            let obj = {};
                            obj.deviceId = this.addSceneDeviceList[i].id;
                            obj.paramVolume = this.addSceneDeviceList[i].paramVolume;
                            checkedDeviceList.push(obj);
                        }
                    }
                    this.request('post', this.addSceneUrl, { scene: { placeId: this.placeId, sceneName: this.sceneName, type: this.sceneType, startTime: this.startTime, exeDate: exeDate, status: 1 }, deviceList: checkedDeviceList }, "74935343174538", this.loginToken, this.resSceneDetail);
                } else if (this.showEditScene) {
                    for (let i = 0; i < this.addSceneDeviceList.length; i++) {
                        if (this.addSceneDeviceList[i].checked && this.addSceneDeviceList[i].platform == 3) {
                            let obj = {};
                            obj.deviceId = this.addSceneDeviceList[i].deviceId;
                            obj.paramUser = this.addSceneDeviceList[i].paramUser;
                            obj.paramOrder = this.addSceneDeviceList[i].paramOrder;
                            checkedDeviceList.push(obj);
                        } else if (this.addSceneDeviceList[i].checked && this.addSceneDeviceList[i].platform == 2) {
                            let obj = {};
                            obj.deviceId = this.addSceneDeviceList[i].deviceId;
                            obj.paramVolume = this.addSceneDeviceList[i].paramVolume;
                            checkedDeviceList.push(obj);
                        }
                    }
                    this.request('post', this.addSceneUrl, { scene: { id: this.sceneId, placeId: this.placeId, sceneName: this.sceneName, type: this.sceneType, startTime: this.startTime, exeDate: exeDate, status: this.sceneStatus }, deviceList: checkedDeviceList }, "74935343174538", this.loginToken, this.resSceneDetail);
                }
            }
        },
        // 切换-自动执行-开关状态
        switchStatus: function (i) {
            this.$forceUpdate();
            this.request('post', this.updateSceneStatusUrl, { sceneId: i.scene.id, status: i.scene.status }, "74935343174538", this.loginToken, this.resSceneDetail);
        },
        // 删除场景
        delScene: function (i) {
            this.$confirm('是否删除场景？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.request('post', this.delSceneUrl, { sceneId: i.scene.id }, "74935343174538", this.loginToken, this.afterDelScene);
            }).catch(() => {
                this.$message({
                    message: '已取消删除',
                    type: 'info'
                });
            });
        },
        // 删除场景的后续操作
        afterDelScene: function () {
            this.$message({
                message: '删除场景成功',
                type: 'success'
            });
            this.resSceneDetail();
        },
        // 手动场景执行
        resManualScene: function (i) {
            let manualExecuteProEqm = [];
            for (let a = 0; a < i.deviceList.length; a++) {
                if (i.deviceList[a].platform == 2 && i.deviceList[a].flag == 1) {
                    this.deviceId = i.deviceList[a].deviceId;
                    this.request('post', this.soundDeviceEditUrl, { power: 1, vol: i.deviceList[a].paramVolume, id: this.deviceId, cmd: 1 }, 'hsIot/cmd/' + this.deviceId, this.loginToken, function () { });
                } else if (i.deviceList[a].platform == 3 && i.deviceList[a].flag == 1) {
                    let obj = {};
                    obj.deviceCode = i.deviceList[a].deviceId;
                    if (i.deviceList[a].paramUser == null) {
                        obj.userGroup = 0;
                    } else {
                        obj.userGroup = i.deviceList[a].paramUser;
                    }
                    if (i.deviceList[a].paramOrder == null) {
                        obj.order = 0;
                    } else {
                        obj.order = i.deviceList[a].paramOrder;
                    }
                    manualExecuteProEqm.push(obj);
                }
            }
            // 专业设备手动执行
            let sendData = new FormData();
            sendData.append('token', this.loginToken);
            sendData.append('sceneDevices', JSON.stringify(manualExecuteProEqm));
            axios({
                method: 'post',
                url: 'http://software.china-hushan.com:32156/api/project/sceneLoad',
                data: sendData
            })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '执行成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('执行失败');
                    }
                });
        },
        // 拖拽开始
        dragstart: function (e, i) {
            this.deviceId = i.id;
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
                if (this.draging === "deviceNum") {
                    this.resAddDevice();
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
                this.resDleteDevice();
            }
            this.tipsOfDeleteDevice = false;
        },
        // 按下回车
        keydownEnter: function () {
            this.ableToEdit = !this.ableToEdit;
        },
        // 如果输入框为空则刷新列表
        ifDeviceInputIsEpt: function () {
            if (this.deviceInput == "") {
                this.request('post', this.deviceListUrl, { currentPage: 1, pageSize: 999 }, "74935343174538", this.loginToken, this.deviceList);
            }
        },
        // 搜索按钮
        searchAllDeviceList: function () {
            this.request('post', this.deviceListUrl, { currentPage: 1, pageSize: 9999, filed: this.deviceInput }, "74935343174538", this.loginToken, this.deviceList);
            this.showPower = true;
        },
        // 点保存批量添加设备到场所
        batchAddDevice: function () {
            for (let i = 0; i < this.allDeviceList.length; i++) {
                if (this.allDeviceList[i].checked) {
                    this.deviceId = this.allDeviceList[i].id
                    this.resAddDevice();
                }
            }
        },
        // 设备卡片中间的按钮跳转
        goToCommand: function (i) {
            this.deviceId = i.id;
            this.imgSrc = i.url;
            switch (i.platform) {
                case 1:
                    window.open('http://182.150.116.22:10008/power/index.html?token=' + this.loginToken + '&zh=' + this.userName + '&sbid=' + i.id);
                    break;
                case 2:
                    this.request('post', this.soundDeviceDetailUrl, { id: this.deviceId }, "74935343174538", this.loginToken, this.soundDeviceDetail);
                    break;
                case 3:
                    window.open("HushanIotStudio://" + this.loginToken + " " + i.platform + " " + i.project + " " + i.groupId + " " + i.id);
                    break;
                case 4:
                    console.log('4')
                    break;
                case 5:
                    switch (i.type) {
                        case "视频管理":
                            window.open('HsDimmerVideoPlayer://@' + window.sessionStorage.videoDeviceUrl + '@123123');
                            break;
                        case "音频管理":
                            this.checkPlatform = 5;
                            this.eduDeivceList = [];
                            break;
                        case "环境控制":
                            window.open('http://hs.m2m.city/#/login?username=hushan&password=6570ca231c5e505dd9e347ad69004452')
                            break;
                        case "智能温度":
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
                        this.request('post', this.soundDeviceEditUrl, { power: this.soundDevicePower, vol: Number(this.volumeInput), id: this.deviceId, cmd: 1 }, 'hsIot/cmd/' + this.deviceId, this.loginToken, this.editSoundDeviceConfig);
                    }
                    break;
                case 5:
                    this.checkedEduDeviceID = [];
                    for (let i = 0; i < this.eduDeivceList.length; i++) {
                        if (this.eduDeivceList[i].checked == true) {
                            this.checkedEduDeviceID.push(this.eduDeivceList[i].id)
                        }
                        this.eduDeivceList[i].isPushSuccess = -1;
                    }
                    this.eduDeviceLoading();
                    break;
            }
        },
        // 保存广播设备参数后执行改名操作
        editSoundDeviceConfig: function () {
            this.request('post', this.editSoundDeviceNameUrl, { id: this.deviceId, name: this.soundDeviceNameInput }, "74935343174538", this.loginToken, this.editSoundDeviceTips);
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
            await this.request('post', this.saveEduDeviceConfigUrl, { srcDeviceId: this.deviceId, tarDeviceIdList: this.checkedEduDeviceID }, "74935343174538", this.loginToken, this.editEduDeviceTips);
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
                url: this.getEduDeviceCfgUrl,
                data: {
                    client: "PC",
                    user: "",
                    version: "1.0.1",
                    data: {
                        deviceId: this.deviceId
                    },
                    key: "74935343174538"
                },
                headers: { 'token': this.loginToken }
            })
                .then((res) => {
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
                            }
                        });
                    }
                });
        },
        // 教育设备是跨场所的，获取所有场所下的教育设备
        resGetEduDeviceList: function () {
            this.checkPlatform = 5;
            this.request('post', this.getAllPlaceEduDeviceUrl, { currentPage: 1, pageSize: 9999, platform: this.checkPlatform, isOnline: '1' }, "74935343174538", this.loginToken, this.getEduDeviceList);
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
                url: this.checkEduDeviceCfg,
                data: {
                    client: "PC",
                    user: "",
                    version: "1.0.1",
                    data: {
                        deviceId: this.deviceId
                    },
                    key: "74935343174538"
                },
                headers: { 'token': this.loginToken }
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
                        }
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
                    this.deviceId = i.id;
                    this.request('post', this.soundDeviceDetailUrl, { id: this.deviceId }, "74935343174538", this.loginToken, this.soundDeviceConfig);
                    break;
                case 3:
                    this.deviceId = i.id;
                    this.request('post', this.userGroupAndSeqUrl, { deviceId: this.deviceId }, "74935343174538", this.loginToken, this.userGroupAndSeq);
                    break;
            }
        },
        // 广播设备点击配置后执行
        soundDeviceConfig: function (res) {
            this.setUserGroupAndOrder = true;
            this.addSceneDeviceList[this.sceneDeviceSelected].paramVolume = res.data.data.vol;
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
                    this.request('post', this.soundDeviceEditUrl, { power: this.soundDevicePower, vol: this.addSceneDeviceList[this.sceneDeviceSelected].paramVolume, id: this.deviceId, cmd: 1 }, 'hsIot/cmd/' + this.deviceId, this.loginToken, function () { });
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
        clickmanger: function (index) {
            this.managerFocus = index;
            // 关闭场所管理器弹框
            this.showDeviceList = false;
            switch (index) {
                case 0:
                    // this.resPlaceDeviceList();
                    this.platformJump = false;
                    break;
                case 1:
                    // this.resSceneDetail();
                    this.platformJump = false;
                    break;
                case 2:
                    this.request('post', this.oldPlatformPageUrl, { pageNum: 1, pageSize: 6 }, "74935343174538", this.loginToken, this.oldPlatformFirstPage);
                    this.platformJump = true;
                    break;
            }
        },
        // 平台入口跳转后渲染卡片和页码
        oldPlatformFirstPage: function (res) {
            this.oldPlatformTotalPage = res.data.data.totalPage;
            this.oldPlatformModuleList = res.data.data.list;
            this.oldPlatformCurrentPage = res.data.data.currentPage;
            $('.oldPlatformPageSpot').eq(this.oldPlatformCurrentPage - 1).css('opacity', '1');
        },
        // 点击新建场景按钮显示并设置初始值
        clickSceneButton: function () {
            this.addSceneDeviceList = [];
            for (let i = 0; i < this.placeDeviceListArray.length; i++) {
                if (this.placeDeviceListArray[i].platform == 2 || this.placeDeviceListArray[i].platform == 3) {
                    this.addSceneDeviceList.push(this.placeDeviceListArray[i]);
                }
            }
            for (let i = 0; i < this.addSceneDeviceList.length; i++) {
                this.addSceneDeviceList[i].checked = false;
                this.addSceneDeviceList[i].paramUser = 0;
                this.addSceneDeviceList[i].paramOrder = 0;
                this.addSceneDeviceList[i].paramVolume = 0;
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
            this.sceneId = i.scene.id;
            // 循环改值前先回溯到初始值
            for (let i = 0; i < 7; i++) {
                this.selectWeeks[i].checked = false;
            }
            this.request('post', this.sceneDetailUrl, { sceneId: i.scene.id, placeId: this.placeId }, "74935343174538", this.loginToken, this.editScene);
        },
        // 查询场景后执行
        editScene: function (res) {
            if (res.data.data.timing.length == 0) {
                this.sceneEdit = res.data.data.manual[0];
            } else {
                this.sceneEdit = res.data.data.timing[0];
            }
            this.addSceneDeviceList = [];
            for (let i = 0; i < this.sceneEdit.deviceList.length; i++) {
                if (this.sceneEdit.deviceList[i].platform == 2 || this.sceneEdit.deviceList[i].platform == 3) {
                    this.addSceneDeviceList.push(this.sceneEdit.deviceList[i]);
                }
            }
            this.sceneName = this.sceneEdit.scene.sceneName;
            this.sceneType = this.sceneEdit.scene.type;
            this.startTime = this.sceneEdit.scene.startTime;
            let array = this.sceneEdit.scene.exeDate.split('');
            for (let i = 0; i < array.length; i++) {
                this.selectWeeks[Number(array[i]) - 1].checked = true;
            }
            this.sceneStatus = this.sceneEdit.scene.status;
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
        // 旧页面模型替换图片
        switchImg: function (e, i) {
            e.target.src = this.oldPlatformModuleImgPrefix + i.brightPicture;
        },
        // 鼠标移开时恢复图片
        recoverImg: function (e, i) {
            e.target.src = this.oldPlatformModuleImgPrefix + i.commonPicture;
        },
        // 点击小点跳转页面功能
        oldPlatformPageIndex: function (index) {
            this.request('post', this.oldPlatformPageUrl, { pageNum: index + 1, pageSize: 6 }, "74935343174538", this.loginToken, this.oldPlatformFirstPage);
            $('.oldPlatformPageSpot').eq(this.oldPlatformCurrentPage - 1).css('opacity', '0.4');
        },
        // 点击上一页翻页
        oldPlatformPrePage: function () {
            if (this.oldPlatformCurrentPage > 1) {
                this.request('post', this.oldPlatformPageUrl, { pageNum: this.oldPlatformCurrentPage - 1, pageSize: 6 }, "74935343174538", this.loginToken, this.oldPlatformFirstPage);
                $('.oldPlatformPageSpot').eq(this.oldPlatformCurrentPage - 1).css('opacity', '0.4');
            }
        },
        //点击下一页翻页
        oldPlatformNextPage: function () {
            if (this.oldPlatformCurrentPage < this.oldPlatformTotalPage) {
                this.request('post', this.oldPlatformPageUrl, { pageNum: this.oldPlatformCurrentPage + 1, pageSize: 6 }, "74935343174538", this.loginToken, this.oldPlatformFirstPage);
                $('.oldPlatformPageSpot').eq(this.oldPlatformCurrentPage - 1).css('opacity', '0.4');
            }
        },
        // 模块跳转
        jumpToModel: function (i) {
            if (i.url.length > 5) {
                switch (i.id) {
                    case 1:
                        window.open(i.url + '?token=' + this.loginToken + '&zh=' + this.userName);
                        break;
                    case 2:
                        window.open(i.url + '?token=' + this.loginToken + '&zh=' + this.userName);
                        break;
                }
            }
        },
        // 点击视频设备修改地址
        videoDeviceChangeIP: function (i) {
            if (i.platform == 5) {
                if (i.type == '视频管理') {
                    this.videoDeviceUrl = window.sessionStorage.videoDeviceUrl;
                    this.videoDeviceIP = true;
                }
            }
        },
        // 关闭视频设备弹框后保存到本地
        saveVideoDeviceIpToSession: function () {
            window.sessionStorage.videoDeviceUrl = this.videoDeviceUrl;
            this.videoDeviceIP = false;
        }
    }
});
// let url = 'http://47.108.53.124:18002/'
// let url = 'http://47.108.203.243:18002/' //接口地址同一前缀
let url = 'http://182.150.116.22:18009/';
let ProjectUrl = url + 'api/deviceOrg/getProjectList';
let placeUrl = url + 'api/place/getPlaceList';
let addPlaceUrl = url + 'api/place/addPlace';
let addItemUrl = url + 'api/deviceOrg/addDeviceOrg';
let placeDeleteUrl = url + 'api/place/delPlace';
let placeDeviceListUrl = url + 'api/place/getPlaceDeviceList';
let sceneDetailUrl = url + 'api/scene/getScene';
let addSceneUrl = url + 'api/scene/addScene';
let updateSceneStatusUrl = url + 'api/scene/updateSceneStatus';
let delSceneUrl = url + 'api/scene/delScene';
let deviceListUrl = url + 'api/place/getDistributableDeviceList';
let addDeviceUrl = url + 'api/place/addDeviceForPlace';
let deleteDeviceUrl = url + 'api/place/delDeviceForPlace';
let userGroupAndSeqUrl = url + 'api/scene/getMaxUserAndOrderList';
let editPlaceTagUrl = url + 'api/place/updatePlace';
let soundDeviceDetailUrl = url + 'api/radio/detail';
let soundDeviceEditUrl = url + 'api/radio/send';
let checkEduDeviceCfg = url + 'api/education/checkDeviceConfigure';
let getEduDeviceCfgUrl = url + 'api/education/getDeviceConfigure';
let saveEduDeviceConfigUrl = url + 'api/education/pushDeviceConfigure';
let editSoundDeviceNameUrl = url + 'api/radio/update';
let getAllPlaceEduDeviceUrl = url + 'api/device/list';
let oldPlatformPageUrl = url + 'api/homePage/getAppList';
let refer_alert_rule = url + 'api/place/getAlarmRule';
let res_new_alert_url = url + 'api/place/addAlarmRule';
let res_edit_alert_url = url + 'api/place/updateAlarmRule';
let res_message_unread_url = url + `api/log/num`; //用户未读消息条数接口
let res_message_center_list_url = url + 'api/log/msg/list'; //获取消息列表
let res_message_isread_url = url + 'api/log/isread'; //点击未读消息减少一条未读条数
let res_message_detail_url = url + 'api/log/msg'; //获取消息详情
let res_clear_message_unread_url = url + 'api/log/all/isread'; //一键清除未读
let res_download_module_detail_url = url + 'api/resource/detail'; //下载中心模块详情
let res_download_module_list_url = url + 'api/resource/list'; //下载中心模块下的列表

// 登录接口
let login_html_url = url + 'api/user/login';

// 管理平台
// let userCenterUrl = 'http://47.108.53.124:10018/'
let userCenterUrl = 'http://182.150.116.22:10009/';
let userCenterLink = userCenterUrl + 'hsiot/index.html';

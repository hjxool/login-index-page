let login_url = 'http://182.150.116.22:18009/';
// 登录接口
let login_html_url = login_url + 'api/user/login';
// 设备接口
// let url = 'http://192.168.30.66:18115/';
let url = 'http://182.150.116.22:18115/';
let getAmpHistoryData = url + 'gzdsp/amp/getAmpHistoryData'; //查询历史记录
let getChannelDetail = url + 'gzdsp/dsp/getChannelDetail'; //查询通道数据
let getPowerVol = url + 'gzdsp/sys/getPowerVol'; //电源电压
let getOutputStatus = url + 'gzdsp/dsp/getOutputStatus'; //通道状态
let sendCmdtoDevice = url + 'gzdsp/cmd/sendCmdtoDevice'; //发指令
let schedule = url + 'gzdsp/cmd/schedule'; //自检指令
let getLimitThreshold = url + 'gzdsp/dsp/getLimitThreshold'; //获取压限阈值
// websocket电平数据
// let ws_url = 'ws://192.168.30.66:18115/gzdsp/websocket';
let ws_url = 'ws://182.150.116.22:18115/gzdsp/websocket';

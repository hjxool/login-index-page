// 获取地址栏token
function get_token() {
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
}
//封装的请求方法
function request(method, url, data, key, token, func) {
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
}

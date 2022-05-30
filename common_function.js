const common_functions = {
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
		//封装的请求方法
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
		// 获取任意节点到视窗顶的距离
		get_clientY(element) {
			let top = element.offsetTop;
			let parent_dom = element.offsetParent;
			// 不断遍历查找上一层父节点 直到为null body的父节点就是null
			while (parent_dom != null) {
				top += parent_dom.offsetTop;
				parent_dom = parent_dom.offsetParent;
			}
			return top;
		},
		// 获取任意节点到视窗顶的距离
		get_clientX(element) {
			let left = element.offsetLeft;
			let parent_dom = element.offsetParent;
			while (parent_dom != null) {
				left += parent_dom.offsetLeft;
				parent_dom = parent_dom.offsetParent;
			}
			return left;
		},
	},
};

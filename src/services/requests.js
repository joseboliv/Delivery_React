const requestHandler = (function () {
	const _pvt = {
		isObject: obj => (Boolean(obj) && obj.constructor === Object),
		isNotEmptyObject: obj => (_pvt.isObject(obj) && Object.keys(obj).length > 0),
		getHeaders: (token) => {
			const headers = {
				'Cache-Control': 'no-cache',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			};
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}
			return headers;
		},
		buildRequest: (method = 'POST', token, payload = {}) => {
			const request = {
				headers: _pvt.getHeaders(token),
				method: method,
			};
			if (_pvt.isNotEmptyObject(payload)) {
				request.body = JSON.stringify(payload);
			}
			return request;
		},
		buildQueryString: params => {
			return Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');
		},
		generateReqUrl: (baseurl, endpoint, params = {}) => {
			const qryStr = _pvt.isNotEmptyObject(params) ? ('?' + _pvt.buildQueryString(params)) : '';
			return `${baseurl}${endpoint}${qryStr}`;
		},
		reqResult: async (response) => {
			const errorObj = {
				message: '',
				action: 'none',
			};
			var result;
			try{
				result = await response.json();
			} catch(e) {
				// console.log(e);
				throw Error(e);
			}
			if(!response.ok && result && result.code) {
				errorObj.message = _pvt.getErrorMsg(result.code);
				if(result.code==='jwt_auth_invalid_token') {
					errorObj.action = 'clear_token';
				}
				throw Error(JSON.stringify(errorObj));
			}
			return result;
		},
		getErrorMsg: (errCode) => {
			const errors = {
				'[jwt_auth] invalid_username': 'Incorrect Username or Password',
				'[jwt_auth] incorrect_password': 'Incorrect Username or Password',
				'[jwt_auth] empty_username': 'Username field is empty',
				'[jwt_auth] empty_password': 'Password field is empty',
				'rest_no_route': 'Website Auth Setup Incorrect - Contact Admin - JWT Plugin Inactive',
				'jwt_auth_bad_config': 'Website Auth Setup Incorrect - Contact Admin - wp-config incorrect setup',
				default: 'Website Auth Setup Incorrect - Contact Admin - ' + errCode,
			}
			return errors[errCode] || errors.default;
		}
	};
	const _pub = {
		fetch: async function(baseurl, endpoint, qryParams, method='POST', token='', payload) {
			const url = _pvt.generateReqUrl(baseurl, endpoint, qryParams);
			const req = _pvt.buildRequest(method, token, payload);
			var response;
			try {
				response = await fetch(url, req);
			} catch(e) {
				throw Error('Network Error - Invalid Website URL or Auth Setup Incorrect');
			}
			return await _pvt.reqResult(response);
			
		},
		// login: async function (username, password, siteurl) {
		// 	state.baseurl = siteurl;
		// 	const url = _pvt.generateReqUrl(apiConstants.getAuthToken);
		// 	const req = _pvt.buildRequest('POST', false, { username, password });
		// 	const response = await fetch(url, req);
		// 	return _pvt.reqResult(response);
		// },
		// getDeliveries: async function (params = {}) {
		// 	const url = _pvt.generateReqUrl(apiConstants.deliveries, params);
		// 	const req = _pvt.buildRequest('GET', true);
		// 	const response = await fetch(url, req);
		// 	return deliveryData(await _pvt.reqResult(response));
		// },
	};
	return _pub;
})();

export default requestHandler;
// const getTokenProperties = token => {
// 	try {
// 		const payload = JSON.parse(atob(token.split('.')[1]));
// 		return payload;
// 	} catch (e) {
// 		return null;
// 	}
// };

// const saveTokenProperties = token => {
// 	const tokenProps = this.getTokenProperties(token);

// };

	// makeRequest = async (url, method = 'POST', passToken = false, payload = {}) => {
	// 	return await fetch(url, this.buildRequest(method, passToken, payload));
	// };



	// loginUser = () => {

	// };

	// logoutUser = () => {

	// };

	// isUserLoggedIn = async () => {
	// 	try {
	// 		const [url, token] = await AsyncStorage.multiGet(['baseurl', 'userToken']);
	// 		const baseurl = url[1], 
	// 			userToken = token[1];
	// 		this.setState({baseurl, userToken});
	// 	}

	// };
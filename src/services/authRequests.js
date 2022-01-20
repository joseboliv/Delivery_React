import req from './requests';
import apiConstants from './apiConstants';

export default handleAuthentication = (() => {
	const _pub = {
		isValid: async function (siteurl, token) {
			if (!siteurl || !token) return false;
			try {
				const qryParams = null;
				await req.fetch(siteurl, apiConstants.validate, qryParams, 'POST', token);
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		login: async function (username, password, siteurl) {
			const qryParams = null, token = '';
			return await req.fetch(siteurl, apiConstants.token, qryParams, 'POST', token, { username, password });
		},
	}
	return _pub;
})();
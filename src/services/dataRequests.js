import req from './requests';
import apiConstants from './apiConstants';
import parseDeliveryData from '../data';

const getAppData = ( () => {
	const _pub = {
		getDeliveries: async (baseurl, token, params = {}) => {
			try{
				const response = await req.fetch(baseurl, apiConstants.deliveries, params, 'GET', token);
				return parseDeliveryData(response);	
			} catch (e) {
				console.log(e);
				return [];
			}			
		},
		updateDelivery: async (baseurl, token, id, params = {}) => {
			if(id) {
				try{
					const response = await req.fetch(baseurl, `${apiConstants.deliveries}/${id}`, params, 'POST', token);
					return parseDeliveryData(response);		
				} catch (e) {
					console.log(e);
					return false;
				}
			}
			return false;
		},
	}

	return _pub;
})();

export default getAppData;
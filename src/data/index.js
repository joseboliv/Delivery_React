import currencySymbol from '../utils/currencySymbols';
import formatDate from '../utils/formatDate';

const formatPrice = (method, payment, currency) => {
	if( method === 'Cash on delivery' && Number(payment) && currencySymbol[currency] ) {
		return `${currencySymbol[currency]}${payment}`;
	}
	return '';
};
const deliveryItem = (data) => {
	const {
		delivery_id = '',
		order_id = '',
		item = {},
		payment_remaining = 0,
		currency = 'USD',
		payment_method = '',
		customer = {},
		shipping_address = {},
		store = {},
		delivery_status = '',
		delivered_on = ''
	} = data;

	const order = `#${order_id}`;
	const price = formatPrice(payment_method, payment_remaining, currency);
	const items = [{
		name: item.name || '',
		quantity: item.quantity || 0,
		formattedPrice: price,
		currency: currencySymbol[currency] || currency,
		price: Number(payment_remaining) || '',
	}];
	const payment = {
		amount: Number(payment_remaining) || '',
		method: payment_method,
		currency: currencySymbol[currency] || currency,
		status: Number(payment_remaining) === 0 ? 'paid' : 'unpaid',
	}
	const status = delivery_status === 'pending' ? 'pickedup' : 'delivered';
	const schedule = {
		assigned: '',
		picked: '',
		delivered: formatDate(delivered_on),
	};
	const shopAddress = store.address || {}; 
	const shop = {
		name: store.name || '',
		contact: [],
		address: {
			line1:  shopAddress.street_1 || '',
			line2: shopAddress.street_2 || '',
			city: shopAddress.city || '',
			state: shopAddress.state || '',
			pin: shopAddress.zip || '',
			country: shopAddress.country || '',
		},
	};
	const buyer = {
		name: customer.name || '',
		contact: customer.phone ? [customer.phone] : [],
		address: {
			line1:  shipping_address.address_1 || '',
			line2: shipping_address.address_2 || '',
			city: shipping_address.city || '',
			state: shipping_address.state || '',
			pin: shipping_address.postcode || '',
			country: shipping_address.country || '',
		},
	};
	return {
		id: delivery_id,
		order,
		items,
		payment,
		status,
		schedule,
		shop,
		customer: buyer,
	}
};

export default deliveryList = (response) => response.map(deliveryItem);
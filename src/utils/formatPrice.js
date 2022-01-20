export default formatPrice = (currency, price, delimiter=',', decimal='.') => {
	const priceNum = Number(price).toFixed(2);
	const parts = priceNum.toString().split(decimal);
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
	return `${currency}${parts.join(decimal)}`;
}
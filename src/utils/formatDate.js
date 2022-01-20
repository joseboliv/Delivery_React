const padZero = (num) => num <= 9 ? `0${num}` : num;

const dateSuffix = (date) => {
	const suf = { 1: 'st', 2: 'nd', 3: 'rd' };
	if (date >= 10 && date <= 20 || date === 30) return date + 'th';
	return date + (suf[date % 10] || 'th');
}

export default dateFormater = (str) => {
	var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var dateObj = new Date(str.replace(/-/g, '\/'));

	if (isNaN(dateObj.getTime())) return '';
	
	var d = dateSuffix(dateObj.getDate());
	var m = strArray[dateObj.getMonth()];
	var y = dateObj.getFullYear();
	var hour = dateObj.getHours();
	var timeSuf = hour > 11 ? 'pm' : 'am';
	var h = hour % 12;
	var mn = dateObj.getMinutes();

	return `${d} ${m} ${y} | ${padZero(h)}:${padZero(mn)} ${timeSuf}`;
};
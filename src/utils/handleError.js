export default handleError = fn => {
	return function(...params) {
		return fn(...params).catch(error=>console.log("something went wrong"));
	}
};
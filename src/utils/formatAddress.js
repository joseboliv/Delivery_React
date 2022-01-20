import React from 'react';
import {Txt} from '../ui/core';

export const formatAddressSL = (address, separator = ', ') => {
	let str = '';
	for (var k in address) {
		if (address.hasOwnProperty(k) && address[k]) {
			str += address[k] + separator;
		}
	}
	return str.slice(0, -1 * separator.length);
};

export const formatAddressML = (address) => {
	let addressArr = [];
	for (var k in address) {
		if (address.hasOwnProperty(k) && address[k]) {
			addressArr.push(<Txt key={`${k}-${Date.now()}`}>{`${k}: ${address[k]}`}</Txt>);
		}
	}
	return addressArr;
}
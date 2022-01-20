import React from 'react';
import Title from '../../../../ui/profile/title';
import Contact from '../../../../ui/profile/contact';

export default pendingDetails = ({ type, data } = props) => {
	const { name, contact } = data;
	return (
		<>
			<Title name={name} type={type} />
			<Contact contact={contact} />
		</>
	);
};
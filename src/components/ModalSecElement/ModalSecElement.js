import React from 'react';
import PropTypes from 'prop-types';

const ModalSecElement = (props) => {
	return(
		<div className="mod__sec-content">
			<img
				className="mod__img-sec"
				src={props.image}
				alt={props.image + '-image'}
			/>
			<h4 className="mod__sec-title">
				{props.name}
			</h4>
		</div>
	);
};

ModalSecElement.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	image: PropTypes.string
};

export default ModalSecElement;
import React from 'react';
import PropTypes from 'prop-types';

const ModalMainElement = (props) => {
	return(
		<section className="mod__main">
			<img 
				className="mod__img"
				src={props.image}
				alt={props.name + '-image'}
			/>
			<div className="mod__content">
				<h2 className="h2 mod__title">{props.name}
				</h2>
				<p className="mod__tagline">{props.tagline}
				</p>
				<p className="mod__params">
				<strong>IBU:</strong>
				{props.ibu} <strong>ABV:</strong>
				{props.abv} <strong>EBC:</strong>
				{props.ebc}
				</p>
				<p className="mod__descr">{props.description}</p>
			</div>
		</section>
	);
};

ModalMainElement.propTypes = {
	name: PropTypes.string,
	image: PropTypes.string,
	tagline: PropTypes.string,
	ibu: PropTypes.number,
	abv: PropTypes.number,
	ebc: PropTypes.number,
	description: PropTypes.string
};

export default ModalMainElement;
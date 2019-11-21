import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import ScrollLock from 'react-scrolllock';

import ModalMainElement from '../ModalMainElement/ModalMainElement';
import ModalSecElement from '../ModalSecElement/ModalSecElement';

import { apiUrl } from '../List/List';
const query = 'beers/';

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isMainLoading: true,
			isSecLoading: true,
			id: this.props.match.params.id,
			error: null,
			errorSec: null,
			mainData: null,
			secData: null,
			secDataAccuracy: 1
		};
	}

	componentDidMount() {
		fetchBeer.call(this, this.props.match.params.id);
	}

	changeMainBeer = newId => {
		this.setState({
			isMainLoading: true,
			isSecLoading: true
		});
		fetchBeer.call(this, newId);
		return;
	}

	handleEscapeClick = e => {
		this.props.history.push('/');
		return;
	}

	handleBodyClick = e => {
		e.stopPropagation();
	}

	render() {
		// Main beer section
		let mainBeerSection;
		if (this.state.isMainLoading) {
			mainBeerSection = (
				<section className="mod__main">
					<div className="loading"/>
				</section>
			);
		} else {
			mainBeerSection = (
				<ModalMainElement
					name={this.state.mainData[0].name}
					image={this.state.mainData[0].image_url}
					tagline={this.state.mainData[0].tagline}
					ibu={this.state.mainData[0].ibu}
					abv={this.state.mainData[0].abv}
					ebc={this.state.mainData[0].ebc}
					description={this.state.mainData[0].description}
				/>
			);
		}
		
		// Related beers section
		let relatedBeersSection;
		if (this.state.isSecLoading) {
			relatedBeersSection = (
				<section className="row mod__sec">
					<div className="loading"/>
				</section>
			);
		} else {
			const secElementsData = getRelatedBeers(this.state.secData, this.state.id);
			const secElements = secElementsData.map((el, i) => {
				return(
					<Link
						key={i}
						className="mod__sec-link col-4"
						to={"/beer/" + el.id}
						onClick={() => {
							this.changeMainBeer(el.id);
						}}>
						<ModalSecElement
							id={el.id}
							name={el.name}
							image={el.image_url}
						/>
					</Link>
				);
			});
			relatedBeersSection = (
				<section className="row mod__sec">
					<p className="mod__sec-info">
						You might also like:
					</p>
					{secElements}
				</section>
			);
		}

		// Actual render
		return(
			<div
				className="mod"
				onClick={this.handleEscapeClick}>
				<div
					className="mod__body"
					onClick={this.handleBodyClick}>
					<button
						className="mod__escape-btn"
						onClick={this.handleEscapeClick}
					/>
					{mainBeerSection}
					{relatedBeersSection}
				</div>
				<ScrollLock/>
			</div>
		);
	}
}

Modal.propTypes = {
  match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string
		})
	}),
	history: PropTypes.shape({
		push: PropTypes.func
	})
};

/* Fetch functions */

// Fetch main item by ID (selected by user)
const fetchBeer = function(beerId) {
	fetch(apiUrl + query + beerId)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Sorry. An error occurred...');
			}
		})
		.then(data => {
			this.setState({
				mainData: data,
				isMainLoading: false
			}, () => {
				// Fetchnig sec items here
				const relProps = getRelatedBeersData(this.state.mainData, this.state.secDataAccuracy);
				fetchRelatedBeers.call(this, relProps);
			});
		})
		.catch(error => this.setState({error: error}));
};

// Fetch items similar to main items
const fetchRelatedBeers = function(relProps) {
	if(!relProps) {
		return false;
	}
	// Generating conditional search API url
	const searchQuery = 'beers?' +
		'abv_lt=' + relProps.abvMax +
		'&abv_gt=' + relProps.abvMin +
		'&ibu_lt=' + relProps.ibuMax +
		'&ibu_gt=' + relProps.ibuMin +
		'&ebc_lt=' + relProps.ebcMax +
		'&ebc_gt=' + relProps.ebcMin;
	
	// Fetching items
	fetch(apiUrl + searchQuery)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Sorry. An error occurred...');
			}
		})
		.then(data => {
			this.setState({
				secData: data,
				isSecLoading: data.length > 3 ? false : true,
				secDataAccuracy: this.state.secDataAccuracy * 2
			}, () => {
				if (this.state.secData.length < 4) {
					const newRelProps = getRelatedBeersData(this.state.mainData, this.state.secDataAccuracy);
					fetchRelatedBeers.call(this, newRelProps);
				}
			});
		})
		.catch(error => this.setState({errorSec: error}));
		
	return false;
};

/* Select functions */

// Get data of items similar to main item
const getRelatedBeersData = (beerData, accFact = 1) => {
	// Initial function conditions
	if (!beerData) {
		return false;
	}

	let accFactor = parseInt(accFact);

	if (typeof accFactor !== 'number') {
		accFactor = 1;
	}

	const mainProps = {
		// alcohol
		abv: beerData[0].abv,
		// bitterness 8 - 120+
		ibu: beerData[0].ibu,
		// colour 4 - 138
		ebc: beerData[0].ebc
	};
	
	const propsRanges = {
		abv: (mainProps.abv < 6 ? 1.5 : 2.5) * accFactor,
		ibu: (mainProps.ibu < 30 ? 7 : 14) * accFactor,
		ebc: (mainProps.ebc < 30 ? 5 : 10) * accFactor
	};

	let relProps = {};
	for (let key in mainProps) {
		// Get properties of related items
		relProps[(key + "Min")] = Number(mainProps[key]) - Number(propsRanges[key]);
		relProps[(key + "Max")] = Number(mainProps[key]) + Number(propsRanges[key]);
	}

	for (let key in relProps) {
		// Beautify properties
		relProps[key] = Math.round(parseInt(relProps[key]));
		// Set property as 0 if less than 0
		relProps[key] = relProps[key] > 0 ? relProps[key] : 0;
	}
	return relProps;
};

// Choose items to display as secondary
const getRelatedBeers = function(beerData, mainBeerId) {
	if(beerData.length < 4 || !mainBeerId) {
		return false;
	}

	// Remove main beer from list
	let trimmedBeerData = [...beerData].filter(el => {
		return el.id !== Number(mainBeerId);
	});

	// Get 3 unique elements from list
	const secElementsData = randomizeUniqueElements(trimmedBeerData, 3, 'id');

	return secElementsData;
};

/* Unit functions */

// Get random number
function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

// Randomize unique elements from list
function randomizeUniqueElements(inputArr, num, uniqueProperty = "id") {
	if (
		typeof num !== 'number' ||
		inputArr.length < num ||
		typeof uniqueProperty !== 'string' 
	) {
		return false;
	}
	// Check if every object has unique property
	inputArr.forEach(el => {
		if(!el[uniqueProperty]) {
			return false;
		}
	});

	// Function body
	let resultArray = [];
	let uniquePropertyArray = [];
	if(inputArr.length === num) {
		resultArray = [...inputArr];
	} else {
		// Get unique IDs to be returned
		while(uniquePropertyArray.length < num) {
			const randomElementProperty = inputArr[getRandomNum(0, inputArr.length - 1)][uniqueProperty];
			if (uniquePropertyArray.indexOf(randomElementProperty) > -1) continue;
			uniquePropertyArray.push(randomElementProperty);
		}
		// Get elements with unique IDs
		uniquePropertyArray.forEach(el => {
			const uniqueElement = inputArr.filter(elem => {
				return elem[uniqueProperty] === el;
			});
			resultArray.push(uniqueElement[0]);
		});
	}

	return resultArray;
}

// Exporting functions for testing purposes
export {
	fetchBeer,
	fetchRelatedBeers,
	getRelatedBeersData,
	getRelatedBeers,
	getRandomNum,
	randomizeUniqueElements
};
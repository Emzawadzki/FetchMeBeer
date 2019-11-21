import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const ListElement = (props) => {
  return(
    <div className="col-sm-6 col-lg-4 col-xl-3 list__element">
      <Link className="list__link" to={"/beer/" + props.id}>
        <figure className="list__figure">
          <img 
            className="img-thumbnail list__img"
            src={props.image}
            alt={props.name + '-image'}/>
          <figcaption className="list__figcaption">
            <h2 className="h2 list__title">{props.name}</h2>
            <p className="list__descr">{props.tagline}</p>
          </figcaption>
        </figure>
      </Link>
    </div>
  );
};

ListElement.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  tagline: PropTypes.string,
  image: PropTypes.string
};

export default ListElement;
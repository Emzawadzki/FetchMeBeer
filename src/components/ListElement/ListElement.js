import React from 'react';

const ListElement = (props) => {
  return(
    <div className="col-sm-6 col-lg-4 col-xl-3 list__element">
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
    </div>
  );
}

export default ListElement;
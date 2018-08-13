import React from 'react';

const ErrorMsg = () => {
  return(
    <div className="container error-msg">
      <h2 className="error-msg__title">Error!</h2>
      <p className="error-msg__text">We're terribly sorry. No beers could be loaded at the time! :(</p>
    </div>
  );
};

export default ErrorMsg;
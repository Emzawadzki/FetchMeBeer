import React from 'react';
import ListElement from '../ListElement/ListElement';

const apiUrl = 'https://api.punkapi.com/v2/beers?per_page=20';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Sorry. An error occurred...');
        }
      })
      .then(data => this.setState({
        data: data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error: error,
        isLoading: false }));
  }

  render() {
    if (this.state.error) {
      return(
        <div className="container">
          <p className="">Sorry. An error occurred...</p>
        </div>
      );
    }

    if (this.state.isLoading) {
      return(
        <div className="container">
          <p className="">Loading. Please wait...</p>
        </div>
      );
    }
    
    return(
      <div className="container">
        <div className="row list">
         { this.state.data.map((beer, key) => {
            return <ListElement 
              key={key}
              name={beer.name}
              tagline={beer.tagline}
              image={beer.image_url}/>
          }) }
        </div>
      </div>
    );
  }
}
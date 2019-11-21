import React from 'react';
import 'whatwg-fetch';
import { Route } from "react-router-dom";

import ListElement from '../ListElement/ListElement';
import ErrorMsg from '../common/ErrorMsg';
import EndMsg from '../common/EndMsg';
import Modal from '../Modal/Modal';
import InfiniteScroll from 'react-infinite-scroll-component';

const apiUrl = 'https://api.punkapi.com/v2/';
const query = 'beers?per_page=20&page=';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      nextPage: 1,
      error: null,
      moreItemsToLoad: true
    };
  } 

  componentDidMount() {
    this.getMoreData();
  }

  getMoreData = () => {
    fetch(apiUrl + query + this.state.nextPage)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Sorry. An error occurred...');
        }
      })
      .then(data => {this.setState({
        data: [...this.state.data, ...data],
        nextPage: this.state.nextPage + 1
        });
        if (this.state.data.length === [...this.state.data, ...data].length) {
          this.setState({ moreItemsToLoad: false });
        }})
      .catch(error => this.setState({error: error}));
  }

  render() {
    if (this.state.error) {
      return <ErrorMsg/>;
    }

    const loader = (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <p className="loading-text">
              Fetching more beers for ya! Hold on...
            </p>
          </div>
        </div>
      </div>
    );
    
    return(
      <InfiniteScroll
        dataLength={this.state.data.length}
        scrollThreshold={0.9}
        next={this.getMoreData}
        hasMore={this.state.moreItemsToLoad}
        loader={loader}
        endMessage={<EndMsg/>}>
        <div className="container">
          <div className="row list">
          {this.state.data.map((beer, key) => {
              return (<ListElement 
                key={key}
                id={beer.id}
                name={beer.name}
                tagline={beer.tagline}
                image={beer.image_url}/>);
            })}
          </div>
        </div>
        <Route path="/beer/:id" component={Modal} />
      </InfiniteScroll>
    );
  }
}

export { apiUrl };
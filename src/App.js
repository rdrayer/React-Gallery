import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './index.css';
import apiKey from './config.js';
import axios from 'axios';

//import components:
import SearchForm from './Components/SearchForm';
import PhotoList from './Components/PhotoList';
import Nav from './Components/Nav';
import NotFound from './Components/NotFound';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      beaches: [],
      mountains: [],
      forests: [],
      userSearch: '',
      loading: true
    };
  }
 
  componentDidMount() {
    this.performSearch();
    this.beachSearch();
    this.mountainSearch();
    this.forestSearch();
  }
  
  performSearch = (query = 'landscapes') => {
    //console.log(apiKey);
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false,
          userSearch: query
        });
      })
      .catch(error => {
        console.log('Error fetching, parsing data', error);
      });
  }

  //tried to use just one function to handle both the search + topic api calls, but wasn't successful so created separate functions for each nav topic
  beachSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=beaches&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          beaches: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching, parsing data', error);
      });
  }

  mountainSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=mountains&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          mountains: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching, parsing data', error);
      });
  }

  forestSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=forests&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          forests: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching, parsing data', error);
      });
  }

  render () {
    //console.log(this.state.photos);
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route exact path="/" render={ () => <PhotoList data={this.state.photos} title={"landscapes"} /> } />  
            <Route path="/beaches" render={ () => <PhotoList data={this.state.beaches} title={"beaches"} /> } />
            <Route path="/mountains" render={ () => <PhotoList data={this.state.mountains} title={"mountains"} /> } />
            <Route path="/forests" render={ () => <PhotoList data={this.state.forests} title={"forests"} /> } />
            <Route path="/search/:userSearch" render={ () => <PhotoList data={this.state.photos} title={this.state.userSearch} /> } />
            <Route component = { NotFound } />    
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

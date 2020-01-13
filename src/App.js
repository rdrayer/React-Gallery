import React, { Component } from 'react';
import './index.css';
import apiKey from './config.js';
import axios from 'axios';

//components:
import Photo from './Components/Photo';
import SearchForm from './Components/SearchForm';
import PhotoList from './Components/PhotoList';

export default class App extends Component {

  
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    };
  }
 
  componentDidMount() {
    this.performSearch();
  }

  
  performSearch = (query = 'colors') => {
    //console.log(apiKey);
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching, parsing data', error);
      });
  }
  
  

  render () {
    console.log(this.state.photos);
    return (
      <div className="container">
        
        <SearchForm onSearch={this.performSearch}/>

        <nav className="main-nav"> 
        </nav>
        
        <div className="photo-container">
          <h2>Results</h2>  
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <PhotoList data={this.state.photos} />
          }
        </div>
      </div>
    );
  }
  
  


}

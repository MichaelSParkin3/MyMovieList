import React from 'react';
import Image from './image.jsx';
const axios = require('axios');
const keys = require('../config/keys');

var isTimerRunning = false;
var typeTimer;
var searchTerm;
var movieFunc;
var movieArray;

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: '', text: [] };

    this.onInputChange = this.onInputChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this);
    this.createImage = this.createImage.bind(this);
    this.testSend = this.testSend.bind(this);
  }

  render() {
    return (
      <div className="search-bar-div">
        <form className="input-group">
          <input
            placeholder="Type here to search for a movie"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange}
          />
        </form>
        <div id="suggest-list">
          {this.state.text
            .slice(0, 5)
            .map(x => (
              <Image
                func={this.testSend}
                title={x.original_title}
                object={x}
                id={x.id}
              />
            ))}
        </div>
      </div>
    );
  }

  testSend(object) {
    this.props.goMovie(object);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
    this.setState({ text: [] });
    console.log(this.state.text);
    searchTerm = event.target.value;
    if (isTimerRunning == false) {
      isTimerRunning = true;
      typeTimer = setTimeout(() => {
        this.startSearch(searchTerm);
        isTimerRunning = false;
      }, 500);
    } else {
      console.log('Timer is Runnoing');
      clearTimeout(typeTimer);
      typeTimer = setTimeout(() => {
        this.startSearch(searchTerm);
        isTimerRunning = false;
      }, 500);
    }
  }

  startSearch(term) {
    if (term == '') {
      console.log('NO TERM');
      this.setState({ text: [] });
    } else {
      console.log(term + '3');
      this.getSearchSuggestions(term);
    }
  }

  getSearchSuggestions(term) {
    console.log(this.state.text);
    // GET request for movies
    const COMPLETE_URL =
      'https://api.themoviedb.org/3/search/movie?api_key=' +
      keys.api_key +
      '&language=en-US&query=' +
      term +
      '&page=1&include_adult=false';
    axios({
      method: 'get',
      url: COMPLETE_URL,
      responseType: 'stream'
    }).then(
      function(response) {
        movieArray = response.data.results;
        console.log(movieArray);
        this.setState({ text: movieArray });
      }.bind(this)
    );
  }

  createImage(image) {
    this.setState({ text: ['fxgdfg'] });
  }

  createImages(images) {
    return images.map(this.createImage);
  }
}

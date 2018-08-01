import React from 'react';
import Image from './image.jsx';
const axios = require('axios');
const keys = require('../config/keys');

var isTimerRunning = false;
var typeTimer;
var searchTerm;
var movieFunc;
var movieArray;
var suggestionsLoaded = false;

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: '', text: [] };

    this.onInputChange = this.onInputChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this);
    this.createImage = this.createImage.bind(this);
    this.testSend = this.testSend.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    return (
      <div className="search-bar-div">
        <form onSubmit={this.onFormSubmit} className="input-group">
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
  /*
Handles ENTER button press in searchbar component
*/
  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.text[0] != null) {
      document.getElementById('checkbox').checked = false;
      this.props.goMovie(this.state.text[0]);
      this.setState({ term: '' });
      this.setState({ text: [] });
    }
  }
  /*
  Handles when a movieSuggestion item is clicked
  */
  testSend(object) {
    document.getElementById('checkbox').checked = false;
    this.props.goMovie(object);
    this.setState({ text: [] });
    this.setState({ term: '' });
  }
  /*
  When text in searchbar is changed it generates line of 5 suggetion items
  */
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
      }, 300);
    } else {
      console.log('Timer is Runnoing');
      clearTimeout(typeTimer);
      typeTimer = setTimeout(() => {
        this.startSearch(searchTerm);
        isTimerRunning = false;
      }, 300);
    }
  }

  /*
  checks to see if current search term is blank and if it isn't it will continue generating items
  */

  startSearch(term) {
    if (term == '') {
      console.log('NO TERM');
      this.setState({ text: [] });
    } else {
      console.log(term + '3');
      this.getSearchSuggestions(term);
    }
  }

  /*
  Gets the suggestions from the database and adds them to the current state
  */

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
        suggestionsLoaded = true;
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

import React, { Component } from 'react';
import SearchBar from './Components/SearchBar';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');
const keys = require('./config/keys');

var movieArray;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { currentMovieObject: {} };

    this.pickMovie = this.pickMovie.bind(this);
    this.getMovieById = this.getMovieById.bind(this);
  }

  componentWillMount() {
    this.getMovieById(2454);
  }

  componentDidMount() {
    console.log(this.state.currentMovieObject);
  }

  pickMovie(object) {
    console.log(object);
    console.log('The parent function ' + object.original_title);
    this.setState({ currentMovieObject: object });
    console.log(object.poster_path);
    console.log(
      'sdfsdf ' +
        'http://image.tmdb.org/t/p/' +
        'original' +
        this.state.currentMovieObject.backdrop_path
    );
  }

  render() {
    var backdropURL =
      'http://image.tmdb.org/t/p/' +
      'original' +
      this.state.currentMovieObject.backdrop_path;
    var divStyle = {
      backgroundImage: 'url(' + backdropURL + ')'
    };
    return (
      <div style={divStyle} className="App container-fluid">
        <div className="overlay" />
        <SearchBar goMovie={this.pickMovie} />
        <div className="row movie-info">
          <div className="col-md-3">.col-4</div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-5">
                <img
                  className="poster"
                  src={
                    'http://image.tmdb.org/t/p/' +
                    'original' +
                    this.state.currentMovieObject.poster_path
                  }
                  alt="Smiley face"
                  height="42"
                  width="42"
                />
              </div>
              <div className="col-md-7">
                <h1>{this.state.currentMovieObject.original_title}</h1>
                <p>{this.state.currentMovieObject.overview}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">.col-4</div>
        </div>
      </div>
    );
  }

  getMovieById(id) {
    const COMPLETE_URL =
      'https://api.themoviedb.org/3/movie/' +
      id +
      '?api_key=' +
      keys.api_key +
      '&language=en-US';
    console.log(COMPLETE_URL);
    axios({
      method: 'get',
      url: COMPLETE_URL,
      responseType: 'stream'
    }).then(
      function(response) {
        movieArray = response.data;
        console.log(movieArray);
        this.setState({ currentMovieObject: response.data });
      }.bind(this)
    );
  }
}

export default App;

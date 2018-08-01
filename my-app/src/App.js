import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './Components/SearchBar';
import { bindActionCreators } from 'redux';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { addMovie } from './Actions/actions';
const axios = require('axios');
const keys = require('./config/keys');

var movieArray;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { currentMovieObject: {} };

    this.pickMovie = this.pickMovie.bind(this);
    this.getMovieById = this.getMovieById.bind(this);
    this.checkChange = this.checkChange.bind(this);
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

        <div className="row movie-info">
          <div className="col-md-3" />
          <div className="col-md-6">
            <div className="row info-container">
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
                <div className="border" />
                <p>{this.state.currentMovieObject.overview}</p>
                <div className="row">
                  <div className="col-md-4">
                    <h4>Release Date:</h4>
                    <h3>{this.state.currentMovieObject.release_date}</h3>
                  </div>
                  <div className="col-md-4">
                    <h4>Rating:</h4>
                    <h3>{this.state.currentMovieObject.vote_average} / 10</h3>
                  </div>
                  <div className="col-md-4">
                    <label className="container">
                      <input
                        id="checkbox"
                        type="checkbox"
                        onClick={() => {
                          this.checkChange(this.state.currentMovieObject);
                        }}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3" />
        </div>
      </div>
    );
  }

  checkChange(object) {
    var inPropsAlready = false;
    console.log('ADD:' + JSON.stringify(object));
    this.props.movieList.movieArray.map(x => {
      if (x.object.id == object.id) {
        console.log('props true');
        inPropsAlready = true;
      }
    });
    if (inPropsAlready == false) {
      this.props.addMovie(object);
    }
    console.log('NEWPROP:' + JSON.stringify(this.props));
  }

  scream(object) {
    console.log('SCREAMING');
    console.log(object);
    this.pickMovie(object);
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

const mapStateToProps = state => {
  return {
    movieList: state.movieList
  };
};

const mapDispatchToProps = dispatch => {
  console.log(dispatch);
  return bindActionCreators({ addMovie: addMovie }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(App);

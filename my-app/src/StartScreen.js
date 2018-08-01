import React, { Component } from 'react';
import SearchBar from './Components/SearchBar';
import App from './App';
import Library from './Components/Library';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import './App.css';
const axios = require('axios');
const keys = require('./config/keys');

export default class StartScreen extends Component {
  constructor(props) {
    super(props);

    this.child = React.createRef();

    this.state = { currentMovieObject: {} };

    this.pickMovie = this.pickMovie.bind(this);
  }
  render() {
    // var backdropURL =
    //   'http://image.tmdb.org/t/p/' +
    //   'original' +
    //   this.state.currentMovieObject.backdrop_path;
    // var divStyle = {
    //   backgroundImage: 'url(' + backdropURL + ')'
    // };
    return (
      <Router>
        <div>
          <Redirect from={process.env.PUBLIC_URL + '/'} to="main" />
          <Route
            path={process.env.PUBLIC_URL + '/main'}
            render={() => (
              <div>
                <div className="header row">
                  <div className="col-md-2" />
                  <div className="col-md-6">
                    <SearchBar goMovie={this.pickMovie} />
                  </div>
                  <div className="col-md-2">
                    <Link to={'/Library'}>
                      <button type="button" className="btn btn-primary">
                        My Library
                      </button>
                    </Link>
                  </div>
                  <div className="col-md-2" />
                </div>
                <App ref={this.child} value={this.state.currentMovieObject} />
              </div>
            )}
          />
          <Route
            path={process.env.PUBLIC_URL + '/Library'}
            render={() => (
              <Library ref={this.child} value={this.state.currentMovieObject} />
            )}
          />
        </div>
      </Router>
    );
  }

  // <DefaultRoute
  //   path="/"
  //   component="App"
  //   ref={this.child}
  //   value={this.state.currentMovieObject}
  // />
  // </Router>

  pickMovie(object) {
    this.setState({ currentMovieObject: object });
    console.log(object.poster_path);
    console.log(
      'sdfsdf ' +
        'http://image.tmdb.org/t/p/' +
        'original' +
        this.state.currentMovieObject.backdrop_path
    );
    console.log('CHILD:' + this.child.current);
    this.child.current.getWrappedInstance().scream(object);
  }
}

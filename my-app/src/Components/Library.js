import React, { Component } from 'react';
import SearchBar from './SearchBar';
import App from '../App';
import LibraryItem from './LibraryItem';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
class Library extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.movieList.movieArray);
    return (
      <div className="library">
        <Link to={'/main'}>
          <div className="search-btn-div">
            <button type="button" className="search-btn btn btn-primary">
              Search
            </button>
          </div>
        </Link>
        <div className="container-fluid">
          <div className="page-container">
            <h1 className="text-center">The Library</h1>
            <div className="border" />
            <div className="item-holder">
              <div className="row">
                {this.props.movieList.movieArray.map(x => (
                  <LibraryItem
                    title={x.object.original_title}
                    poster={x.object.poster_path}
                    id={x.object.id}
                    info={x.object.overview}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieList: state.movieList
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true }
)(Library);

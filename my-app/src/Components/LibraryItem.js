import React from 'react';
import PropTypes from 'prop-types';

export default class LibraryItem extends React.Component {
  constructor(props) {
    super(props);

    this.clicked = this.clicked.bind(this);
  }

  render() {
    var divStyle = {
      position: 'relative'
    };
    return (
      <div className="col-lg-4 library-item-container">
        <div className="library-item" onClick={this.clicked}>
          <h3 className="text-center">{this.props.title}</h3>
          <div className="border" />
          <div className="row">
            <div className="col-lg-6">
              <img
                className="poster"
                src={
                  'http://image.tmdb.org/t/p/' + 'original' + this.props.poster
                }
                alt="Smiley face"
                height="42"
                width="42"
              />
              <div className="rating">
                <h4>Rating: </h4>
                <span className="custom-dropdown">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="info-container">
                <p>{this.props.info}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  clicked() {
    console.log(this.props);
  }
}

LibraryItem.propTypes = {
  object: PropTypes.object.isRequired
};

import React from 'react';
import PropTypes from 'prop-types';

export default class Image extends React.Component {
  constructor(props) {
    super(props);

    this.clicked = this.clicked.bind(this);
  }

  render() {
    var divStyle = {
      position: 'relative'
    };
    return <h3 className='suggest-item' style={divStyle} onClick={this.clicked} id={this.props.id}>{this.props.title}</h3>;
  }

  clicked(){
    this.props.func(this.props.object);
  }

}

// Image.propTypes = {
//   func: PropTypes.func,
// };

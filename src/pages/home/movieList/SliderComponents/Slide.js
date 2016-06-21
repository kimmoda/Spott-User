import React, { Component } from 'react';

class Slide extends Component {
  render () {
    return (
      <div className='movielist__slide'>
        <img src={this.props.image}/>
      </div>
    );
  }
}

Slide.propTypes = {
  image: React.PropTypes.string.isRequired
};

export default Slide;

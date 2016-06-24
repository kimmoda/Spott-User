import React, { Component } from 'react';

class Tweet extends Component {
  renderOverlay () {
    if (this.props.image !== undefined) {
      return (
          <div className='twitter__overlay'></div>
      );
    }
  }
  render () {
    return (
      <div
        className='twitter__tile'
        style={{ backgroundImage: this.props.image !== undefined && `url(${this.props.image})`, backgroundSize: 'cover' }}>

        {this.renderOverlay()}

        <div className='twitter__logo'>
          <img src={this.props.twitterlogo} />
        </div>
        <div className='tweet__info'>
          <div className='tweet__user'><p>Spot <a href='https://twitter.com/SPOTT_it' target='_blank'>@SPOTT_it</a></p></div>
          <div className='tweet__desc'><p dangerouslySetInnerHTML={{ __html: this.props.text }}></p></div>
        </div>
        <div className='tweet__viewlink'><a href={this.props.link} target='_blank'>view tweet</a></div>
      </div>
    );
  }
}

Tweet.propTypes = {
  image: React.PropTypes.string,
  link: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  twitterlogo: React.PropTypes.string.isRequired
};

export default Tweet;

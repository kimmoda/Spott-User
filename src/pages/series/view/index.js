import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Hero from './hero';
import Products from './products';

@connect()
export default class Series extends Component {

  static propTypes = {
    params: PropTypes.shape({
      seriesId: PropTypes.string.isRequired
    }).isRequired
  };

  render () {
    const { params: { seriesId } } = this.props;
    console.warn(this.props);
    return (
      <div>
        <Hero seriesId={seriesId} />
        <Products />
      </div>
    );
  }
}

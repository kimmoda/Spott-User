import React, { Component, PropTypes } from 'react';
import Hero from './_hero';

export default class Series extends Component {

  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.shape({
      seriesId: PropTypes.string.isRequired
    }).isRequired
  };

  render () {
    const { params: { seriesId } } = this.props;
    return (
      <div>
        <Hero seriesId={seriesId} />
        {this.props.children}
      </div>
    );
  }

}

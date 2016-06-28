import React, { Component, PropTypes } from 'react';
import Hero from './_hero';

export default class Series extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div>
        <Hero />
        {this.props.children}
      </div>
    );
  }

}

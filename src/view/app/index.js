import React, { Component, PropTypes } from 'react';

require('./reset.css');
require('./fonts.css');

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    return (
      <div>{this.props.children}</div>
    );
  }
}

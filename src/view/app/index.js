import React, { Component, PropTypes } from 'react';

require('./reset.css');
require('./fonts/index.css');

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    return this.props.children;
  }
}

import { Component, PropTypes } from 'react';

require('./reset.css');
require('./fonts/index.css');
require('./base.scss');
require('./slick.css');

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    return this.props.children;
  }
}

import { init, pageView } from './googleAnalytics';
import React, { Component, PropTypes } from 'react';

require('./reset.css');
require('./fonts/index.css');
require('./base.scss');
require('./slick.css');

const styles = {
  container: {
    height: '100%'
  }
};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.shape({
      key: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool
      })
    }).isRequired
  }

  componentDidMount () {
    // Initialize google analytics
    init();
    // Log initial page view
    pageView(this.props.location.pathname);
  }

  componentWillReceiveProps (nextProps) {
    const oldLocation = this.props.location;
    const nextLocation = nextProps.location;
    // Log next view if necessary
    if (nextLocation.pathname !== oldLocation.pathname) {
      pageView(nextLocation.pathname);
    }
    // if we changed routes and we now have a "modal route", save the old children
    if (nextLocation.key !== oldLocation.key && nextLocation.state && nextLocation.state.modal) {
      this.previousChildren = this.props.children;
    }
  }

  render () {
    const location = this.props.location;
    if (location.state && location.state.modal && this.previousChildren) {
      // Render containing page (previousChildren) and modal (children)
      return (
        <div style={styles.container}>
          {this.previousChildren}
          {this.props.children}
        </div>
      );
    }
    // Standard route, nothing special here.
    return this.props.children;
  }
}

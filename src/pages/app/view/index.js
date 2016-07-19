import { init, pageView } from './googleAnalytics';
import React, { Component, PropTypes } from 'react';
import { mediaQueries } from '../../_common/buildingBlocks';
import Radium from 'radium';
import Footer from './footer';
import Header from './header';

require('./reset.css');
require('./fonts/index.css');
require('./base.scss');
require('./slick.css');

const styles = {
  container: {
    minHeight: '100%',
    position: 'relative'
  },
  footerCompensation: {
    paddingBottom: '6.3em',
    [mediaQueries.small]: {
      paddingBottom: '6em'
    },
    [mediaQueries.medium]: {
      paddingBottom: '3em'
    }
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  }
};

@Radium
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.shape({
      key: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool
      })
    }).isRequired,
    params: PropTypes.object,
    routes: PropTypes.array
  };

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
    const standalone = this.props.routes.reduce((acc, curr) => typeof curr.standalone === 'undefined' ? acc : curr.standalone, false);
    const floating = this.props.routes.reduce((acc, curr) => typeof curr.floating === 'undefined' ? acc : curr.floating, false);
    const noNavigation = this.props.routes.reduce((acc, curr) => typeof curr.noNavigation === 'undefined' ? acc : curr.noNavigation, false);
    if (location.state && location.state.modal && this.previousChildren) {
      // Render containing page (previousChildren) and modal (children)
      return (
        <div style={styles.container}>
          {!standalone && <Header currentPathname={location.pathname} floating={floating} noNavigation={noNavigation} />}
          <div style={standalone ? {} : styles.footerCompensation}>{this.previousChildren}</div>
          <div>{this.props.children}</div>
          {!standalone && <Footer style={styles.footer} />}
        </div>
      );
    }
    // Standard route, nothing special here.
    return (
      <div style={styles.container}>
        {!standalone && <Header currentPathname={location.pathname} floating={floating} noNavigation={noNavigation} />}
        <div style={standalone ? {} : styles.footerCompensation}>{this.props.children}</div>
        {!standalone && <Footer style={styles.footer} />}
      </div>
    );
  }
}

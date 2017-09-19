import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { init, pageView } from './googleAnalytics';
import { appSelector } from '../selector';
import { acceptCookies as acceptCookiesFunc } from '../actions';

import NewDesign from '../../index';
import NewHomePage from '../../homePage';

require('./reset.css');
require('./basic.scss');

// App Component
// /////////////

@connect(appSelector, (dispatch) => ({
  acceptCookiesFunc: bindActionCreators(acceptCookiesFunc, dispatch)
}))
@Radium
export default class App extends Component {
  static propTypes = {
    acceptCookies: PropTypes.any,
    acceptCookiesFunc: PropTypes.func.isRequired,
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
    const modalPage = this.props.routes.reduce((acc, curr) => typeof curr.modalPage === 'undefined' ? acc : curr.modalPage, false);
    // Log next view if necessary
    if (nextLocation.pathname !== oldLocation.pathname) {
      pageView(nextLocation.pathname);
    }
    // if we changed routes and we now have a "modal route", save the old children
    if (!modalPage && nextLocation.key !== oldLocation.key && // This is another route
        // The next state is a modal
        nextLocation.state && nextLocation.state.modal &&
        // The previous state was NOT a modal (otherwise we keep the previous children from the most top modal)
        (!oldLocation.state || !(oldLocation.state && oldLocation.state.modal))) {
      this.previousChildren = this.props.children;
    }
  }

  render () {
    const { acceptCookies, children, location, routes, params } = this.props;
    // Show the cookies note if the user did not accept the cookies policy.
    const showCookies = !acceptCookies && routes.reduce((acc, curr) => typeof curr.showCookies === 'undefined' ? acc : curr.showCookies, true);

    if (showCookies) {
      this.props.acceptCookiesFunc();
    }

    const standalone = routes.reduce((acc, curr) => typeof curr.standalone === 'undefined' ? acc : curr.standalone, false);
    const modalPage = routes.reduce((acc, curr) => typeof curr.modalPage === 'undefined' ? acc : curr.modalPage, false);

    if (standalone) {
      return (
        <div>
          <div>{children}</div>
        </div>
      );
    }
    if (location.state && location.state.modal && this.previousChildren) {
      return (
        <div>
          <NewDesign location={location}>{this.previousChildren}</NewDesign>
          <div>{children}</div>
        </div>
      );
    }
    if ((!location.state && modalPage) || (location.state && modalPage && !this.previousChildren)) {
      return (
        <div>
          <NewDesign location={location}><NewHomePage location={location} params={params}/></NewDesign>
          <div>{children}</div>
        </div>
      );
    }
    return (
      <div>
        <NewDesign location={location}>{children}</NewDesign>
      </div>
    );
  }
}

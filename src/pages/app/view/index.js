import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { mediaQueries } from '../../_common/buildingBlocks';
import Footer from './footer';
import { init, pageView } from './googleAnalytics';
import Header from './header';
import Cookies from './cookies';
import { locales } from '../../../locales';
import { appSelector } from '../selector';

import NewDesign from '../../newHome/view';
import NewHomePage from '../../newHome/view/homePage';

require('./reset.css');
require('./basic.scss');
// require('./fonts/index.css');
// require('./base.scss');
// require('./slick.css');

// HrefLang Component
// //////////////////

class HrefLang extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool
      })
    }).isRequired
  }

  render () {
    const { location: { pathname, search } } = this.props;
    const { origin } = window.location;
    // Split pathname in pathnameLocale and pathnameRest
    let pathnameLocale;
    let pathnameRest;
    for (const locale of locales) {
      // case: /xx where xx is a locale
      if (pathname === `/${locale}`) {
        pathnameLocale = locale;
        pathnameRest = '';
        break;
      }
      // case: /xx/(...) where xx is a locale
      if (pathname.startsWith(`/${locale}/`)) {
        pathnameLocale = locale;
        pathnameRest = pathname.substr(`/${locale}/`.length);
        if (pathnameRest !== '') { pathnameRest = `/${pathnameRest}`; }
        break;
      }
    }
    if (!pathnameLocale && !pathnameRest) { // case /xx where xx is not a locale
      pathnameRest = pathname.substr(1); // Strip slash
    }
    // Determine hrefLangLinks
    let hrefLangLinks;
    if (!pathnameRest) { // We requested the home page
      // Add locales + x-default (which is for language selector pages and redirecting pages)
      hrefLangLinks = locales.map((locale) =>
        ({ href: `${origin}/${locale}${search}`, hreflang: locale, rel: 'alternate' }));
      hrefLangLinks.push({ href: `${origin}${search}`, hreflang: 'x-default', rel: 'alternate' });
    } else if (pathnameLocale) { // Standard localized resource
      hrefLangLinks = locales.map((locale) =>
        ({ href: `${origin}/${locale}${pathnameRest}${search}`, hreflang: locale, rel: 'alternate' }));
    } else { // If we're on a non-localized page (e.g. 404), render no hreflang.
      hrefLangLinks = [];
    }
    // Render using react-helmet
    return (<Helmet link={hrefLangLinks} />);
  }
}

// App Component
// /////////////

const styles = {
  container: {
    minHeight: '100%',
    position: 'relative'
  },
  footerCompensation: {
    paddingBottom: '7.7em',
    [mediaQueries.medium]: {
      paddingBottom: '3.7em'
    }
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  }
};

@connect(appSelector)
@Radium
export default class App extends Component {
  static propTypes = {
    acceptCookies: PropTypes.number,
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
    const standalone = routes.reduce((acc, curr) => typeof curr.standalone === 'undefined' ? acc : curr.standalone, false);
    const floating = routes.reduce((acc, curr) => typeof curr.floating === 'undefined' ? acc : curr.floating, false);
    const noSignInButtonInHeader = routes.reduce((acc, curr) => typeof curr.noSignInButtonInHeader === 'undefined' ? acc : curr.noSignInButtonInHeader, false);
    const newDesign = routes.reduce((acc, curr) => typeof curr.newDesign === 'undefined' ? acc : curr.newDesign, false);
    const modalPage = routes.reduce((acc, curr) => typeof curr.modalPage === 'undefined' ? acc : curr.modalPage, false);
    if (!newDesign && location.state && location.state.modal && this.previousChildren) {
      // Render containing page (previousChildren) and modal (children)
      return (
        <div style={styles.container}>
          <HrefLang location={location} />
          {!standalone && <Header currentPathname={location.pathname} floating={floating} noSignInButtonInHeader={noSignInButtonInHeader} />}
          <div style={standalone ? {} : styles.footerCompensation}>{this.previousChildren}</div>
          <div>{children}</div>
          {showCookies && <Cookies />}
          {!standalone && <Footer style={styles.footer} />}
        </div>
      );
    }
    if (newDesign) {
      if (location.state && location.state.modal && this.previousChildren) {
        return (
          <div>
            <HrefLang location={location} />
            <NewDesign location={location}>{this.previousChildren}</NewDesign>
            <div>{children}</div>
            {showCookies && <Cookies />}
          </div>
        );
      }
      if ((!location.state && modalPage) || (location.state && modalPage && !this.previousChildren)) {
        return (
          <div>
            <HrefLang location={location} />
            <NewDesign location={location}><NewHomePage location={location} params={params}/></NewDesign>
            <div>{children}</div>
            {showCookies && <Cookies />}
          </div>
        );
      }
      return (
        <div>
          <HrefLang location={location} />
          <NewDesign location={location}>{children}</NewDesign>
          {showCookies && <Cookies />}
        </div>
      );
    }
    // Standard route, nothing special here.
    return (
      <div style={styles.container}>
        <HrefLang location={location} />
        {!standalone && <Header currentPathname={location.pathname} floating={floating} noSignInButtonInHeader={noSignInButtonInHeader} />}
        <div style={standalone ? {} : styles.footerCompensation}>{children}</div>
        {showCookies && <Cookies />}
        {!standalone && <Footer style={styles.footer} />}
      </div>
    );
  }
}

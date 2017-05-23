/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../../../_common/localized';
import { IconFacebook, IconTwitter, IconInstagram } from '../icons';

const styles = require('./index.scss');

const spottGrayLogo = require('./spottGray.svg');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Footer extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { currentLocale, t } = this.props;

    return (
      <footer styleName='footer responsive-container'>
        <div styleName='footer-wrapper'>
          <div styleName='footer-main-col'>
            <div styleName='footer-sub-col'>
              <div styleName='footer-left'>
                <Link styleName='logo' to={`/${currentLocale}`}>
                  <img alt={t('_common.header.home')} src={spottGrayLogo}/>
                </Link>
                <div styleName='footer-dsc'>
                  Spott allows you to find products in the things you watch.
                </div>
              </div>
            </div>
            <div styleName='footer-sub-col'>
              <nav styleName='footer-navs'>
                <div styleName='footer-nav'>
                  <Link styleName='footer-nav-link' to={`/${currentLocale}/terms`}>Terms</Link>
                  <Link styleName='footer-nav-link' to={`/${currentLocale}/privacy`}>Privacy</Link>
                  <Link styleName='footer-nav-link' to={`/${currentLocale}/cookies`}>Cookie policy</Link>
                </div>
              </nav>
            </div>
          </div>
          <div styleName='footer-main-col'>
            <div styleName='footer-sub-col'>
              <div styleName='footer-follow'>
                Follow us on social media
              </div>
              <div styleName='footer-socials'>
                <a href='https://www.facebook.com/Spott.it/?fref=ts'> <i><IconFacebook /></i></a>
                {currentLocale === 'fr' && <a href='https://twitter.com/SpottBE_fr'> <i><IconTwitter /></i></a>}
                {currentLocale !== 'fr' && <a href='https://twitter.com/SpottBE_nl'> <i><IconTwitter /></i></a>}
                <a href='https://www.instagram.com/spott_be/?hl=nl'> <i><IconInstagram /></i></a>
              </div>
            </div>
            <div styleName='footer-sub-col'>
              <div styleName='footer-copyright'>
                © Spott 2017<br/>
                Appiness, Hertshage 10, 9300 Aalst, Belgium
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

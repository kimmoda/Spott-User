/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import localized from '../_common/localized';
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
                  <img alt={t('common.home')} src={spottGrayLogo}/>
                </Link>
                <div styleName='footer-dsc'>
                  {t('footer.spottDscr')}
                </div>
              </div>
            </div>
            <div styleName='footer-sub-col'>
              <nav styleName='footer-navs'>
                <div styleName='footer-nav'>
                  <Link styleName='footer-nav-link' to={`/${currentLocale}/terms`}>{t('common.terms')}</Link>
                  <Link styleName='footer-nav-link' to={`/${currentLocale}/privacy`}>{t('common.privacy')}</Link>
                  <Link styleName='footer-nav-link' to={`/${currentLocale}/cookies`}>{t('footer.cookiePolicy')}</Link>
                </div>
              </nav>
            </div>
          </div>
          <div styleName='footer-main-col'>
            <div styleName='footer-sub-col'>
              <div styleName='footer-follow'>
                {t('footer.followUs')}
              </div>
              <div styleName='footer-socials'>
                <a href='https://www.facebook.com/Spott.tv/?fref=ts' target='_blank'> <i><IconFacebook /></i></a>
                {currentLocale === 'fr' && <a href='https://twitter.com/SpottBE_fr' target='_blank'> <i><IconTwitter /></i></a>}
                {currentLocale === 'nl' && <a href='https://twitter.com/SpottBE_nl' target='_blank'> <i><IconTwitter /></i></a>}
                {currentLocale === 'en' && <a href='https://twitter.com/Spott_eng' target='_blank'> <i><IconTwitter /></i></a>}
                <a href='https://www.instagram.com/spott_be/?hl=nl' target='_blank'> <i><IconInstagram /></i></a>
              </div>
            </div>
            <div styleName='footer-sub-col'>
              <div styleName='footer-copyright'>
                © Spott 2017<br/>
                {t('footer.copyright')}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

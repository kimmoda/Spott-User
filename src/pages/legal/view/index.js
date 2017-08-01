/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { Link } from 'react-router';
import localized from '../../_common/localized';
import * as actions from '../../actions';
import { userAccountDetailsSelector } from '../../selectors';

const styles = require('./index.scss');

@localized
@connect(userAccountDetailsSelector, (dispatch) => ({
  loadTopicDetails: bindActionCreators(actions.loadTopicDetails, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class LegalPages extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    history: PropTypes.object,
    location: PropTypes.object.isRequired,
    routerPush: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    userId: PropTypes.string
  };

  constructor (props) {
    super(props);
    this.handleChange = ::this.handleChange;
  }

  handleChange (event) {
    this.props.routerPush({ pathname: event.target.value });
  }

  render () {
    const { children, currentLocale, t, location } = this.props;

    return (
      <section styleName='wrapper responsive-container'>
        <div styleName='content-wrapper'>
          <nav styleName='nav'>
            <ul styleName='nav-list'>
              <li styleName='nav-item'>
                <Link activeClassName={styles['nav-link-active']} styleName='nav-link' to={`/${currentLocale}/terms`}>{t('common.terms')}</Link>
              </li>
              <li styleName='nav-item'>
                <Link activeClassName={styles['nav-link-active']} styleName='nav-link' to={`/${currentLocale}/privacy`}>{t('common.privacy')}</Link>
              </li>
              <li styleName='nav-item'>
                <Link activeClassName={styles['nav-link-active']} styleName='nav-link' to={`/${currentLocale}/cookies`}>{t('footer.cookiePolicy')}</Link>
              </li>
            </ul>
            <select styleName='select-input' value={location.pathname} onChange={this.handleChange}>
              <option value={`/${currentLocale}/terms`}>{t('common.terms')}</option>
              <option value={`/${currentLocale}/privacy`}>{t('common.privacy')}</option>
              <option value={`/${currentLocale}/cookies`}>{t('footer.cookiePolicy')}</option>
            </select>
          </nav>
          <section styleName='content'>
            {children}
          </section>
        </div>
      </section>
    );
  }
}

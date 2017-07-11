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
export default class NewUserSettingsPage extends Component {
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
    this.state = {
      currentPage: `/${this.props.currentLocale}/user/settings`
    };
    if (!this.props.userId) {
      this.props.routerPush({ pathname: `/${this.props.currentLocale}/login`, state: { returnTo: ((this.props.location && this.props.location.pathname) || '/') } });
    }
  }

  handleChange (event) {
    this.setState({ currentPage: event.target.value });
    this.props.routerPush({ pathname: event.target.value });
  }

  render () {
    const { children, currentLocale, t } = this.props;
    const { currentPage } = this.state;

    return (
      <section styleName='wrapper responsive-container'>
        <div styleName='content-wrapper'>
          <nav styleName='nav'>
            <ul styleName='nav-list'>
              <li styleName='nav-item'>
                <Link activeClassName={styles['nav-link-active']} styleName='nav-link' to={`/${currentLocale}/user/settings`}>{t('common.profile')}</Link>
              </li>
              <li styleName='nav-item'>
                <Link activeClassName={styles['nav-link-active']} styleName='nav-link' to={`/${currentLocale}/user/account`}>{t('common.account')}</Link>
              </li>
              <li styleName='nav-item'>
                <Link activeClassName={styles['nav-link-active']} styleName='nav-link' to={`/${currentLocale}/user/subscriptions`}>{t('userSettings.manageSubscriptions')}</Link>
              </li>
            </ul>
            <select value={currentPage} onChange={this.handleChange}>
              <option value={`/${currentLocale}/user/settings`}>{t('common.profile')}</option>
              <option value={`/${currentLocale}/user/account`}>{t('common.account')}</option>
              <option value={`/${currentLocale}/user/subscriptions`}>{t('userSettings.manageSubscriptions')}</option>
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

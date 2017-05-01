/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import localized from '../../../../_common/localized';
import * as actions from '../../../actions';
import { topicDetailsSelector } from '../../../selectors';

const styles = require('./index.scss');

@localized
@connect(topicDetailsSelector, (dispatch) => ({
  loadTopicDetails: bindActionCreators(actions.loadTopicDetails, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserSettingsPage extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { children, currentLocale } = this.props;

    return (
      <section styleName='wrapper'>
        <div styleName='content-wrapper'>
          <nav styleName='nav'>
            <ul styleName='nav-list'>
              <li styleName='nav-item'>
                <Link activeClassName={styles['nav-link-active']} styleName='nav-link' to={`/${currentLocale}/user/settings`}>Profile</Link>
              </li>
              <li styleName='nav-item'>
                <Link activeClassName={styles['nav-link-active']} styleName='nav-link' to={`/${currentLocale}/user/account`}>Account</Link>
              </li>
              <li styleName='nav-item'>
                <Link activeClassName={styles['nav-link-active']} styleName='nav-link' to={`/${currentLocale}/user/subscriptions`}>Manage Subscriptions</Link>
              </li>
            </ul>
          </nav>
          <section styleName='content'>
            {children}
          </section>
        </div>
      </section>
    );
  }
}

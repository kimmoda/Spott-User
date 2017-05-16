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
    history: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.handleChange = ::this.handleChange;
    this.state = {
      currentPage: `/${this.props.currentLocale}/user/settings`
    };
  }

  handleChange (event) {
    this.setState({ currentPage: event.target.value });
    console.log(this);
    this.context.router.push(event.target.value);
  }

  render () {
    const { children, currentLocale } = this.props;
    const { currentPage } = this.state;

    return (
      <section styleName='wrapper responsive-container'>
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
            <select value={currentPage} onChange={this.handleChange}>
              <option value={`/${currentLocale}/user/settings`}>Profile</option>
              <option value={`/${currentLocale}/user/account`}>Account</option>
              <option value={`/${currentLocale}/user/subscriptions`}>Manage Subscriptions</option>
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

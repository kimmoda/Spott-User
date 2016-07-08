import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../app/actions';
import { authenticationTokenSelector, currentUserFirstnameSelector, currentUserLastnameSelector, currentUserIdSelector } from '../../app/selector';
import { Link } from 'react-router';
import $ from 'jquery';
import { slugify } from '../../../utils';
import localized from '../localized';

require('./navbar.scss');

const spottImage = require('./spott.png');
const medialaanImage = require('./medialaan.jpg');

@localized
class Navbar extends Component {

  static propTypes = {
    currentPathname: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    currentUsername: PropTypes.string,
    hideRightBar: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    medialaanLogo: PropTypes.bool,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.logout = ::this.logout;
  }

  handleClick (target, e) {
    e.preventDefault();
    this.scrollToHash(`#${target}`);
  }

  scrollToHash (id) {
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 850);
    return false;
  }

  logout (e) {
    e.preventDefault();
    this.props.logout();
  }

  renderLeftNavBar () {
    if (this.props.hideRightBar && !this.props.medialaanLogo) {
      return (
        <div className='navbar__logo__centered navbar__left'>
          <Link to='/'>
            <img src={spottImage} />
          </Link>
        </div>
      );
    } else if (this.props.hideRightBar && this.props.medialaanLogo) {
      return (
        <div className='navbar__logo__centered centered--2 navbar__left'>
          <Link to='/'>
            <img src={spottImage} />
          </Link>
          <a href='http://www.medialaan.be' target='_blank'>
            <img src={medialaanImage} />
          </a>
        </div>
      );
    }
    return (
      <div className='navbar__left'>
        <Link to='/'>
          <img src={spottImage} />
        </Link>
      </div>
    );
  }

  renderRightNavBar () {
    const { isAuthenticated, currentUserId, currentPathname, currentUsername, t } = this.props;
    if (this.props.hideRightBar) {
      return null;
    }
    return (
      <div className='navbar__right'>
        <ul>
          <li className='navbar__regitem'>
            <Link className='navbar__link' to='/'>{t('_common.navBar.home')}</Link>
          </li>
          {currentPathname !== '/login' && !isAuthenticated &&
            <li className='navbar__cta'>
             <Link className='navbar__link' to={{
               pathname: '/login',
               state: { modal: true, returnTo: this.props.currentPathname }
             }}>
               {t('_common.navBar.login')}
             </Link>
            </li>}
          {isAuthenticated &&
            <li className='navbar__regitem'>
              <Link className='navbar__link' to={`/profile/${slugify(currentUsername)}/${currentUserId}`}>{t('_common.navBar.myWishlists')}</Link>
            </li>}
          {isAuthenticated &&
            <li className='navbar__cta'>
              <a className='navbar__link' href='#' onClick={this.logout}>
                {t('_common.navBar.logout')}</a>
            </li>}
        </ul>
      </div>
    );
  }

  render () {
    return (
      <nav>
        <div className='wrapper'>
          {this.renderLeftNavBar()}
          {this.renderRightNavBar()}
        </div>
      </nav>
    );
  }
}

export default connect((state) => ({
  isAuthenticated: Boolean(authenticationTokenSelector(state)),
  currentUsername: `${currentUserFirstnameSelector(state)} ${currentUserLastnameSelector(state)}`,
  currentUserId: currentUserIdSelector(state)
}), (dispatch) => ({
  logout: bindActionCreators(actions.doLogout, dispatch)
}))(Navbar);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions';
import { authenticationTokenSelector } from '../../../selectors';
import { Link } from 'react-router';
import $ from 'jquery';

require('./navbar.scss');

const spottImage = require('./spott.png');
const medialaanImage = require('./medialaan.jpg');

class Navbar extends Component {

  static propTypes = {
    currentPathname: PropTypes.string.isRequired,
    hideRightBar: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    medialaanLogo: PropTypes.bool
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
    const { isAuthenticated } = this.props;
    if (this.props.hideRightBar) {
      return null;
    }
    return (
      <div className='navbar__right'>
        <ul>
          <li className='navbar__regitem'>
            <Link className='navbar__link' to='/content'>Content</Link>
          </li>
          <li className='navbar__regitem'>
            <Link className='navbar__link' to='/subscribe'>Subscribe</Link>
          </li>
          <li className='navbar__regitem'>
            <Link className='navbar__link' to='/get-in-touch'>Get in touch</Link>
          </li>
          {!isAuthenticated &&
            <li className='navbar__cta'>
             <Link className='navbar__link' to={{
               pathname: '/login',
               state: { modal: true, returnTo: this.props.currentPathname }
             }}>
               Login
             </Link>
            </li>}
          {isAuthenticated &&
            <li className='navbar__cta'>
              <a className='navbar__link' href='#logout' onClick={this.logout}>Logout</a>
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
  isAuthenticated: Boolean(authenticationTokenSelector(state))
}), (dispatch) => ({
  logout: bindActionCreators(actions.doLogout, dispatch)
}))(Navbar);

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, colors, Container, fontWeights, makeTextStyle, mediaQueries, pinkButtonStyle } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import Radium from 'radium';
import Dropdown from '../../_common/dropdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../app/actions';
import { authenticationTokenSelector, currentUserAvatarSelector, currentUserFirstnameSelector, currentUserLastnameSelector, currentUserIdSelector } from '../../app/selector';
import { slugify } from '../../../utils';

const spottImage = require('./spott.png');
const dummyAvatarImage = require('./dummyAvatar.svg');
const RadiumLink = Radium(Link);

const styles = {
  wrapper: {
    backgroundColor: 'white'
  },
  container: {
    paddingTop: '1.125em',
    paddingBottom: '1em',
    display: 'flex'
  },
  logoSection: {
    container: {
      flex: '1'
    },
    logo: {
      height: '2.8125em',
      width: 'auto'
    }
  },
  userSection: {
    container: {},
    avatar: {
      width: '2.125em',
      height: '2.125em',
      borderRadius: '100%',
      float: 'left',
      marginRight: '1.875em',
    },
    arrow: {
      textDecoration: 'none',
      color: colors.coolGray
    },
    menuItem: {

    }
  }

};
@Radium
@localized
class Header extends Component {

  static propTypes = {
    currentPathname: PropTypes.string.isRequired,
    currentUserAvatar: PropTypes.string,
    currentUserId: PropTypes.string,
    currentUsername: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context);
    this.onLogoutClick = ::this.onLogoutClick
  }

  onLogoutClick (e) {
    e.preventDefault();
    this.props.logout();
  }

  render () {
    const { isAuthenticated, currentUsername, currentUserAvatar, currentUserId, t } = this.props;
    console.log('xx', currentUserAvatar);
    return (
      <header style={styles.wrapper}>
        <Container style={styles.container}>
          <div style={styles.logoSection.container}>
            <Link to='/'>
              <img alt={t('_common.header.home')} src={spottImage} style={styles.logoSection.logo} />
            </Link>
          </div>
          <div style={styles.userSection.container}>
            {isAuthenticated &&
              <div>
                <Dropdown button={
                  <div>
                    <img src={currentUserAvatar ? currentUserAvatar.get('url') : dummyAvatarImage} style={styles.userSection.avatar} />
                    <span style={styles.userSection.arrow}>▾</span>
                  </div>
                }>
                  <Button style={styles.userSection.menuItem} to={`/profile/${slugify(currentUsername)}/${currentUserId}`}>{currentUsername}</Button>
                  <Button style={styles.userSection.menuItem} onClick={this.onLogoutClick}>{t('_common.header.logout')}</Button>
                </Dropdown>
              </div>}
            {!isAuthenticated &&
              <div>
                <Button style={pinkButtonStyle} to={{
                  pathname: '/login',
                  state: { modal: true, returnTo: this.props.currentPathname }
                }}>
                  {t('_common.header.login')}
                </Button>
              </div>}
          </div>
        </Container>
      </header>
    );
  }

}

export default connect((state) => ({
  isAuthenticated: Boolean(authenticationTokenSelector(state)),
  currentUserAvatar: currentUserAvatarSelector(state),
  currentUsername: `${currentUserFirstnameSelector(state)} ${currentUserLastnameSelector(state)}`,
  currentUserId: currentUserIdSelector(state),
}), (dispatch) => ({
  logout: bindActionCreators(actions.doLogout, dispatch)
}))(Header);



/*
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
      <Link className='navbar__link'>{t('_common.navBar.myWishlists')}</Link>
    </li>}
  {isAuthenticated &&
    <li className='navbar__cta'>
      <a className='navbar__link' href='#' onClick={this.logout}>
        {t('_common.navBar.logout')}</a>
    </li>}

  */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { push as routerPush } from 'react-router-redux';
import { Button, colors, Container, fontWeights, makeTextStyle, mediaQueries, pinkButtonStyle } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import Radium from 'radium';
import Dropdown from '../../_common/dropdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../app/actions';
import { authenticationTokenSelector, currentUserAvatarSelector, currentUserFirstnameSelector, currentUserLastnameSelector, currentUserIdSelector } from '../../app/selector';
import { basketDataSelector } from '../../basket/selectors';
import { slugify } from '../../../utils';

const spottBlackImage = require('./spott.svg');
const spottWhiteImage = require('./spottWhite.svg');
const dummyAvatarImage = require('./dummyAvatar.svg');

const styles = {
  wrapper: {
    base: {
      backgroundColor: 'white',
      zIndex: 1
    },
    floating: {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      left: 0,
      right: 0
    }
  },
  container: {
    paddingTop: '1.125em',
    paddingBottom: '1em',
    display: 'flex',
    alignItems: 'center'
  },
  logoSection: {
    container: {
      display: 'block'
    },
    logo: {
      display: 'block',
      height: '2.125em',
      width: 'auto',
      [mediaQueries.medium]: {
        height: '2.8125em'
      }
    }
  },
  basket: {
    container: {
      margin: '6px 40px 0 auto',
      position: 'relative'
    },
    dot: {
      position: 'absolute',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: colors.darkPink,
      top: '-3px',
      left: '22px'
    }
  },
  userSection: {
    container: {
      textAlign: 'right'
    },
    trigger: {
      lineHeight: '2.125em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    triggerAvatar: {
      borderRadius: '100%',
      display: 'inline-block',
      width: '2.125em',
      height: '2.125em',
      marginRight: '0.5em',
      verticalAlign: 'middle'
    },
    triggerArrow: {
      base: {
        float: 'right',
        textDecoration: 'none',
        color: colors.coolGray
      },
      floating: {
        color: colors.white
      }
    },
    menu: {
      top: '30px',
      marginTop: '0.625em',
      borderRadius: '0.25em',
      backgroundColor: colors.white,
      boxShadow: '0 6px 8px 0 rgba(0, 0, 0, 0.3)',
      border: `1px solid ${colors.whiteThree}`,
      width: 200
    },
    menuItem: {
      ...makeTextStyle(fontWeights.regular, '0.8125em', '0.023em'),
      textTransform: 'none',
      display: 'block',
      color: 'black',
      textAlign: 'left',
      width: '100%',
      ':hover': {
        backgroundColor: colors.whiteThree
      }
    },
    profileMenuItem: {
      borderBottom: `1px solid ${colors.whiteTwo}`
    },
    signInButton: {
      marginLeft: 'auto'
    }
  }
};

@connect(null, (dispatch) => ({
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@localized
@Radium
class Header extends Component {

  // noinspection Eslint
  static propTypes = {
    basketData: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentPathname: PropTypes.string.isRequired,
    currentUserAvatar: ImmutablePropTypes.mapContains({
      url: PropTypes.string
    }),
    currentUserId: PropTypes.string,
    currentUsername: PropTypes.string,
    floating: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    noSignInButtonInHeader: PropTypes.bool,
    routerPush: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context);
    this.onLogoutClick = ::this.onLogoutClick;
  }

  onLogoutClick (e) {
    e.preventDefault();
    this.props.logout();
    this.props.routerPush('/');
  }

  render () {
    const { currentLocale, currentUsername, currentUserAvatar, currentUserId, floating, isAuthenticated, noSignInButtonInHeader, t, basketData } = this.props;
    return (
      <header style={[ styles.wrapper.base, floating && styles.wrapper.floating ]}>
        <Container style={styles.container}>
          <div style={styles.logoSection.container}>
            <Link to={`/${currentLocale}`}>
              <img alt={t('_common.header.home')} src={floating ? spottWhiteImage : spottBlackImage} style={styles.logoSection.logo} />
            </Link>
          </div>
          <div style={styles.basket.container}>
            {!noSignInButtonInHeader &&
            <Link to={isAuthenticated ? `/${currentLocale}/basket` : { pathname: `/${currentLocale}/login`, state: { modal: true, returnTo: this.props.currentPathname } }}>
              {(basketData.get('transactions') && Boolean(basketData.get('transactions').size)) && <div style={styles.basket.dot} />}
              <svg height='23' viewBox='0 0 24 23' width='24' xmlns='http://www.w3.org/2000/svg' >
                <defs>
                  <path d='M2.4 19.5c0 .3.3.5.6.5h14c.3 0 .5-.2.6-.5l2.3-11c0-.3-.2-.5-.5-.5H.5c-.3 0-.5.2-.4.5l2.4 11z' id='a'/>
                  <mask height='15' id='b' width='22.8' x='-1.5' y='-1.5'>
                    <path d='M-1.4 6.5h22.8v15H-1.4z' fill='#fff'/>
                    <path d='M2.4 19.5c0 .3.3.5.6.5h14c.3 0 .5-.2.6-.5l2.3-11c0-.3-.2-.5-.5-.5H.5c-.3 0-.5.2-.4.5l2.4 11z' id='a'/>
                  </mask>
                </defs>
                <g fill='none' fillRule='evenodd' stroke={(basketData.get('transactions') && Boolean(basketData.get('transactions').size)) ? '#000' : '#A7A6A9'} transform='translate(2 1)'>
                  <path d='M2.4 19.5c0 .3.3.5.6.5h14c.3 0 .5-.2.6-.5l2.3-11c0-.3-.2-.5-.5-.5H.5c-.3 0-.5.2-.4.5l2.4 11z' id='a' mask='url(#b)' strokeWidth='3'/>
                  <path d='M19 7l-6-7M1 7l6-7M10 11v6M6 11v6M14 11v6' strokeWidth='1.5'/>
                </g>
              </svg>
            </Link> }
          </div>
          <div style={styles.userSection.container}>
            {!noSignInButtonInHeader && isAuthenticated &&
              <div>
                  <div style={styles.userSection.trigger}>
                    <Link style={styles.userSection.profileLink} to={`/${currentLocale}/profile/${slugify(currentUsername)}/${currentUserId}`}>
                      <img src={currentUserAvatar ? `${currentUserAvatar.get('url')}?height=64&width=64` : dummyAvatarImage} style={styles.userSection.triggerAvatar} />
                    </Link>
                    <Dropdown
                      button={<span style={[ styles.userSection.triggerArrow.base, floating && styles.userSection.triggerArrow.floating ]}>▾</span>}
                      contentStyle={styles.userSection.menu}>
                      <Button style={[ styles.userSection.menuItem, styles.userSection.profileMenuItem ]} to={`/${currentLocale}/profile/${slugify(currentUsername)}/${currentUserId}`}>{currentUsername}</Button>
                      <Button style={[ styles.userSection.menuItem, styles.userSection.profileMenuItem ]} to={`/${currentLocale}/orders`}>{t('basket.myOrders')}</Button>
                      <Button style={styles.userSection.menuItem} onClick={this.onLogoutClick}>{t('_common.header.logout')}</Button>
                    </Dropdown>
                </div>
              </div>}
            {!noSignInButtonInHeader && !isAuthenticated &&
              <Button style={{ ...pinkButtonStyle, ...styles.userSection.signInButton }} to={{
                pathname: `/${currentLocale}/login`,
                state: { modal: true, returnTo: this.props.currentPathname }
              }}>
                {t('_common.header.login')}
              </Button>}
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
  basketData: basketDataSelector(state)
}), (dispatch) => ({
  logout: bindActionCreators(actions.doLogout, dispatch)
}))(Header);

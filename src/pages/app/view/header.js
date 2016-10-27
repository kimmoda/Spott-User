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
  userSection: {
    container: {
      flex: '1',
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

  static propTypes = {
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
    const { currentLocale, currentUsername, currentUserAvatar, currentUserId, floating, isAuthenticated, noSignInButtonInHeader, t } = this.props;
    return (
      <header style={[ styles.wrapper.base, floating && styles.wrapper.floating ]}>
        <Container style={styles.container}>
          <div style={styles.logoSection.container}>
            <Link to={`/${currentLocale}`}>
              <img alt={t('_common.header.home')} src={floating ? spottWhiteImage : spottBlackImage} style={styles.logoSection.logo} />
            </Link>
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
  currentUserId: currentUserIdSelector(state)
}), (dispatch) => ({
  logout: bindActionCreators(actions.doLogout, dispatch)
}))(Header);

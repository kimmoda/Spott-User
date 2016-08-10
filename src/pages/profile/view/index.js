import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { colors, Container, SubmenuItem, Submenu, fontWeights, makeTextStyle, mediaQueries } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import { userSelector } from '../selector';
import { bindActionCreators } from 'redux';
import { loadUser } from '../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';

const dummyProfilePictureImage = require('./images/dummyProfilePicture.svg');
const dummyProfileAvatarImage = require('./images/dummyProfileAvatar.svg');

const headerStyles = {
  wrapper: {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    position: 'relative'
  },
  backgroundOverlay: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
    position: 'absolute',
    backgroundImage: 'linear-gradient(to top, #221f26, rgba(58, 34, 44, 0))'
  },
  container: {
    position: 'relative' // Display in front of background overlay
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '28%',
    paddingBottom: '7.5%',
    [mediaQueries.small]: {
      paddingTop: '20%',
      flexDirection: 'row'
    },
    [mediaQueries.medium]: {
      paddingTop: '7.72125em',
      paddingBottom: '3.6021em'
    },
    [mediaQueries.large]: {
      paddingTop: '10.064em',
      paddingBottom: '4.55em'
    },
    [mediaQueries.extraLarge]: {
      paddingTop: '11.25em',
      paddingBottom: '5.1875em'
    }
  },
  avatar: {
    flex: '0 0 auto',
    width: '7em',
    height: '7em',
    borderRadius: '100%',
    [mediaQueries.small]: {
      marginRight: '2em'
    },
    [mediaQueries.medium]: {
      width: '7.875em',
      height: '7.875em',
      marginRight: '2.25em'
    },
    [mediaQueries.large]: {
      width: '8.75em',
      height: '8.75em',
      marginRight: '2.5em'
    }
  },
  detailsWrapper: {
    display: 'flex',
    marginTop: '1.5em',
    textAlign: 'center',
    maxWidth: '100%',
    [mediaQueries.small]: {
      textAlign: 'left',
      marginTop: 0
    }
  },
  detailsContainer: {
    overflow: 'hidden',
    maxWidth: '100%'
  },
  title: {
    ...makeTextStyle(fontWeights.bold, '0.6875em', '0.318em'),
    textTransform: 'uppercase',
    color: 'white',
    opacity: 0.5
  },
  name: {
    ...makeTextStyle(fontWeights.light, '1.5em', '0.0625em'),
    paddingTop: '0.2em',
    color: colors.white,
    opacity: 0.98,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [mediaQueries.medium]: {
      ...makeTextStyle(fontWeights.light, '2em', '0.0625em')
    }
  },
  followers: {
    ...makeTextStyle(fontWeights.light, '1.0785em', '0.022em'),
    paddingTop: '0.2em',
    color: colors.white,
    opacity: 0.98,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [mediaQueries.medium]: {
      ...makeTextStyle(fontWeights.light, '1.438em', '0.022em')
    }
  },
  followersCount: {
    ...makeTextStyle(fontWeights.regular)
  }
};

@localized
@Radium
class Header extends Component {
  static propTypes = {
    menu: PropTypes.node.isRequired,
    t: PropTypes.func.isRequired,
    user: ImmutablePropTypes.mapContains({
      firstname: PropTypes.string,
      followerCount: PropTypes.number,
      followingCount: PropTypes.number,
      lastname: PropTypes.string,
      tagline: PropTypes.string
    })
  };

  render () {
    const { menu, user, t } = this.props;
    return (
      <div style={[ headerStyles.wrapper, { backgroundImage: `url(${user.get('picture') ? user.getIn([ 'picture', 'url' ]) : dummyProfilePictureImage})` } ]}>
        <div style={headerStyles.backgroundOverlay}></div>
        <Container style={headerStyles.container}>
          <div style={headerStyles.innerContainer}>
            <img src={user.get('avatar') ? user.getIn([ 'avatar', 'url' ]) : dummyProfileAvatarImage} style={headerStyles.avatar} />
            <div style={headerStyles.detailsWrapper}>
              {user.get('firstname') &&
                <div style={headerStyles.detailsContainer}>
                  <h1 style={headerStyles.title}>User</h1>
                  <h1 style={headerStyles.name}>{user.get('firstname')} {user.get('lastname')}</h1>
                  <p style={headerStyles.followers}>
                    {t('profile.header.followers', { count: user.get('followerCount') || 0 }, (contents, key) => {
                      return <span key={key} style={headerStyles.followersCount}>{contents}</span>;
                    })}
                    &nbsp;—&nbsp;
                    {t('profile.header.following', { count: user.get('followingCount') || 0 }, (contents, key) => {
                      return <span key={key} style={headerStyles.followersCount}>{contents}</span>;
                    })}
                  </p>
                </div>
              }
            </div>
          </div>
          {menu}
        </Container>
      </div>
    );
  }
}

const styles = {
  content: {
    marginBottom: '3em', // We contain only tiles with shadow, so we overcompensate a bit for the shadow.
    marginTop: '2.5em'
  },
  emptyText: {
    ...makeTextStyle(fontWeights.medium, '0.875em'),
    color: colors.slateGray
  },
  return: {
    ...makeTextStyle(fontWeights.bold),
    color: colors.dark,
    textDecoration: 'none'
  }
};

@localized
@connect(userSelector, (dispatch) => ({
  loadUser: bindActionCreators(loadUser, dispatch)
}))
export default class Profile extends Component {
  static propTypes = {
    children: PropTypes.node,
    currentLocale: PropTypes.string.isRequired,
    loadUser: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userSlug: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired,
    user: ImmutablePropTypes.map.isRequired
  };

  componentWillMount () {
    // (Re)fetch the profile.
    this.props.loadUser(this.props.params.userId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.userId !== nextProps.params.userId) {
      this.props.loadUser(nextProps.params.userId);
    }
  }

  render () {
    const { children, currentLocale, user, params: { userId, userSlug }, t } = this.props;
    return (
      <div>
        <Header
          menu={
            <Submenu>
              <SubmenuItem key='savedScenes' name={t('profile.menu.savedScenes')} pathname={`/${currentLocale}/profile/${userSlug}/${userId}/saved-scenes`} />
              <SubmenuItem key='wishlists' name={t('profile.menu.wishlists')} pathname={`/${currentLocale}/profile/${userSlug}/${userId}/wishlists`} />
            </Submenu>
          }
          user={user} />
        <Container style={styles.content}>
          {user.get('firstname') && children}
          {!user.get('firstname') &&
            <div>
              <p style={styles.emptyText}>{t('profile.notExist')} <Link style={styles.return} to={`/${currentLocale}`}>{t('common.return')}</Link></p>
            </div>}
        </Container>
      </div>
    );
  }
}

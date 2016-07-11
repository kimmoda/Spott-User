import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, EntityHeader, SubmenuItem, Page, fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import { userSelector } from '../selector';
import { bindActionCreators } from 'redux';
import { loadUser } from '../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';

const dummyProfilePictureImage = require('./dummyProfilePicture.svg');
const dummyProfileAvatarImage = require('./dummyProfileAvatar.svg');

const headerStyles = {
  image: {
    width: '4.375em',
    height: '4.375em',
    borderRadius: '100%',
    float: 'left',
    marginRight: '1.875em',
    backgroundColor: 'transparent'
  },
  name: {
    ...makeTextStyle(fontWeights.bold, '1.750em'),
    color: colors.white
  },
  followers: {
    ...makeTextStyle(fontWeights.regular),
    paddingTop: '0.625em',
    color: colors.white
  },
  followersCount: {
    ...makeTextStyle(fontWeights.bold)
  },
  tagline: {
    ...makeTextStyle(fontWeights.regular),
    opacity: 0.8,
    color: colors.white
  }
};
const Header = localized(function ({ user, t }) {
  return (
    <EntityHeader
      backgroundImage={user.get('picture') === null ? dummyProfilePictureImage : user.getIn([ 'picture', 'url' ])}>
        <img src={user.get('avatar') === null ? dummyProfileAvatarImage : user.getIn([ 'avatar', 'url' ])} style={headerStyles.image} />
        <div>
          <h1 style={headerStyles.name}>{user.get('firstname')} {user.get('lastname')}</h1>
          <h1 style={headerStyles.tagline}>{user.get('tagline')}</h1>
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
    </EntityHeader>
  );
});
Header.propTypes = {
  t: PropTypes.func.isRequired,
  user: ImmutablePropTypes.mapContains({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    followerCount: PropTypes.number.isRequired,
    followingCount: PropTypes.number.isRequired
  })
};

@localized
@connect(userSelector, (dispatch) => ({
  loadUser: bindActionCreators(loadUser, dispatch)
}))
export default class Profile extends Component {
  static propTypes = {
    children: PropTypes.node,
    loadUser: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userSlug: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired,
    user: ImmutablePropTypes.map
  }

  componentWillMount () {
    // (Re)fetch the profile.
    this.props.loadUser(this.props.params.userId);
  }

  render () {
    const { user, params: { userId, userSlug }, t } = this.props;
    return (
      <Page
        currentPathname={this.props.location.pathname}
        header={<Header user={user} />}
        submenuItems={[
          <SubmenuItem key='wishlists' name={t('profile.menu.wishlists')} pathname={`/profile/${userSlug}/${userId}/wishlists`} />
        ]}>
        {this.props.children}
      </Page>
    );
  }
}

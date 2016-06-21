import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, EntityHeader, SubmenuItem, Page, fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import { userSelector } from '../selector';
import { loadUser } from '../actions';

const dummyProfilePictureImage = require('./dummyProfilePicture.svg');
const dummyProfileAvatarImage = require('./dummyProfileAvatar.svg');

const headerStyles = {
  image: {
    width: '4.375em',
    height: '4.375em',
    borderRadius: '100%',
    float: 'left',
    marginRight: '1.875em'
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
// TODO add buttons={<Button>Edit Profile</Button>}
// TODO propTypes define them correctly
const Header = ({ user }) => (
  <EntityHeader
    backgroundImage={user.get('picture') === null ? dummyProfilePictureImage : user.getIn([ 'picture', 'url' ])}>
      <img src={user.get('avatar') === null ? dummyProfileAvatarImage : user.getIn([ 'picture', 'url' ])} style={headerStyles.image} />
      <div>
        <h1 style={headerStyles.name}>{user.get('firstname')} {user.get('lastname')}</h1>
        <h1 style={headerStyles.tagline}>{user.get('tagline')}</h1>
        <p style={headerStyles.followers}>
          <span style={headerStyles.followersCount}>{user.get('followerCount')}</span> followers&nbsp;—&nbsp;
          <span style={headerStyles.followersCount}>{user.get('followingCount')}</span> following
        </p>
      </div>
  </EntityHeader>
);
Header.propTypes = {
  user: PropTypes.any
};

// TODO: proptypes
@connect(userSelector)
export default class Profile extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  static needs (props, store) {
    // (Re)fetch the profile.
    return store.dispatch(loadUser(props.params.userId));
  }

  render () {
    const { user, params: { userId, userSlug } } = this.props;
    return (
      <Page
        currentPathname={this.props.location.pathname}
        header={<Header user={user} />}
        submenuItems={[
          <SubmenuItem key='wishlists' name='Wishlists' pathname={`/profile/${userSlug}/${userId}/wishlists`} />
        ]}>
        {this.props.children}
      </Page>
    );
  }
}

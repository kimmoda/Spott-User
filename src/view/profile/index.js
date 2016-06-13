import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, EntityHeader, SubmenuItem, Page, fontWeights, makeTextStyle } from '../_common/buildingBlocks';
import { userProfileSelector } from '../../selectors';

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
const Header = connect(userProfileSelector)(({ avatar, firstname, followerCount, followingCount, lastname, picture, tagline }) => (
  //     buttons={<Button>Edit Profile</Button>}
  <EntityHeader
    backgroundImage={picture || dummyProfilePictureImage}>
      <img src={avatar || dummyProfileAvatarImage} style={headerStyles.image} />
      <div>
        <h1 style={headerStyles.name}>{firstname} {lastname}</h1>
        <h1 style={headerStyles.tagline}>{tagline}</h1>
        <p style={headerStyles.followers}>
          <span style={headerStyles.followersCount}>{followerCount}</span> followers&nbsp;—&nbsp;
          <span style={headerStyles.followersCount}>{followingCount}</span> following
        </p>
      </div>
  </EntityHeader>
));
Header.propTypes = {
  avatar: PropTypes.any,
  firstname: PropTypes.any,
  followerCount: PropTypes.any,
  followingCount: PropTypes.any,
  lastname: PropTypes.any,
  picture: PropTypes.any,
  tagline: PropTypes.any
};

export default class Profile extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    return (
      <Page
        currentPathname={this.props.location.pathname}
        header={<Header />}
        submenuItems={[
          <SubmenuItem name='Wishlists' pathname='/profile/wishlist' />
        ]}>
        {this.props.children}
      </Page>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { Button, colors, EntityHeader, SubmenuItem, Page, fontWeights, makeTextStyle } from '../_common/buildingBlocks';

const headerStyles = {
  image: {
    width: '4.375em',
    height: '4.375em',
    borderRadius: '100%'
  },
  name: {
    ...makeTextStyle(fontWeights.bold, '1.750em'),
    color: colors.white
  },
  followers: {
    ...makeTextStyle(fontWeights.regular),
    color: colors.white
  },
  followersCount: {
    ...makeTextStyle(fontWeights.bold)
  }
};
const Header = (props) => (
  <EntityHeader
    backgroundImage='linear-gradient(to right, #d9345d, rgb(31, 188, 233))'
    buttons={<Button>Edit Profile</Button>}>
    <img src={''} style={headerStyles.image} />
    <h1 style={headerStyles.name}>Andy Jacobs</h1>
    <p style={headerStyles.followers}>
      <span style={headerStyles.followersCount}>225</span> followers&nbsp;—&nbsp;
      <span style={headerStyles.followersCount}>566</span> following
    </p>
  </EntityHeader>
);

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

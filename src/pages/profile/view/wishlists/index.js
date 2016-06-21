import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import Tiles from '../../../_common/tiles';
import { wishlistsOfCurrentUserSelector } from '../../selector';
import { fetchWishlistsOfUser } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { slugify } from '../../../../utils';
const RadiumLink = Radium(Link);

const placeholderLargeImage = require('./placeholderLarge.png');

const itemStyles = {
  container: {
    border: `1px solid ${colors.whiteThree}`,
    backgroundColor: colors.white,
    display: 'block',
    padding: '1.25em',
    textDecoration: 'none',
    ':hover': {
      filter: 'brightness(1.1) saturate(1.7)'
    }
  },
  name: {
    ...makeTextStyle(fontWeights.medium, '1.0625em'),
    color: colors.slateGray
  },
  image: {
    marginTop: '1.25em',
    width: '100%',
    paddingBottom: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center center'
  }
};
class Wishlist extends Component {
  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    item: ImmutablePropTypes.mapContains({
      fixed: PropTypes.bool.isRequired,
      image: ImmutablePropTypes.mapContains({
        url: PropTypes.string.isRequired
      }),
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    }),
    style: PropTypes.object
  }

  render () {
    const { baseUrl, item, style } = this.props;
    return (
      <div style={style}>
        <RadiumLink style={itemStyles.container} to={`${baseUrl}/${slugify(item.get('name')) || 'unnamed-wishlist'}/${item.get('id')}`}>
          <p style={itemStyles.name}>{item.get('name') || '\u00a0'}</p>
          <div style={{ ...itemStyles.image, backgroundImage: `url(${item.get('image') === null ? placeholderLargeImage : item.getIn([ 'image', 'url' ]) })` }}></div>
        </RadiumLink>
      </div>
    );
  }
}

@connect(wishlistsOfCurrentUserSelector)
export default class Wishlists extends Component {
  static propTypes = {
    wishlists: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    })
  };

  static needs (props, store) {
    // (Re)fetch the profile.
    return store.dispatch(fetchWishlistsOfUser(props.params.userId));
  }

  render () {
    const { params: { userId, userSlug }, wishlists } = this.props;
    return (
      <Tiles horizontalSpacing={10} items={wishlists.get('data')} numColumns={{ 0: 1, 480: 2, 768: 3, 992: 4 }} tile={<Wishlist baseUrl={`/profile/${userSlug}/${userId}/wishlists`} />} verticalSpacing={60} />
    );
  }
}

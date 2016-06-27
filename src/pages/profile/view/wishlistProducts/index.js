import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import Tiles from '../../../_common/tiles';
import { productsOfWishlistSelector } from '../../selector';
import { fetchProductsOfWishlist } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { LOADED } from '../../../../statusTypes';

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
class WishlistProduct extends Component {
  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      buyUrl: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      image: ImmutablePropTypes.mapContains({
        url: PropTypes.string.isRequired
      }),
      priceAmount: PropTypes.number.isRequired,
      priceCurrency: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }),
    style: PropTypes.object
  }

  render () {
    const { item, style } = this.props;
    return (
      <div style={style}>
        <a href={item.get('buyUrl')} style={itemStyles.container} target='_blank'>
          <p style={itemStyles.name}>{item.get('name') || '\u00a0'}</p>
          <div style={{ ...itemStyles.image, backgroundImage: `url(${item.get('image') === null ? 'none' : item.getIn([ 'image', 'url' ]) })` }}></div>
        </a>
      </div>
    );
  }
}

@connect(productsOfWishlistSelector)
export default class WishlistProducts extends Component {
  static propTypes = {
    productsOfWishlist: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    })
  };

  static needs (props, store) {
    // (Re)fetch the profile.
    return store.dispatch(fetchProductsOfWishlist(props.params.wishlistId));
  }

  render () {
    const { productsOfWishlist } = this.props;
    if (productsOfWishlist.get('_status') === LOADED) {
      return (
        <Tiles horizontalSpacing={10} items={productsOfWishlist.get('data')} numColumns={{ 0: 1, 480: 2, 768: 3, 992: 4 }} tile={<WishlistProduct />} verticalSpacing={60} />
      );
    }
    return <div></div>;
  }
}

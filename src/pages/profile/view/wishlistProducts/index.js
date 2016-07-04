import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Link } from 'react-router';
import { colors, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import VerticalTiles from '../../../_common/verticalTiles';
import { productsOfWishlistSelector } from '../../selector';
import { fetchProductsOfWishlist } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FETCHING, LOADED, UPDATING } from '../../../../statusTypes';
import Spinner from '../../../_common/spinner';
import { slugify } from '../../../../utils';

const RadiumLink = Radium(Link);

const itemStyles = {
  container: {
    border: `1px solid ${colors.whiteThree}`,
    backgroundColor: colors.white,
    display: 'block',
    padding: '1.25em',
    textDecoration: 'none',
    ':hover': {
      filter: 'brightness(1.1)'
    }
  },
  name: {
    ...makeTextStyle(fontWeights.medium, '0.875em'),
    color: colors.slateGray,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  image: {
    marginTop: '1.25em',
    width: '100%',
    paddingBottom: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
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
        <RadiumLink style={itemStyles.container} to={`/product/${slugify(item.get('name'))}/${item.get('id')}`}>
          <p style={itemStyles.name}>{item.get('name') || '\u00a0'}</p>
          <div style={{ ...itemStyles.image, backgroundImage: `url(${item.get('image') === null ? 'none' : item.getIn([ 'image', 'url' ]) })` }}></div>
        </RadiumLink>
      </div>
    );
  }
}

const styles = {
  emptyText: {
    ...makeTextStyle(fontWeights.medium, '0.875em'),
    color: colors.slateGray
  },
  title: {
    ...makeTextStyle(fontWeights.light, '1.75em'),
    color: colors.dark,
    paddingBottom: '1.143em'
  }
};
@connect(productsOfWishlistSelector)
export default class WishlistProducts extends Component {
  static propTypes = {
    productsOfWishlist: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list,
      name: PropTypes.string.isRequired
    })
  };

  static needs (props, store) {
    // (Re)fetch the profile.
    return store.dispatch(fetchProductsOfWishlist(props.params.wishlistId));
  }

  render () {
    const { productsOfWishlist } = this.props;
    if (productsOfWishlist.get('_status') === FETCHING) {
      return (<Spinner />);
    } else if (productsOfWishlist.get('_status') === LOADED || productsOfWishlist.get('_status') === UPDATING) {
      if (productsOfWishlist.get('data').size > 0) {
        return (
          <div>
            <h1 style={styles.title}>{productsOfWishlist.get('name') || 'Wishlist'}</h1>
            <VerticalTiles horizontalSpacing={10} items={productsOfWishlist.get('data')} numColumns={{ 0: 1, 480: 2, 768: 3, 992: 4 }} tile={<WishlistProduct />} verticalSpacing={60} />
          </div>
        );
      }
      return (
        <div>
          {productsOfWishlist.get('name') || 'Wishlist'}
          <p style={styles.emptyText}>This wishlist is empty.</p>
        </div>
      );
    }
    return (<div></div>);
  }
}

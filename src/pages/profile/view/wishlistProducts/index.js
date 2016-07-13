import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Link } from 'react-router';
import { colors, fontWeights, makeTextStyle, Money } from '../../../_common/buildingBlocks';
import VerticalTiles from '../../../_common/verticalTiles';
import { productsOfWishlistSelector } from '../../selector';
import { fetchProductsOfWishlist } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { FETCHING, LOADED, UPDATING } from '../../../../data/statusTypes';
import Spinner from '../../../_common/spinner';
import localized from '../../../_common/localized';
import { slugify } from '../../../../utils';
import BaseTile from '../../../_common/tiles/_baseTile';

const RadiumLink = Radium(Link);

const itemStyles = {
  container: {
    backgroundColor: colors.white,
    display: 'block',
    textDecoration: 'none'
  },
  image: {
    width: '100%',
    paddingBottom: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  },
  name: {
    ...makeTextStyle(fontWeights.medium, '0.875em'),
    color: colors.slateGray,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: '1.1428em',
    paddingTop: '1.1428em',
    paddingRight: '1.1428em'
  },
  price: {
    ...makeTextStyle(fontWeights.bold, '0.875em'),
    color: colors.dark,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingTop: '0.1875em',
    paddingLeft: '1.1428em',
    paddingBottom: '1.1428em',
    paddingRight: '1.1428em'
  }
};
@localized
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
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  }

  render () {
    const { item, style } = this.props;
    return (
      <BaseTile style={style}>
        <RadiumLink style={itemStyles.container} to={`/product/${slugify(item.get('name'))}/${item.get('id')}`}>
          <div style={{ ...itemStyles.image, backgroundImage: `url(${item.get('image') === null ? 'none' : item.getIn([ 'image', 'url' ]) })` }}></div>
          <p style={itemStyles.name}>{item.get('name') || '\u00a0'}</p>
          <p style={itemStyles.price}><Money amount={item.get('priceAmount')} currency={item.get('priceCurrency')} /></p>
        </RadiumLink>
      </BaseTile>
    );
  }
}

const styles = {
  emptyText: {
    ...makeTextStyle(fontWeights.medium, '0.875em'),
    color: colors.slateGray
  },
  title: {
    ...makeTextStyle(fontWeights.light, '1.4375em', '0.02174em'),
    color: colors.dark,
    paddingBottom: '1.30435em'
  }
};
@localized
@connect(productsOfWishlistSelector, (dispatch) => ({
  fetchProductsOfWishlist: bindActionCreators(fetchProductsOfWishlist, dispatch)
}))
export default class WishlistProducts extends Component {
  static propTypes = {
    fetchProductsOfWishlist: PropTypes.func.isRequired,
    params: PropTypes.shape({
      wishlistId: PropTypes.string.isRequired
    }),
    productsOfWishlist: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list,
      name: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired
  };

  componentWillMount () {
    // (Re)fetch the wishlist.
    this.props.fetchProductsOfWishlist(this.props.params.wishlistId);
  }

  render () {
    const { productsOfWishlist, t } = this.props;
    if (productsOfWishlist.get('_status') === FETCHING) {
      return (<Spinner />);
    } else if (productsOfWishlist.get('_status') === LOADED || productsOfWishlist.get('_status') === UPDATING) {
      if (productsOfWishlist.get('data').size > 0) {
        return (
          <div style={styles.content}>
            <h1 style={styles.title}>{productsOfWishlist.get('name') || t('profile.wishlists.unnamedWishlist')}</h1>
            <VerticalTiles aspectRatio={1.38876} horizontalSpacing={30} items={productsOfWishlist.get('data')} numColumns={{ 0: 2, 480: 3, 768: 4, 992: 5 }} tile={<WishlistProduct />}
              verticalSpacing={30} />
          </div>
        );
      }
      return (
        <div>
          <h1 style={styles.title}>{productsOfWishlist.get('name') || t('profile.wishlists.unnamedWishlist')}</h1>
          <p style={styles.emptyText}>{t('profile.wishlistProducts.empty')}</p>
        </div>
      );
    }
    return (<div></div>);
  }
}

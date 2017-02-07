/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { colors, fontWeights, formatPrice, load, makeTextStyle, Message, RadiumLink } from '../../../_common/buildingBlocks';
import VerticalTiles from '../../../_common/verticalTiles';
import { productsOfWishlistSelector } from '../../selector';
import { loadProductsOfWishlist, removeProductFromWishlist, loadWishlistsOfUser } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { ERROR } from '../../../../data/statusTypes';
import localized from '../../../_common/localized';
import BaseTile from '../../../_common/tiles/_baseTile';
import hoverable from '../../../_common/hoverable';
import WishlistSettings from '../wishlistSettings';

const iconRemove = require('../images/iconRemove.svg');
const iconSettings = require('../images/iconSettings.svg');

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
    paddingRight: '1.1428em',
    display: 'flex',
    height: '21px',
    boxSizing: 'content-box'
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
  },
  iconWrapper: {
    position: 'absolute',
    top: '11px',
    right: '12px',
    backgroundColor: colors.white,
    width: '30px',
    height: '30px',
    borderRadius: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
@localized
@connect(null, (dispatch) => ({
  loadProductsOfWishlist: bindActionCreators(loadProductsOfWishlist, dispatch),
  removeProductFromWishlist: bindActionCreators(removeProductFromWishlist, dispatch)
}))
@hoverable
class WishlistProduct extends Component {
  static propTypes = {
    hovered: PropTypes.bool.isRequired,
    item: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      image: ImmutablePropTypes.mapContains({
        url: PropTypes.string.isRequired
      }),
      price: ImmutablePropTypes.mapContains({
        amount: PropTypes.number,
        currency: PropTypes.string
      }),
      shortName: PropTypes.string.isRequired
    }),
    loadProductsOfWishlist: PropTypes.func.isRequired,
    location: PropTypes.object,
    removeProductFromWishlist: PropTypes.func.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired,
    wishlistId: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.onRemoveClick = ::this.onRemoveClick;
  }

  onRemoveClick (e) {
    e.preventDefault();
    this.props.removeProductFromWishlist(this.props.wishlistId, this.props.item.get('id'));
    this.props.loadProductsOfWishlist(this.props.wishlistId);
  }

  render () {
    const { item, style, hovered, t } = this.props;
    return load(item, () => (
      <BaseTile style={style}>
        <RadiumLink style={itemStyles.container} to={{
          pathname: item.get('shareUrl'),
          state: { modal: true, returnTo: (location && location.pathname) || '/' }
        }}>
          {hovered &&
            <div style={itemStyles.iconWrapper} title={t('profile.wishlists.delete')} onClick={this.onRemoveClick}>
              <div><img src={iconRemove}/></div>
            </div>
          }
          <div style={{ ...itemStyles.image, backgroundImage: item.get('image') ? `url(${item.getIn([ 'image', 'url' ])})` : 'none' }} />
          <div style={itemStyles.name}>{item.get('shortName') || '\u00a0'}</div>
          <p style={itemStyles.price}>{formatPrice(item.get('price'))}</p>
        </RadiumLink>
      </BaseTile>
    ), null, () => <div>Not found</div>, () => <div>Not found</div>);
  }
}

const styles = {
  return: {
    ...makeTextStyle(fontWeights.bold),
    color: colors.dark,
    textDecoration: 'none'
  },
  title: {
    ...makeTextStyle(fontWeights.light, '1.4375em', '0.02174em'),
    color: colors.dark,
    paddingBottom: '1.30435em',
    display: 'flex',
    alignItems: 'center'
  },
  iconSettings: {
    marginLeft: '10px',
    marginTop: '5px',
    cursor: 'pointer'
  }
};
@localized
@connect(productsOfWishlistSelector, (dispatch) => ({
  loadProductsOfWishlist: bindActionCreators(loadProductsOfWishlist, dispatch),
  loadWishlistsOfUser: bindActionCreators(loadWishlistsOfUser, dispatch)
}))
export default class WishlistProducts extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadProductsOfWishlist: PropTypes.func.isRequired,
    loadWishlistsOfUser: PropTypes.func.isRequired,
    location: PropTypes.object,
    params: PropTypes.shape({
      wishlistId: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired
    }),
    productsOfWishlist: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    }),
    t: PropTypes.func.isRequired,
    wishlist: ImmutablePropTypes.mapContains({
      name: PropTypes.string
    })
  };

  constructor (props) {
    super(props);
    this.onModalClose = ::this.onModalClose;
    this.onSettingsClick = ::this.onSettingsClick;
    this.state = {
      isSettingsOpened: false
    };
  }

  componentWillMount () {
    // (Re)fetch the wishlist.
    this.props.loadProductsOfWishlist(this.props.params.wishlistId);
    if (!this.props.wishlist.get('id')) {
      this.props.loadWishlistsOfUser(this.props.params.userId);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.wishlistId !== nextProps.params.wishlistId) {
      this.props.loadProductsOfWishlist(nextProps.params.wishlistId);
    }
  }

  onModalClose () {
    this.setState({ isSettingsOpened: false });
  }

  onSettingsClick (e) {
    e.preventDefault();
    this.setState({ isSettingsOpened: true });
  }

  render () {
    const { currentLocale, productsOfWishlist, t, wishlist, location } = this.props;

    if (productsOfWishlist.get('_status') === ERROR && productsOfWishlist.get('_error').name === 'UnauthorizedError') {
      return (
        <div>
          <h1 style={styles.title}>{t('profile.wishlists.unnamedWishlist')}</h1>
          <p style={styles.emptyText}>{t('profile.wishlistProducts.private')}</p>
        </div>
      );
    }

    if (productsOfWishlist.get('_status') === ERROR && productsOfWishlist.get('_error').name === 'NotFoundError') {
      return (
        <div>
          <h1 style={styles.title}>{t('profile.wishlists.unnamedWishlist')}</h1>
          <p style={styles.emptyText}>{t('profile.wishlistProducts.notExist')} <Link style={styles.return} to={`/${currentLocale}`}>{t('common.return')}</Link></p>
        </div>
      );
    }

    if (productsOfWishlist.get('data').size === 0) {
      return (
        <div>
          <h1 style={styles.title}>{wishlist.get('name') || t('profile.wishlists.unnamedWishlist')}</h1>
          <Message>{t('profile.wishlistProducts.empty')}</Message>
        </div>
      );
    }

    return (
      <div style={styles.content}>
        <h1 style={styles.title}>
          <span>{wishlist.get('name') || t('profile.wishlists.unnamedWishlist')}</span>
          <div style={styles.iconSettings} title={t('profile.wishlists.editWishlist')} onClick={this.onSettingsClick}><img src={iconSettings}/></div>
          </h1>
        <VerticalTiles
          aspectRatio={1.38876}
          horizontalSpacing={30}
          items={productsOfWishlist.get('data')}
          numColumns={{ extraSmall: 2, small: 3, medium: 4, large: 5, extraLarge: 6, extraExtraLarge: 7 }}
          tile={<WishlistProduct location={location} wishlistId={this.props.params.wishlistId} />}
          verticalSpacing={30} />
          {this.state.isSettingsOpened && <WishlistSettings wishlist={wishlist} onClose={this.onModalClose} />}
      </div>
    );
  }

}

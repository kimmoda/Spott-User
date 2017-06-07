/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { push as routerPush } from 'react-router-redux';
import localized from '../../../_common/localized';
import { IconForward, IconStar, IconClose } from '../icons';
import Tiles from '../tiles';
import { formatPrice } from '../../../_common/buildingBlocks';
import * as actions from '../../actions';
import { sidebarSelector } from '../../selectors';
import ImageLoader from '../imageLoader/index';
import ProductImpressionSensor from '../productImpressionSensor';
import FacebookShareData from '../../../_common/facebookShareData';
import { slugify, getDetailsDcFromLinks } from '../../../../utils';

const styles = require('./index.scss');

@localized
@connect(sidebarSelector, (dispatch) => ({
  addProductToWishlist: bindActionCreators(actions.addProductToWishlist, dispatch),
  loadUserWishlist: bindActionCreators(actions.loadUserWishlist, dispatch),
  removeProductFromWishlist: bindActionCreators(actions.removeProductFromWishlist, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class Sidebar extends Component {
  static propTypes = {
    addProductToWishlist: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    isAuthenticated: PropTypes.string,
    loadUserWishlist: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      state: PropTypes.shape({
        modal: PropTypes.bool,
        returnTo: PropTypes.string,
        sidebarMarker: PropTypes.any
      })
    }).isRequired,
    params: PropTypes.shape({
      spottId: PropTypes.string,
      spottTitle: PropTypes.string,
      productId: PropTypes.string,
      productTitle: PropTypes.string
    }),
    product: PropTypes.any.isRequired,
    removeProductFromWishlist: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onProductClick: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.tileOffsetWidth = parseInt(styles.cssTileOffsetWidth, 10);
    this.onBuyClick = ::this.onBuyClick;
    this.onWishlistClick = ::this.onWishlistClick;
    this.handleResize = ::this.handleResize;

    const { product } = this.props;
    this.state = {
      currentImage: product ? product.getIn([ 'images', '0' ], null) : null,
      inUserWishList: product ? product.get('inUserWishList', false) : false,
      wishListCount: product ? product.get('wishListCount', 0) : 0,
      width: 280
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize);
    this.getWidth();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.product) {
      this.setState({
        currentImage: nextProps.product.getIn([ 'images', '0' ]),
        inUserWishList: nextProps.product.get('inUserWishList'),
        wishListCount: nextProps.product.get('wishListCount')
      });
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize () {
    this.getWidth();
  }

  getWidth () {
    if (this.imageContainer) {
      this.setState({ width: this.imageContainer.clientWidth });
    }
  }

  shareProduct (event) {
    event.preventDefault();
    // console.log(this.props.product.get('shareUrl'));
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.props.product.get('shareUrl'))}&title=Discover ${this.props.product.get('shortName')} now on Spott`, 'name', 'width=600,height=400');
  }

  showSpott (uuid, title) {
    this.props.routerPush({
      pathname: `/${this.props.currentLocale}/spott/${title.replace(/\W+/g, '-')}/${uuid}`,
      state: {
        modal: true,
        returnTo: ((this.props.location && this.props.location.state && this.props.location.pathname.match(new RegExp(/\/spott\/[\w\-\&]+\/[\w\-\/]+/gi)) && !this.props.location.pathname.match(new RegExp(/\/spott\/[\w\-\&]+\/[\w\-]+\/%7B/gi)) ? this.props.location.state.returnTo : this.props.location.pathname) || '/')
      }
    });
  }

  onImageClick (url) {
    this.setState({
      currentImage: url
    });
  }

  async onWishlistClick (productId) {
    if (this.props.isAuthenticated) {
      if (this.state.inUserWishList) {
        this.setState({
          inUserWishList: !this.state.inUserWishList,
          wishListCount: this.state.wishListCount - 1
        });
        await this.props.removeProductFromWishlist({ uuid: this.props.currentUserId, productUuid: productId });
      } else {
        this.setState({
          inUserWishList: !this.state.inUserWishList,
          wishListCount: this.state.wishListCount + 1
        });
        await this.props.addProductToWishlist({ uuid: this.props.currentUserId, productUuid: productId });
      }
      this.props.loadUserWishlist({ uuid: this.props.currentUserId });
    } else {
      this.props.routerPush({ pathname: `/${this.props.currentLocale}/login`, state: { modal: true, returnTo: ((this.props.location && this.props.location.pathname) || '/') } });
    }
  }

  onBuyClick () {
    const postUrl = this.props.product.getIn([ 'offerings', '0', 'buyUrl' ]);
    // Create a form using the good ol' DOM API
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', postUrl);
    form.setAttribute('target', '_blank');
    // Destructive manipulation of the DOM-tree.
    document.body.appendChild(form);
    // Submit form
    form.submit();
    form.remove();
  }

  render () {
    const { product, onBackClick, onProductClick, t, currentLocale } = this.props;
    const { width } = this.state;
    const spottId = this.props.params && this.props.params.spottId;
    const productSpotts = product && product.getIn([ 'spotts', 'data' ]) && product.getIn([ 'spotts', 'data' ]).size
      ? product.getIn([ 'spotts', 'data' ]).filter((item) => item.get('uuid') !== spottId)
      : null;
    const share = product.get('share');

    return (
      <div styleName='sidebar'>
        <div styleName='sidebar-header'>
          <div
            className={product.get('relevance') && (product.get('relevance') === 'EXACT' ? styles['sidebar-title-exact'] : styles['sidebar-title-medium'])}
            styleName='sidebar-title'>
            {product.get('shortName')}
          </div>
          <div styleName='sidebar-close' onClick={onBackClick}>
            <i><IconClose/></i>
          </div>
        </div>
        <div ref={(ref) => { this.imageContainer = ref; }} styleName='sidebar-image'>
          {this.state.currentImage && <ImageLoader imgOriginal={this.state.currentImage} width={width}/>}
        </div>
        <div styleName='sidebar-photos'>
          {product.get('images') && product.get('images').map((item, index) =>
            <div
              className={this.state.currentImage && this.state.currentImage.get('url') === item.get('url') && styles['sidebar-photo-active']}
              key={`sidebar_photo_${index}`}
              style={{ backgroundImage: `url('${item.get('url')}?width=80&height=80'` }}
              styleName='sidebar-photo'
              onClick={this.onImageClick.bind(this, item)}/>
          )}
        </div>
        <div styleName='sidebar-panel'>
          {product && product.getIn([ 'brand', 'name' ]) &&
            <Link
              styleName='sidebar-brand'
              to={{
                pathname: `/${currentLocale}/topic/${slugify(product.getIn([ 'brand', 'name' ]))}/BRAND%7C${product.getIn([ 'brand', 'uuid' ])}`,
                state: { dc: getDetailsDcFromLinks(product.getIn([ 'brand', 'links' ]).toJS()) }
              }}>
              {product.getIn([ 'brand', 'name' ])}
            </Link>}
          <div styleName='sidebar-title2'>{product.get('longName')}</div>
          <div styleName='sidebar-cost'>{formatPrice(product.getIn([ 'offerings', '0', 'price' ]))}</div>
          <div styleName='sidebar-options'>
            <button disabled={!product.get('available')} styleName='sidebar-add' onClick={this.onBuyClick}>
              {Boolean(!product.get('available')) && t('product.outOfStock')}
              {Boolean(product.get('available') && product.getIn([ 'offerings', '0', 'price', 'amount' ])) && t('product.buyNow')}
              {Boolean(product.get('available') && !product.getIn([ 'offerings', '0', 'price', 'amount' ])) && t('product.moreInfo')}
            </button>
          </div>
        </div>
        <div styleName='sidebar-footer'>
          <div
            className={this.state.inUserWishList && styles['sidebar-stars-stared']}
            styleName='sidebar-stars'
            onClick={this.onWishlistClick.bind(this, product.get('uuid'))}>
            <i><IconStar/></i>
            <span>{this.state.wishListCount}</span>
          </div>
          {/*
           <div styleName='sidebar-users'>
             <Users large maxNum={8} />
           </div>
          */}
          <div styleName='sidebar-share' onClick={(event) => this.shareProduct(event)}>
            <i><IconForward/></i>
          </div>
        </div>
        {product.get('description') &&
          <div styleName='sidebar-panel'>
            <div styleName='sidebar-panel-title'>{t('common.description')}</div>
            <div styleName='sidebar-description'>
              {product.get('description')}
            </div>
          </div>}
        {Boolean(productSpotts && productSpotts.size) &&
          <div styleName='sidebar-panel'>
            <div styleName='sidebar-panel-title'>{t('product.alsoSeenIn')}</div>
            <div styleName='sidebar-seens'>
              <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={productSpotts.size}>
                {productSpotts.map((item, index) =>
                  <div
                    key={`spott_${index}`}
                    style={{
                      backgroundImage: `url('${item.getIn([ 'image', 'url' ])}?height=80'`,
                      minWidth: item.getIn([ 'image', 'dimension', 'width' ], 80) * (80 / item.getIn([ 'image', 'dimension', 'height' ], 1))
                    }}
                    styleName='sidebar-seen'
                    onClick={this.showSpott.bind(this, item.get('uuid'), item.get('title'))}/>
                )}
              </Tiles>
            </div>
          </div>}
        {Boolean(product.getIn([ 'similar', 'data' ]) && product.getIn([ 'similar', 'data' ]).size) &&
          <div styleName='sidebar-panel'>
            <div styleName='sidebar-panel-title'>{t('product.similarItems')}</div>
            <div styleName='sidebar-similars'>
              <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={product.getIn([ 'similar', 'data' ]).size}>
                {product.getIn([ 'similar', 'data' ]).map((item, index) =>
                  <ProductImpressionSensor key={`product_imp_${index}`} productId={item.get('uuid')} productLinks={product.get('links')}>
                    <div
                      key={`product_${index}`}
                      style={{ backgroundImage: `url('${item.getIn([ 'image', 'url' ])}?width=80&height=80'` }}
                      styleName='sidebar-similar'
                      onClick={onProductClick.bind(this, item.get('uuid'), item.get('shortName'), product.get('dc'))}/>
                  </ProductImpressionSensor>
                )}
              </Tiles>
            </div>
          </div>}
        {share &&
          <FacebookShareData
            description={share.get('description')}
            imageHeight={share.getIn([ 'image', 'dimension', 'height' ])}
            imageUrl={share.getIn([ 'image', 'url' ])}
            imageWidth={share.getIn([ 'image', 'dimension', 'width' ])}
            title={share.get('title')}
            url={window.location.href}/>}
      </div>
    );
  }
}

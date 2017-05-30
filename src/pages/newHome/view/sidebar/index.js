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

const styles = require('./index.scss');

@localized
@connect(sidebarSelector, (dispatch) => ({
  addProductToWishlist: bindActionCreators(actions.addProductToWishlist, dispatch),
  loadUserWishlist: bindActionCreators(actions.loadUserWishlist, dispatch),
  removeProductFromWishlist: bindActionCreators(actions.removeProductFromWishlist, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch),
  trackImpressionEvent: bindActionCreators(actions.trackImpressionEvent, dispatch)
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
      productTitle: PropTypes.string,
      complexId: PropTypes.string
    }).isRequired,
    product: PropTypes.any.isRequired,
    removeProductFromWishlist: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    trackImpressionEvent: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onProductClick: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.tileOffsetWidth = parseInt(styles.cssTileOffsetWidth, 10);
    this.onBuyClick = ::this.onBuyClick;
    this.onWishlistClick = ::this.onWishlistClick;
    this.handleResize = ::this.handleResize;

    this.state = {
      currentImage: null,
      inUserWishList: null,
      wishListCount: null,
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
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.props.product.get('shareUrl'))}&title=Discover ${this.props.product.get('shortName')} now on Spott`, 'name', 'width=600,height=400');
  }

  showSpott (uuid, title) {
    this.props.routerPush({
      pathname: `/${this.props.currentLocale}/spott/${title.replace(/\W+/g, '-')}/${uuid}`,
      state: {
        modal: true,
        returnTo: ((this.props.location && this.props.location.pathname.match(new RegExp(/\/spott\/[\w\-\&]+\/[\w\-\/]+/gi)) ? this.props.location.state.returnTo : this.props.location.pathname) || '/')
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

  onProductLoad (item) {
    this.props.trackImpressionEvent(item.get('uuid'));
  }

  render () {
    const { product, onBackClick, onProductClick, t, currentLocale } = this.props;
    const { width } = this.state;

    return (
      <div styleName='sidebar'>
        <div styleName='sidebar-header'>
          <div
            className={product.get('relevance') && (product.get('relevance') === 'EXACT' ? styles['sidebar-title-exact'] : styles['sidebar-title-medium'])}
            styleName='sidebar-title'>
            {product.get('shortName')}
          </div>
          <div styleName='sidebar-close' onClick={onBackClick.bind(this, product.get('uuid'))}>
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
          <Link styleName='sidebar-brand' to={`/${currentLocale}/topic/${product.getIn([ 'brand', 'name' ]).replace(/\W+/g, '-')}/BRAND%7C${product.getIn([ 'brand', 'uuid' ])}`}>
            {product.getIn([ 'brand', 'name' ])}
          </Link> }
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
            <div styleName='sidebar-panel-title'>Description</div>
            <div styleName='sidebar-description'>
              {product.get('description')}
            </div>
          </div>}
        {Boolean(product.getIn([ 'spotts', 'data' ]) && product.getIn([ 'spotts', 'data' ]).size) &&
          <div styleName='sidebar-panel'>
            <div styleName='sidebar-panel-title'>Also seen in</div>
            <div styleName='sidebar-seens'>
              <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={product.getIn([ 'spotts', 'data' ]).size}>
                {product.getIn([ 'spotts', 'data' ]).map((item, index) =>
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
            <div styleName='sidebar-panel-title'>Similar Items</div>
            <div styleName='sidebar-similars'>
              <Tiles tileOffsetWidth={this.tileOffsetWidth} tilesCount={product.getIn([ 'similar', 'data' ]).size}>
                {product.getIn([ 'similar', 'data' ]).map((item, index) =>
                  <div
                    key={`product_${index}`}
                    style={{ backgroundImage: `url('${item.getIn([ 'image', 'url' ])}?width=80&height=80'` }}
                    styleName='sidebar-similar'
                    onClick={onProductClick.bind(this, item.get('uuid'), item.get('shortName'))}>
                    <img src={`${item.getIn([ 'image', 'url' ])}?width=80&height=80`} styleName='tracking' onLoad={this.onProductLoad.bind(this, item)}/>
                  </div>
                )}
              </Tiles>
            </div>
          </div>}
      </div>
    );
  }
}

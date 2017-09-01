/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { push as routerPush } from 'react-router-redux';
import localized from '../../../_common/localized';
import { formatPrice } from '../../../_common/buildingBlocks';
import * as actions from '../../../actions';
import ProductImpressionSensor from '../../../productImpressionSensor';
import { getDetailsDcFromLinks, slugify, getPath, backgroundImageStyle } from '../../../../utils';

const styles = require('./index.scss');

@localized
@connect(null, (dispatch) => ({
  loadUserWishlist: bindActionCreators(actions.loadUserWishlist, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserWishlistProduct extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    item: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    routerPush: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onProductClick = ::this.onProductClick;
    this.onProductModalClose = ::this.onProductModalClose;
    this.state = {
      isProductModalOpen: false
    };
  }

  onProductClick () {
    const { location, currentLocale, item: product } = this.props;
    this.props.routerPush({
      pathname: `/${currentLocale}/${getPath(product.get('shareUrl'))}`,
      state: {
        modal: true,
        returnTo: `${location.pathname}${location.search}`
      }
    });
  }

  onProductModalClose () {
    this.setState({
      isProductModalOpen: false
    });
  }

  render () {
    const { item, currentLocale } = this.props;

    return (
      <ProductImpressionSensor productId={item.get('uuid')} productLinks={item.get('links')}>
        <div styleName='product' onClick={this.onProductClick}>
          <div style={backgroundImageStyle(item.getIn([ 'image', 'url' ]), 264, 264)} styleName='product-image'/>
          <Link styleName='product-brand' to={{
            pathname: `/${currentLocale}/topic/${slugify(item.getIn([ 'brand', 'name' ], ''))}/BRAND%7C${item.getIn([ 'brand', 'uuid' ])}`,
            state: { dc: getDetailsDcFromLinks(item.getIn([ 'brand', 'links' ]).toJS()) }
          }}>
            {item.getIn([ 'brand', 'name' ]).trim()}
          </Link>
          <div styleName='product-title'>
            {item.get('shortName')}
          </div>
          <div styleName='product-price'>
            {formatPrice(item.get('price'))}
          </div>
        </div>
      </ProductImpressionSensor>
    );
  }
}

/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import localized from '../../../../../_common/localized';
import { formatPrice } from '../../../../../_common/buildingBlocks';
import * as actions from '../../../../actions';
import ProductModal from '../../../productModal';

const styles = require('./index.scss');

@localized
@connect(null, (dispatch) => ({
  loadUserWishlist: bindActionCreators(actions.loadUserWishlist, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserWishlistProduct extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    item: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
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
    this.setState({ isProductModalOpen: true });
  }

  onProductModalClose () {
    this.setState({
      isProductModalOpen: false
    });
  }

  render () {
    const { item, location, currentLocale } = this.props;

    return (
      <div styleName='product' onClick={this.onProductClick}>
        {this.state.isProductModalOpen && <ProductModal location={location} productId={item.get('uuid')} onClose={this.onProductModalClose}/>}
        <div style={{ backgroundImage: `url(${item.getIn([ 'image', 'url' ])}?width=264&height=264)` }} styleName='product-image'/>
        <Link styleName='product-brand' to={`/${currentLocale}/topic/BRAND%7C${item.getIn([ 'brand', 'uuid' ])}`}>
          {item.getIn([ 'brand', 'name' ])}
        </Link>
        <div styleName='product-title'>
          {item.get('shortName')}
        </div>
        <div styleName='product-price'>
          {formatPrice(item.get('price'))}
        </div>
      </div>
    );
  }
}

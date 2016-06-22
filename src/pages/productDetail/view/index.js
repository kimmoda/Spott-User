import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from '../../_common/buildingBlocks';
import FacebookShareData from '../../_common/facebookShareData';
import { loadProduct } from '../actions';
import { productSelector } from '../selector';

@connect(productSelector)
export default class ProductDetail extends Component {

  static styles = {

  }

  static needs (props, store) {
    // (Re)fetch the product.
    return store.dispatch(loadProduct(props.params.productId));
  }

  render () {
    const { params: { productId }, product } = this.props;
    return (
      <Container>
        <div>
          <p>productId: {productId}</p>
          <p>shortName: {product.get('shortName')}</p>
          <p>longName: {product.get('longName')}</p>
          <p>description: {product.get('description')}</p>
          {product.get('images') && product.get('images').map((image) => <img key={image.get('uuid')} src={image.get('url')} />)}
        </div>
        <div>
          Sub Images
        </div>
        {/* TODO: Didier will provide title, description and maybe images for sharing */}
        <FacebookShareData description={product.get('description')} imageUrls={product.get('images') && product.get('images').map((image) => image.get('url')).toJS()} title={product.get('shortName')} />
      </Container>
    );
  }
}

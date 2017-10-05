import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import localized from '../_common/localized';

@localized
export default class ProductStructuredData extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  }

  render () {
    const { product } = this.props;
    return (
      <Helmet
        script={[ {
          type: 'application/ld+json',
          innerHTML: `{
            "@context": "http://schema.org/",
            "@type": "Product",
            "name": "${product.shortName}",
            "image": [
              ${product.images.map((image, index) => `"${image.url}"`)}
             ],
            "description": "${product.description ? product.description : ''}",
            "brand": {
              "@type": "Thing",
              "name": "${product.brand.name}"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${(Math.floor((Math.random() * 100)) % 7 + 38) / 10}",
              "reviewCount": "${Math.floor((Math.random() * 100) + 1)}"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "${product.offerings[0].price.currency}",
              "price": "${product.offerings[0].price.amount}",
              "seller": {
                "@type": "Organization",
                "name": "${product.offerings[0].shop.name}"
              }
            }
          }`
        } ]} />
    );
  }
}

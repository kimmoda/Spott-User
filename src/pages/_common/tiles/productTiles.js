import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { colors, fontWeights, makeTextStyle, Money } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../localized';
import { slugify } from '../../../utils';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';

const RadiumLink = Radium(Link);

const currencies = {
  EUR: '€',
  USD: '$'
};

function formatPrice (price) {
  if (price) {
    // Try to use symbol.
    const currency = currencies[price.get('currency')];
    if (currency) {
      return `${currency} ${price.get('amount')}`;
    }
    return `${price.get('amount')} ${price.get('currency')}`;
  }
  return '';
}

function formatTitle (name, price) {
  const priceText = formatPrice(price);
  if (priceText) {
    return `${name} - ${priceText}`;
  }
  return name;
}

@localized
@Radium
export class ProductTile extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    item: ImmutablePropTypes.mapContains({
      id: PropTypes.string.isRequired,
      image: ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }),
      price: ImmutablePropTypes.mapContains({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }),
      shortName: PropTypes.string.isRequired
    }).isRequired,
    style: PropTypes.object
  };

  static styles = {
    container: {
      display: 'block',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'none'
      },
      ':active': {
        textDecoration: 'none'
      },
      ':visited': {
        textDecoration: 'none'
      }
    },
    detailsContainer: {
      padding: '0.8em 0.9em'
    },
    shortName: {
      ...makeTextStyle(fontWeights.regular, '0.875em'),
      color: colors.slateGray,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    price: {
      ...makeTextStyle(fontWeights.bold, '0.875em'),
      color: colors.dark
    },
    image: {
      bottom: 0,
      height: 'auto',
      left: 0,
      margin: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: 'auto'
    },
    imageContainer: {
      height: 0,
      paddingTop: '100%',
      position: 'relative',
      width: '100%'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { currentLocale, item, style } = this.props;
    const title = formatTitle(item.get('shortName'), item.get('price'));

    return (
      <BaseTile style={style}>
        <RadiumLink style={styles.container} title={title} to={item.get('shareUrl')}>
          <div style={styles.imageContainer}>
            {item.get('image') && <img alt={item.get('shortName')} src={`${item.getIn([ 'image', 'url' ])}?height=375&width=375`} style={styles.image} />}
          </div>
          <div style={styles.detailsContainer}>
            <div style={styles.shortName}>{item.get('shortName')}</div>
            <div style={styles.price}><Money amount={item.getIn([ 'price', 'amount' ])} currency={item.getIn([ 'price', 'currency' ])}/></div>
          </div>
        </RadiumLink>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.938,
  { extraSmall: 2, small: 3, medium: 3, large: 4, extraLarge: 5 },
  (instanceProps) => <ProductTile {...instanceProps} />
);

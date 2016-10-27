import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { colors, formatPrice, fontWeights, makeTextStyle, RadiumLink } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';
import { equals } from '../../../utils';

function formatTitle (name, price) {
  const priceText = formatPrice(price);
  if (priceText) {
    return `${name} - ${priceText}`;
  }
  return name;
}

@Radium
export class ProductTile extends Component {

  static propTypes = {
    // Not required! Initially we create a product without an item,
    // then we clone it with an item (see VerticalTiles).
    item: ImmutablePropTypes.mapContains({
      id: PropTypes.string,
      image: ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }),
      price: ImmutablePropTypes.mapContains({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }),
      shortName: PropTypes.string
    }),
    style: PropTypes.object
  };

  // We suppose the data won't change often, so if the status and id is the same,
  // we don't trigger a rerender.
  shouldComponentUpdate (nextProps) {
    const item = this.props.item;
    return item.get('_status') !== nextProps.item.get('_status') ||
      item.get('id') !== nextProps.item.get('id') ||
      !equals(this.props.style, nextProps.style);
  }

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
    const { item, style } = this.props;

    // Initially we create a product without an item, then we clone it with an item (see VerticalTiles).
    if (!item) {
      return <div />;
    }

    console.warn('product', item.toJS());

    const title = formatTitle(item.get('shortName'), item.get('price'));

    return (
      <BaseTile style={style}>
        <RadiumLink style={styles.container} title={title} to={item.get('shareUrl')}>
          <div style={styles.imageContainer}>
            {item.get('image') && <img alt={item.get('shortName')} src={`${item.getIn([ 'image', 'url' ])}?height=375&width=375`} style={styles.image} />}
          </div>
          <div style={styles.detailsContainer}>
            <div style={styles.shortName}>{item.get('shortName')}</div>
            <div style={styles.price}>{formatPrice(item.get('price'))}</div>
          </div>
        </RadiumLink>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.938,
  { extraSmall: 2, small: 3, medium: 3, large: 4, extraLarge: 5, extraExtraLarge: 6 },
  (instanceProps) => <ProductTile {...instanceProps} />
);

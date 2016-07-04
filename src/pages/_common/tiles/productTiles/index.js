import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import { colors, fontWeights, makeTextStyle, Tiles } from '../../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from '../_baseTile';

const dummySeries = fromJS([ {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses - Ray Ban Sunglasses - Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/chair.jpg'),
  name: 'Chair'
}, {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/mnm.png'),
  name: 'M&M\'s'
} ]);

@Radium
export class ProductTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequired
    }).isRequired,
    style: PropTypes.object
  };

  static styles = {
    container: {
    },
    detailsContainer: {
      padding: '0.8em 0.9em'
    },
    name: {
      ...makeTextStyle(fontWeights.regular, '0.875em'),
      color: colors.slateGray,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    price: {
      ...makeTextStyle(fontWeights.regular, '0.875em')
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
    const title = `${item.get('name')} - € 120`;
    return (
      <BaseTile style={style}>
        <div style={styles.container} title={title}>
          <div style={[ styles.imageContainer ]}>
            <img alt={item.get('name')} src={item.get('image')} style={styles.image} />
          </div>
          <div style={styles.detailsContainer}>
            <div style={styles.name}>{item.get('name')}</div>
            <div style={styles.price}>€ 120</div>
          </div>
        </div>
      </BaseTile>
    );
  }
}

export default class ProductTiles extends Component {
  static propTypes = {
    items: ImmutablePropTypes.list,
    style: PropTypes.object
  };

  render () {
    const { items, style } = this.props;

    return (
      <Tiles
        horizontalSpacing={0.938}
        items={items || dummySeries}
        numColumns={{ small: 3, medium: 4, large: 5, extraLarge: 6 }}
        style={style}
        tileRenderer={(instanceProps) => <ProductTile {...instanceProps} />}
        verticalSpacing={0} />
    );
  }
}

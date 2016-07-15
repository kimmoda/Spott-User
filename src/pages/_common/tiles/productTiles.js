import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { colors, fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';

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

export default makeTiles(
  0.938,
  { extraSmall: 2, small: 3, medium: 4, large: 5, extraLarge: 6 },
  (instanceProps) => <ProductTile {...instanceProps} />
);

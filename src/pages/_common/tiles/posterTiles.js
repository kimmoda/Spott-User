import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { colors, fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';

@Radium
export class PosterTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequired
    }).isRequired,
    style: PropTypes.object
  };

  // We suppose the data won't change often, so if the status and id is the same,
  // we don't trigger a rerender.
  shouldComponentUpdate (nextProps) {
    const item = this.props.item;
    return item.get('_status') !== nextProps.item.get('_status') ||
      item.get('id') !== nextProps.item.get('id');
  }

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
      paddingTop: '147%',
      position: 'relative',
      width: '100%'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { item, style } = this.props;

    return (
      <BaseTile style={style}>
        <div style={styles.container} title={item.get('name')}>
          <div style={[ styles.imageContainer ]}>
            <img alt={item.get('name')} src={item.get('image')} style={styles.image} />
          </div>
        </div>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.938,
  { small: 4, medium: 5, large: 6, extraLarge: 7 },
  (instanceProps) => <PosterTile {...instanceProps} />
);

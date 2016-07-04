import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import { fontWeights, makeTextStyle, Tiles } from '../../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from '../_baseTile';

const dummySeries = fromJS([ {
  image: require('./images/modern-family.jpg'),
  name: 'Modern family'
}, {
  image: require('./images/new-girl.jpg'),
  name: 'New girl'
}, {
  image: require('./images/orange-is-the-new-black.jpg'),
  name: 'Orange is the new black'
}, {
  image: require('./images/kardashians.jpg'),
  name: 'Kardasians'
} ]);

@Radium
export class SeriesTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequired
    }).isRequired,
    style: PropTypes.object
  };

  static styles = {
    container: {
      position: 'relative',
      paddingTop: '56%',
      height: 0
    },
    layer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
      pointerEvents: 'none' // Don't capture pointer events. "Click through..."
    },
    title: {
      ...makeTextStyle(fontWeights.bold, '0.688em', '0.219em'),
      color: 'white',
      textTransform: 'uppercase',
      position: 'absolute',
      bottom: '1em',
      left: '1.25em',
      right: '1.25em'
    },
    image: {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '0.25em',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { item, style } = this.props;
    return (
      <BaseTile style={style}>
        <div style={styles.container}>
          <div
            style={[ styles.image, { backgroundImage: `url("${item.get('image')}")` } ]}
            title={item.get('name')} />
          <div style={styles.layer}></div>
          <span style={styles.title}>{item.get('name')}</span>
        </div>
      </BaseTile>
    );
  }
}

@Radium
export default class SeriesTiles extends Component {

  static propTypes = {
    items: ImmutablePropTypes.list,
    style: PropTypes.object
  };

  static styles = {
    tiles: {
    }
  }
  render () {
    const { styles } = this.constructor;
    const { items, style } = this.props;

    return (
      <Tiles
        horizontalSpacing={0.938}
        items={items || dummySeries}
        numColumns={{ small: 1, medium: 2, large: 3, extraLarge: 4 }}
        style={[ styles.tiles, style ]}
        tileRenderer={(instanceProps) => <SeriesTile {...instanceProps} />}
        verticalSpacing={0} />
    );
  }
}

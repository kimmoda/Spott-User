import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import { fontWeights, makeTextStyle, Tiles } from '../../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from '../_baseTile';

const characters = fromJS([ {
  image: require('./images/mattMurdock.jpg'),
  name: 'Matt Murdock Matt Murdock'
}, {
  image: require('./images/karenPage.jpg'),
  name: 'Karen Page'
}, {
  image: require('./images/foggy.jpg'),
  name: 'Foggy'
}, {
  image: require('./images/frankCastle.jpg'),
  name: 'Frank Castle'
}, {
  image: require('./images/elektra.jpg'),
  name: 'Elektra'
}, {
  image: require('./images/claireTemple.jpg'),
  name: 'Claire Temple'
}, {
  image: require('./images/mattMurdock.jpg'),
  name: 'Matt Murdock'
}, {
  image: require('./images/karenPage.jpg'),
  name: 'Karen Page'
}, {
  image: require('./images/foggy.jpg'),
  name: 'Foggy'
} ]);

@Radium
export class CharacterTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequired
    }).isRequired,
    style: PropTypes.object
  };

  static styles = {
    container: {
      position: 'relative',
      paddingTop: '100%',
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
      ...makeTextStyle(fontWeights.bold, '0.54em', '0.219em'),
      color: 'white',
      textTransform: 'uppercase',
      position: 'absolute',
      bottom: '1.24em',
      left: '1.25em',
      right: '1.25em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
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

export default class CharacterTiles extends Component {

  static styles = {
    tiles: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em',
      marginBottom: '1.7em'
    }
  }
  render () {
    const { styles } = this.constructor;
    return (
      <Tiles
        horizontalSpacing='0.938em'
        items={characters}
        numColumns={{ small: 2, medium: 4, large: 5, extraLarge: 7 }}
        style={styles.tiles}
        tileRenderer={(instanceProps) => <CharacterTile {...instanceProps} />}
        verticalSpacing={0} />
    );
  }
}

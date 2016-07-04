import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import { colors, fontWeights, makeTextStyle, Tiles } from '../../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from '../_baseTile';

const dummyPosters = fromJS([ {
  image: require('./images/criminalMinds.jpg'),
  name: 'Criminal Minds'
}, {
  image: require('./images/ghostInTheShell.jpg'),
  name: 'Ghost In The Shell'
}, {
  image: require('./images/modernFamily.jpg'),
  name: 'Modern Family'
}, {
  image: require('./images/batman.jpg'),
  name: 'Batman'
}, {
  image: require('./images/batman.jpg'),
  name: 'Batman'
}, {
  image: require('./images/ghostInTheShell.jpg'),
  name: 'Ghost In The Shell'
}, {
  image: require('./images/modernFamily.jpg'),
  name: 'Modern Family'
} ]);

@Radium
export class PosterTile extends Component {

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
      width: 'auto',
      zoom: 8
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

export default class PosterTiles extends Component {

  static propTypes = {
    items: ImmutablePropTypes.list,
    style: PropTypes.object
  };

  render () {
    const { items, style } = this.props;

    return (
      <Tiles
        horizontalSpacing={0.938}
        items={items || dummyPosters}
        numColumns={{ small: 4, medium: 5, large: 6, extraLarge: 7 }}
        style={style}
        tileRenderer={(instanceProps) => <PosterTile {...instanceProps} />}
        verticalSpacing={0} />
    );
  }
}

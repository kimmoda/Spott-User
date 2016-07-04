import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import { Tiles } from '../../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SmallEpisodeTile from './smallEpisodeTile';

const episodes = fromJS([ {
  image: require('./images/1.png'),
  name: 'Episode 1'
}, {
  image: require('./images/2.png'),
  name: 'Episode 2'
}, {
  image: require('./images/3.png'),
  name: 'Episode 3'
}, {
  image: require('./images/4.png'),
  name: 'Episode 4'
}, {
  image: require('./images/5.png'),
  name: 'Episode 5'
}, {
  image: require('./images/6.png'),
  name: 'Episode 6'
}, {
  image: require('./images/7.png'),
  name: 'Episode 7'
} ]);

@Radium
export default class SmallEpisodeTiles extends Component {

  static propTypes = {
    items: ImmutablePropTypes.list,
    seriesId: PropTypes.string.isRequired,
    style: PropTypes.object
  };

  static styles = {
    tiles: {
      overflow: 'visible',
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
      marginTop: 0
    }
  }
  render () {
    const { styles } = this.constructor;
    const { items, seriesId, style } = this.props;

    return (
      <Tiles
        horizontalSpacing={0.833}
        items={items || episodes}
        numColumns={{ extraSmall: 2, small: 3, medium: 4, large: 5, extraLarge: 7 }}
        style={[ styles.tiles, style ]}
        tileRenderer={({ item, key, style: tileStyle }) => (
          <SmallEpisodeTile item={item} key={key} linkTo={`/series/${seriesId}/season/3/episode/${key}/scenes`} style={tileStyle} />
        )}
        verticalSpacing={0} />
    );
  }
}

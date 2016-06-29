import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { colors, ScalableContainer, SectionTitle, Tiles } from '../../../_common/buildingBlocks';
import EpisodeTile from '../../../_common/tiles/episodeTile';

const dummyEpisodes = fromJS([ {
  id: '0',
  image: require('./images/daredevilEpisode.png'),
  seriesLogo: require('./images/daredevilLogo.png'),
  season: 3,
  episode: 5,
  episodeTitle: 'Rabbit in a Snowstorm',
  products: [
    { id: 'p1', name: 'product 1', image: require('./images/product1.png') },
    { id: 'p2', name: 'product 2', image: require('./images/product2.png') },
    { id: 'p3', name: 'product 3', image: require('./images/product3.png') },
    { id: 'p4', name: 'product 4', image: require('./images/product4.png') },
    { id: 'p5', name: 'product 5', image: require('./images/product1.png') },
    { id: 'p6', name: 'product 6', image: require('./images/product2.png') },
    { id: 'p7', name: 'product 7', image: require('./images/product3.png') }
  ]
}, {
  id: '1',
  image: require('./images/deKeukenVanSofieEpisode.jpg'),
  seriesLogo: require('./images/deKeukenVanSofieLogo.png'),
  season: 8,
  episode: 22,
  episodeTitle: 'Lasagna Bolognese',
  products: [
  ]
}, {
  id: '2',
  image: require('./images/gameOfThronesEpisode.jpg'),
  seriesLogo: require('./images/gameOfThronesLogo.png'),
  season: 3,
  episode: 5,
  episodeTitle: 'The Red Wedding',
  products: []
} ]);

@Radium
export default class NewEpisodes extends Component {

  static styles = {
    container: {
      backgroundColor: colors.white,
      paddingTop: '6.25em'
    },
    tiles: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em',
      paddingTop: '1.875em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.sectionTitle}>New Episodes</SectionTitle>
        <Tiles
          horizontalSpacing={0.938}
          items={dummyEpisodes}
          numColumns={{ small: 1, medium: 3, large: 3, extraLarge: 3 }}
          style={styles.tiles}
          tileRenderer={(instanceProps) => <EpisodeTile {...instanceProps} />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }

}

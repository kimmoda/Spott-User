import React, { Component } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { colors, fontWeights, makeTextStyle, SectionTitle, ScalableContainer, Tiles } from '../../../_common/buildingBlocks';
import ProductsFromMediumTile from '../_tiles/productsFromMediumTile';

const dummyScenes = fromJS([ {
  image: require('./images/daredevil.jpg'),
  logo: require('./images/daredevilLogo.png'),
  products: [
    require('./images/backpack.png'),
    require('./images/eames.png'),
    require('./images/lasagna.png'),
    require('./images/tabasco.png')
  ]
}, {
  image: require('./images/gameOfThrones.jpg'),
  logo: require('./images/gameOfThronesLogo.png'),
  products: [
    require('./images/backpack.png'),
    require('./images/eames.png'),
    require('./images/lasagna.png'),
    require('./images/tabasco.png')
  ]
}, {
  image: require('./images/warcraft.jpg'),
  logo: require('./images/warcraftLogo.png'),
  products: [
    require('./images/backpack.png'),
    require('./images/eames.png'),
    require('./images/lasagna.png'),
    require('./images/tabasco.png')
  ]
}, {
  image: require('./images/daredevil.jpg'),
  logo: require('./images/daredevilLogo.png'),
  products: [
    require('./images/backpack.png'),
    require('./images/eames.png'),
    require('./images/lasagna.png'),
    require('./images/tabasco.png')
  ]
} ]);

@Radium
export default class TopSellingProducts extends Component {

  static styles = {
    container: {
      backgroundColor: 'white',
      paddingTop: '6.25em',
      marginBottom: '3.125em' // Compensate for tiles' transform
    },
    tiles: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em',
      transform: 'translateY(1.875em)'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.sectionTitle}>New Scenes for You</SectionTitle>
        <Tiles
          horizontalSpacing='0.938em'
          items={dummyScenes}
          numColumns={{ small: 1, medium: 2, large: 3, extraLarge: 4 }}
          style={styles.tiles}
          tile={<ProductsFromMediumTile />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }
}

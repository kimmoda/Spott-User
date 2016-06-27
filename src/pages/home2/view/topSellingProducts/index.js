import React, { Component } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { SectionTitle, ScalableContainer, Tiles } from '../../../_common/buildingBlocks';
import ProductsFromMediumTile from '../_tiles/productsFromMediumTile';

const dummyScenes = fromJS([ {
  image: require('./images/daredevil.jpg'),
  logo: require('./images/daredevilLogo.png'),
  products: [ {
    id: 'XYZ1',
    image: require('./images/backpack.png')
  }, {
    id: 'XYZ2',
    image: require('./images/eames.png')

  }, {
    id: 'XYZ3',
    image: require('./images/lasagna.png')

  }, {
    id: 'XYZ4',
    image: require('./images/tabasco.png')
  } ]
}, {
  image: require('./images/gameOfThrones.jpg'),
  logo: require('./images/gameOfThronesLogo.png'),
  products: [ {
    id: 'XYZ5',
    image: require('./images/backpack.png')
  }, {
    id: 'XYZ6',
    image: require('./images/eames.png')

  }, {
    id: 'XYZ7',
    image: require('./images/lasagna.png')

  }, {
    id: 'XYZ8',
    image: require('./images/tabasco.png')
  } ]
}, {
  image: require('./images/warcraft.jpg'),
  logo: require('./images/warcraftLogo.png'),
  products: [ {
    id: 'XYZ9',
    image: require('./images/backpack.png')
  }, {
    id: 'XYZ10',
    image: require('./images/eames.png')

  }, {
    id: 'XYZ11',
    image: require('./images/lasagna.png')
  }, {
    id: 'XYZ12',
    image: require('./images/tabasco.png')
  } ]
}, {
  image: require('./images/daredevil.jpg'),
  logo: require('./images/daredevilLogo.png'),
  products: [ {
    id: 'XYZ13',
    image: require('./images/backpack.png')
  }, {
    id: 'XYZ14',
    image: require('./images/eames.png')
  }, {
    id: 'XYZ15',
    image: require('./images/lasagna.png')
  }, {
    id: 'XYZ16',
    image: require('./images/tabasco.png')
  } ]
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
          tileRenderer={(instanceProps) => <ProductsFromMediumTile {...instanceProps} />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }
}

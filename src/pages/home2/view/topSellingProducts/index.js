import React, { Component } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { colors, SectionTitle, ScalableContainer, Tiles } from '../../../_common/buildingBlocks';
import ProductsFromMediumTile from '../../../_common/tiles/productsFromMediumTile';

const dummyScenes = fromJS([ {
  image: require('./images/daredevil.jpg'),
  logo: require('./images/daredevilLogo.png'),
  name: 'Daredevil',
  products: [ {
    name: 'Backpack',
    id: 'XYZ1',
    image: require('./images/backpack.png')
  }, {
    name: 'Eames',
    id: 'XYZ2',
    image: require('./images/eames.png')

  }, {
    name: 'Lasagna',
    id: 'XYZ3',
    image: require('./images/lasagna.png')

  }, {
    name: 'Tabasco',
    id: 'XYZ4',
    image: require('./images/tabasco.png')
  } ]
}, {
  image: require('./images/gameOfThrones.jpg'),
  logo: require('./images/gameOfThronesLogo.png'),
  name: 'Game of Thrones',
  products: [ {
    name: 'Backpack',
    id: 'XYZ5',
    image: require('./images/backpack.png')
  }, {
    name: 'Eames',
    id: 'XYZ6',
    image: require('./images/eames.png')

  }, {
    name: 'Lasagna',
    id: 'XYZ7',
    image: require('./images/lasagna.png')

  }, {
    name: 'Tabasco',
    id: 'XYZ8',
    image: require('./images/tabasco.png')
  } ]
}, {
  image: require('./images/warcraft.jpg'),
  logo: require('./images/warcraftLogo.png'),
  name: 'Warcraft',
  products: [ {
    name: 'Backpack',
    id: 'XYZ9',
    image: require('./images/backpack.png')
  }, {
    name: 'Eames',
    id: 'XYZ10',
    image: require('./images/eames.png')

  }, {
    name: 'Lasagna',
    id: 'XYZ11',
    image: require('./images/lasagna.png')
  }, {
    name: 'Tabasco',
    id: 'XYZ12',
    image: require('./images/tabasco.png')
  } ]
}, {
  image: require('./images/daredevil.jpg'),
  logo: require('./images/daredevilLogo.png'),
  name: 'Daredevil',
  products: [ {
    name: 'Backpack',
    id: 'XYZ13',
    image: require('./images/backpack.png')
  }, {
    name: 'Eames',
    id: 'XYZ14',
    image: require('./images/eames.png')
  }, {
    name: 'Lasagna',
    id: 'XYZ15',
    image: require('./images/lasagna.png')
  }, {
    name: 'Tabasco',
    id: 'XYZ16',
    image: require('./images/tabasco.png')
  } ]
} ]);

@Radium
export default class TopSellingProducts extends Component {

  static styles = {
    container: {
      backgroundColor: colors.white,
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

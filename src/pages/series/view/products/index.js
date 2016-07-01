import React, { Component } from 'react';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import VerticalTiles from '../../../_common/verticalTiles';
import { ProductTile } from '../../../_common/tiles/productTiles';
import { ScalableContainer } from '../../../_common/buildingBlocks';

const products = fromJS([ {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses - Ray Ban Sunglasses - Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/chair.jpg'),
  name: 'Chair'
}, {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/mnm.png'),
  name: 'M&M\'s'
}, {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses - Ray Ban Sunglasses - Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/chair.jpg'),
  name: 'Chair'
}, {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/mnm.png'),
  name: 'M&M\'s'
}, {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses - Ray Ban Sunglasses - Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/chair.jpg'),
  name: 'Chair'
}, {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/mnm.png'),
  name: 'M&M\'s'
}, {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses - Ray Ban Sunglasses - Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/chair.jpg'),
  name: 'Chair'
}, {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/mnm.png'),
  name: 'M&M\'s'
} ]);

export default class Series extends Component {
  render () {
    const styles = {
      backgroundColor: 'white',
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    };

    return (
      <ScalableContainer style={styles}>
        <VerticalTiles
          horizontalSpacing={30}
          items={products}
          numColumns={{ 0: 2, 480: 3, 768: 4, 992: 5 }}
          tile={<ProductTile />}
          verticalSpacing={100} />
      </ScalableContainer>
    );
  }
}

import React, { Component } from 'react';
import { List } from 'immutable'; // TODO: remove after API is implemented
import VerticalTiles from '../../_common/verticalTiles';
import { ProductTile } from '../../_common/tiles/productTiles';
import { ScalableContainer } from '../../_common/buildingBlocks';

export default class Products extends Component {
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
          items={List()}
          numColumns={{ 0: 2, 480: 3, 768: 4, 992: 5 }}
          tile={<ProductTile />}
          verticalSpacing={100} />
      </ScalableContainer>
    );
  }
}

import React, { Component } from 'react';
import Radium from 'radium';
import { colors, SectionTitle, ScalableContainer } from '../../../_common/buildingBlocks';
import ProductsFromMediumTiles from '../../../_common/tiles/productsFromMediumTiles';

@Radium
export default class TopSellingProducts extends Component {

  static styles = {
    container: {
      backgroundColor: colors.white,
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle>Top Selling Products</SectionTitle>
        <ProductsFromMediumTiles />
      </ScalableContainer>
    );
  }
}

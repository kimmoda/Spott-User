import React, { Component } from 'react';
import Radium from 'radium';
import { colors, SectionTitle, ScalableContainer } from '../../../_common/buildingBlocks';
import ProductsFromMediumTiles from '../../../_common/tiles/productsFromMediumTiles';

@Radium
export default class TopSellingProducts extends Component {

  static styles = {
    container: {
      backgroundColor: colors.white,
      paddingTop: '6.25em',
      marginBottom: '3.125em' // Compensate for tiles' transform
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.sectionTitle}>Top Selling Products</SectionTitle>
        <ProductsFromMediumTiles />
      </ScalableContainer>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, SectionTitle, ScalableContainer } from '../../../_common/buildingBlocks';
import ProductsFromMediumTiles from '../../../_common/tiles/productsFromMediumTiles';
import localized from '../../../_common/localized';

@localized
@Radium
export default class TopSellingProducts extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  static styles = {
    container: {
      backgroundColor: colors.white,
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle>{t('home.topSellingProducts.title')}</SectionTitle>
        <ProductsFromMediumTiles />
      </ScalableContainer>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, SectionTitle, Container } from '../../../_common/buildingBlocks';
import ProductsFromMediumTiles from '../../../_common/tiles/productsFromMediumTiles';
import localized from '../../../_common/localized';
import dummyTopSellingProducts from '../../../../api/mock/topSellingProducts';
import { fromJS } from 'immutable';

@localized
@Radium
export default class TopSellingProducts extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  static styles = {
    wrapper: {
      backgroundColor: colors.white,
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    return (
      <div style={styles.wrapper}>
        <Container>
          <ProductsFromMediumTiles items={fromJS(dummyTopSellingProducts)} title={t('home.topSellingProducts.title')} />
        </Container>
      </div>
    );
  }
}

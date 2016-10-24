import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Message } from '../../../_common/buildingBlocks';
import { topSellingProductsSelector } from '../../selectors';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ProductsFromMediumTiles from '../../../_common/tiles/productsFromMediumTiles';
import localized from '../../../_common/localized';
import * as actions from '../../../../data/actions';

@localized
@connect(topSellingProductsSelector, (dispatch) => ({
  fetchMediumTopProducts: bindActionCreators(actions.fetchMediumTopProducts, dispatch)
}))
@Radium
export default class TopSellingProducts extends Component {

  static propTypes = {
    fetchMediumTopProducts: PropTypes.func.isRequired,
    // Which medium (like an series) has which top products? mediumId: [ productIds ]
    mediumHasTopProducts: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    // Hash of products, productId: productEntity
    products: ImmutablePropTypes.map.isRequired,
    series: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  static styles = {
    wrapper: {
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { fetchMediumTopProducts, mediumHasTopProducts, products, series, style, t } = this.props;

    return (
      <div style={[ styles.wrapper, style ]}>
        <Container>
          <ProductsFromMediumTiles
            items={series}
            renderEmptyComponent={() => <Message>{t('home.popularProducts.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notExist')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            tileProps={{ fetchMediumTopProducts, mediumHasTopProducts, products }}
            title={t('home.topSellingProducts.title')} />
        </Container>
      </div>
    );
  }

}

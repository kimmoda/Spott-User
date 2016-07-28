import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors, Container } from '../../../../_common/buildingBlocks';
import Spinner from '../../../../_common/spinner';
import { FETCHING, LAZY, LOADED, UPDATING } from '../../../../../data/statusTypes';
import localized from '../../../../_common/localized';
import ProductTiles from '../../../../_common/tiles/productTiles';
import { topProductsSelector } from '../../../selector';
import { loadTopProducts } from '../../../actions';

@localized
@connect(topProductsSelector, (dispatch) => ({
  loadTopProducts: bindActionCreators(loadTopProducts, dispatch)
}))
@Radium
export default class TopProducts extends Component {

  static propTypes = {
    loadTopProducts: PropTypes.func.isRequired,
    products: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    }),
    series: ImmutablePropTypes.mapContains({
      _error: PropTypes.object,
      _status: PropTypes.string,
      title: PropTypes.string
    }),
    seriesId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadTopProducts(this.props.seriesId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.seriesId !== nextProps.seriesId) {
      this.props.loadTopProducts(nextProps.seriesId);
    }
  }

  static styles = {
    subtitle: {
      marginBottom: '1.304em'
    },
    wrapper: {
      backgroundColor: colors.white,
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { products, series, t } = this.props;

    return (
      <div style={styles.wrapper}>
        <Container>
          {(series.get('_status') === FETCHING || series.get('_status') === LAZY ||
            products.get('_status') === FETCHING || products.get('_status') === LAZY) &&
            <Spinner />}
          {(series.get('_status') === LOADED || series.get('_status') === UPDATING) &&
            (products.get('_status') === LOADED || products.get('_status') === UPDATING) &&
            <ProductTiles items={products.get('data')} title={t('medium.topProducts', { title: series.get('title') })} />}
        </Container>
      </div>
    );
  }

}

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { colors, Container } from '../../../_common/buildingBlocks';
import { popularProductsSelector } from '../../selectors';
import { loadPopularProducts } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ProductTiles from '../../../_common/tiles/productTiles';
import localized from '../../../_common/localized';

@localized
@connect(popularProductsSelector, (dispatch) => ({
  loadPopularProducts: bindActionCreators(loadPopularProducts, dispatch)
}))
@Radium
export default class RecentlyAddedToWishlist extends Component {

  static propTypes = {
    loadPopularProducts: PropTypes.func.isRequired,
    popularProducts: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    t: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadPopularProducts();
  }

  static styles = {
    wrapper: {
      backgroundColor: colors.white,
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { popularProducts, t } = this.props;

    return (
      <div style={styles.wrapper}>
        <Container>
          <ProductTiles items={popularProducts} title={t('home.popularProducts.title')} />
        </Container>
      </div>
    );
  }

}

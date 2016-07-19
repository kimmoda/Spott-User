import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { colors, Container } from '../../../_common/buildingBlocks';
import { recentlyAddedToWishlistSelector } from '../../selectors';
import { loadRecentlyAddedToWishlist } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ProductTiles from '../../../_common/tiles/productTiles';
import localized from '../../../_common/localized';
import { fromJS } from 'immutable';
import dummyProducts from '../../../../api/mock/products';

@localized
@connect(recentlyAddedToWishlistSelector, (dispatch) => ({
  loadRecentlyAddedToWishlist: bindActionCreators(loadRecentlyAddedToWishlist, dispatch)
}))
@Radium
export default class RecentlyAddedToWishlist extends Component {

  static propTypes = {
    loadRecentlyAddedToWishlist: PropTypes.func.isRequired,
    recentlyAddedToWishlistProducts: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    t: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadRecentlyAddedToWishlist();
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
    const { recentlyAddedToWishlistProducts, t } = this.props;
    if (recentlyAddedToWishlistProducts.get('data').size > 0) {
      return (
        <div style={styles.wrapper}>
          <Container>
            <ProductTiles items={recentlyAddedToWishlistProducts.get('data')} title={t('home.recentlyAddedToWishlist.title')} />
          </Container>
        </div>
      );
    }
    return <div></div>;
  }

}

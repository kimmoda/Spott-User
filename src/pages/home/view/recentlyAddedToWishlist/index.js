import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { colors, Container, Message } from '../../../_common/buildingBlocks';
import { recentlyAddedToWishlistSelector } from '../../selectors';
import { loadRecentlyAddedToWishlist } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ProductTiles from '../../../_common/tiles/productTiles';
import localized from '../../../_common/localized';

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
    setTimeout(() => this.props.loadRecentlyAddedToWishlist(), 2000);
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

    return (
      <div style={styles.wrapper}>
        <Container>
          <ProductTiles items={recentlyAddedToWishlistProducts}
            renderEmptyComponent={() => <Message>{t('home.recentlyAddedToWishlist.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notExist')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            title={t('home.recentlyAddedToWishlist.title')} />
        </Container>
      </div>
    );
  }

}

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Container, Message } from '../../../_common/buildingBlocks';
import { popularProductsSelector } from '../../selectors';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ProductTiles from '../../../_common/tiles/productTiles';
import localized from '../../../_common/localized';

@localized
@connect(popularProductsSelector)
@Radium
export default class RecentlyAddedToWishlist extends Component {

  static propTypes = {
    popularProducts: ImmutablePropTypes.mapContains({
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
    const { popularProducts, style, t } = this.props;

    return (
      <div style={[ styles.wrapper, style ]}>
        <Container>
          <ProductTiles
            items={popularProducts}
            renderEmptyComponent={() => <Message>{t('home.popularProducts.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notExist')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            title={t('home.popularProducts.title')} />
        </Container>
      </div>
    );
  }

}

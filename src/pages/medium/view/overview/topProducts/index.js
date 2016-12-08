import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors, Container, Message } from '../../../../_common/buildingBlocks';
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
    medium: ImmutablePropTypes.mapContains({
      _error: PropTypes.object,
      _status: PropTypes.string,
      title: PropTypes.string
    }),
    mediumId: PropTypes.string.isRequired,
    products: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    }),
    t: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadTopProducts(this.props.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.mediumId !== nextProps.mediumId) {
      this.props.loadTopProducts(nextProps.mediumId);
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
    const { medium, products, t } = this.props;

    return (
      <div style={styles.wrapper}>
        <Container>
          <ProductTiles
            items={products}
            renderEmptyComponent={() => <Message>{t('medium.topProducts.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notExist')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            title={t('medium.topProducts.title', { title: medium.get('title') || '' })} />
        </Container>
      </div>
    );
  }

}

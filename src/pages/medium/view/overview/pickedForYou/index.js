import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors, Container, Message } from '../../../../_common/buildingBlocks';
import localized from '../../../../_common/localized';
import ProductTiles from '../../../../_common/tiles/productTiles';
import { pickedForYouSelector } from '../../../selector';
import { loadTopUserProducts } from '../../../actions';

@localized
@connect(pickedForYouSelector, (dispatch) => ({
  loadTopUserProducts: bindActionCreators(loadTopUserProducts, dispatch)
}))
@Radium
export default class PickedForYou extends Component {

  static propTypes = {
    loadTopUserProducts: PropTypes.func.isRequired,
    mediumId: PropTypes.string.isRequired,
    products: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    }),
    t: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadTopUserProducts(this.props.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.mediumId !== nextProps.mediumId) {
      this.props.loadTopUserProducts(nextProps.mediumId);
    }
  }

  static styles = {
    subtitle: {
      marginBottom: '1.304em'
    },
    wrapper: {
      backgroundColor: colors.whiteGray,
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { products, t } = this.props;

    return (
      <div style={styles.wrapper}>
        <Container>
          <ProductTiles
            items={products}
            renderEmptyComponent= {() => <Message>{t('medium.topUserProducts.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notFound')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            title={t('medium.topUserProducts.title')} />
        </Container>
      </div>
    );
  }

}

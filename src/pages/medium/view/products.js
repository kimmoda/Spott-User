import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import VerticalTiles from '../../_common/verticalTiles';
import { ProductTile } from '../../_common/tiles/productTiles';
import { LoadComponent, ScalableContainer } from '../../_common/buildingBlocks';
import { mediumProductsSelector } from '../selector';
import * as actions from '../actions';

@localized
@connect(mediumProductsSelector, (dispatch) => ({
  loadMediumProducts: bindActionCreators(actions.loadMediumProducts, dispatch)
}))
export default class Products extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadMediumProducts: PropTypes.func.isRequired,
    params: PropTypes.shape({
      mediumId: PropTypes.string.isRequired
    }).isRequired,
    products: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list.isRequired
    }),
    t: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadMediumProducts(this.props.params.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.mediumId !== nextProps.params.mediumId) {
      this.props.loadMediumProducts(nextProps.params.mediumId);
    }
  }

  static styles = {
    container: {
      backgroundColor: 'white',
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    },
    messageContainer: {
      paddingTop: '3.75em',
      paddingBottom: '3.75em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { products, t } = this.props;

    return (
      <LoadComponent
        item={products}
        renderEmpty={() => t('medium.products.empty')}
        renderInContainer={(children) => <ScalableContainer style={styles.messageContainer}>{children}</ScalableContainer>}
        renderItem={() => (
          <ScalableContainer style={styles.container}>
            <VerticalTiles
              aspectRatio={1.309677}
              horizontalSpacing={30}
              items={products.get('data')}
              numColumns={{ 0: 2, 480: 3, 768: 4, 992: 5 }}
              tile={<ProductTile />}
              verticalSpacing={30} />
          </ScalableContainer>
        )} />
    );
  }

}

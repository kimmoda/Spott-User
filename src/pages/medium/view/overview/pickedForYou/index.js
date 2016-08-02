import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors, Container } from '../../../../_common/buildingBlocks';
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

    // TODO: quick fix by vid for empty lists
    if (products.get('data').size === 0) {
      return (<div></div>);
    }

    return (
      <div style={styles.wrapper}>
        <Container>
          <ProductTiles items={products} title={t('medium.topUserProducts')} />
        </Container>
      </div>
    );
  }

}

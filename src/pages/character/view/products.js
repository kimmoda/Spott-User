import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import VerticalTiles from '../../_common/verticalTiles';
import { ProductTile } from '../../_common/tiles/productTiles';
import { load, Message, ScalableContainer } from '../../_common/buildingBlocks';
import { characterProductsSelector } from '../selector';
import * as actions from '../actions';

@localized
@connect(characterProductsSelector, (dispatch) => ({
  loadCharacterProducts: bindActionCreators(actions.loadCharacterProducts, dispatch)
}))
export default class Products extends Component {

  static propTypes = {
    loadCharacterProducts: PropTypes.func.isRequired,
    params: PropTypes.shape({
      characterId: PropTypes.string.isRequired
    }).isRequired,
    products: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list.isRequired
    }),
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.renderProducts = ::this.renderProducts;
    this.renderEmpty = ::this.renderEmpty;
  }

  componentWillMount () {
    this.props.loadCharacterProducts(this.props.params.characterId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.characterId !== nextProps.params.characterId) {
      this.props.loadCharacterProducts(nextProps.params.characterId);
    }
  }

  static styles = {
    container: {
      backgroundColor: 'white',
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    }
  };

  renderProducts () {
    const styles = this.constructor.styles;
    const { products } = this.props;

    return (
      <ScalableContainer style={styles.container}>
        <VerticalTiles
          aspectRatio={1.309677}
          horizontalSpacing={30}
          items={products.get('data')}
          numColumns={{ 0: 2, 480: 3, 768: 4, 992: 5 }}
          tile={<ProductTile />}
          verticalSpacing={30} />
      </ScalableContainer>
    );
  }

  renderEmpty () {
    const { t } = this.props;
    return (<ScalableContainer><Message>{t('character.products.empty')}</Message></ScalableContainer>);
  }

  render () {
    return load(this.props.products, this.renderProducts, null, null, null, this.renderEmpty);
  }

}

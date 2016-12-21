import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import VerticalTiles from '../../_common/verticalTiles';
import { ProductTile } from '../../_common/tiles/productTiles';
import { LoadComponent, Container } from '../../_common/buildingBlocks';
import { characterProductsSelector } from '../selector';
import * as actions from '../actions';

@localized
@connect(characterProductsSelector, (dispatch) => ({
  loadCharacterProducts: bindActionCreators(actions.loadCharacterProducts, dispatch)
}))
export default class Products extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadCharacterProducts: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      characterId: PropTypes.string.isRequired
    }).isRequired,
    products: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list.isRequired
    }),
    t: PropTypes.func.isRequired
  };

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
    },
    messageContainer: {
      paddingTop: '3.75em',
      paddingBottom: '3.75em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { products, t, location } = this.props;

    return (
      <LoadComponent
        item={products}
        renderEmpty={() => t('character.products.empty')}
        renderInContainer={(children) => <div style={styles.container}><Container style={styles.messageContainer}>{children}</Container></div>}
        renderItem={() => (
          <div style={styles.container}>
            <Container>
              <VerticalTiles
                aspectRatio={1.309677}
                horizontalSpacing={30}
                items={products.get('data')}
                numColumns={{ extraSmall: 2, small: 3, medium: 4, large: 5, extraLarge: 6, extraExtraLarge: 7 }}
                tile={<ProductTile location={location} />}
                verticalSpacing={30} />
            </Container>
          </div>
        )} />
    );
  }

}

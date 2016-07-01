import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { colors, SectionTitle, ScalableContainer } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import ProductTiles from '../../../_common/tiles/productTiles';

@Radium
export default class RecentlyAddedToWishlist extends Component {

  static styles = {
    container: {
      backgroundColor: colors.white,
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    },
    subtitle: {
      marginBottom: '1.304em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.subtitle}>Recently added to wishlist</SectionTitle>
        <ProductTiles />
      </ScalableContainer>
    );
  }

}

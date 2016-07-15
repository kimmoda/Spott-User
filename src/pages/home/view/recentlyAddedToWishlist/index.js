import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, SectionTitle, Container } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import ProductTiles from '../../../_common/tiles/productTiles';
import localized from '../../../_common/localized';
import { fromJS } from 'immutable';
import dummyProducts from '../../../../api/mock/products';

@localized
@Radium
export default class RecentlyAddedToWishlist extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  static styles = {
    wrapper: {
      backgroundColor: colors.white,
      paddingTop: '2.5em',
      paddingBottom: '3.25em'
    }
  };

  render () {
    const { t } = this.props;
    const { styles } = this.constructor;
    return (
      <div style={styles.wrapper}>
        <Container>
          <ProductTiles items={fromJS(dummyProducts)} title={t('home.recentlyAddedToWishlist.title')} />
        </Container>
      </div>
    );
  }

}

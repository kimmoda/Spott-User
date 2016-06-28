import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { colors, SectionTitle, ScalableContainer, Tiles } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import ProductTile from '../../../_common/tiles/productTile';

const dummySeries = fromJS([ {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses - Ray Ban Sunglasses - Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/chair.jpg'),
  name: 'Chair'
}, {
  image: require('./images/glasses.jpg'),
  name: 'Ray Ban Sunglasses'
}, {
  image: require('./images/car.jpg'),
  name: 'What a super car'
}, {
  image: require('./images/mnm.png'),
  name: 'M&M\'s'
} ]);

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
    },
    tiles: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.subtitle}>Recently added to wishlist</SectionTitle>
        <Tiles
          horizontalSpacing='0.938em'
          items={dummySeries}
          numColumns={{ small: 3, medium: 4, large: 5, extraLarge: 6 }}
          style={styles.tiles}
          tileRenderer={(instanceProps) => <ProductTile {...instanceProps} />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }

}

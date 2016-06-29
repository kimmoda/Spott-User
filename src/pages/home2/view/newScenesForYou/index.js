import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { colors, ScalableContainer, SectionTitle, Tiles } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import SceneTile from '../../../_common/tiles/sceneTile';

const dummyScenes = fromJS([ {
  id: '0',
  image: require('./images/suits.png'),
  seasonName: 'Season 1',
  episodeName: 'Episode 1',
  markers: [ { relativeLeft: 20, relativeTop: 40 } ],
  faces: [],
  products: []
}, {
  id: '1',
  image: require('./images/daredevil.png'),
  seriesLogo: require('./images/daredevilLogo.png'),
  seasonName: 'Season 3',
  episodeName: 'Episode 5',
  markers: [
    { id: 'm1', relativeLeft: 40, relativeTop: 38 },
    { id: 'm2', relativeLeft: 53, relativeTop: 47 },
    { id: 'm3', relativeLeft: 65, relativeTop: 33 },
    { id: 'm4', relativeLeft: 90, relativeTop: 60 }
  ],
  faces: [
    { id: 'f1', name: 'Murdock', image: require('./images/murdock.png') },
    { id: 'f2', name: 'Page', image: require('./images/page.png') }
  ],
  products: [
    { id: 'p1', name: 'product 1', image: require('./images/product1.png') },
    { id: 'p2', name: 'product 2', image: require('./images/product2.png') },
    { id: 'p3', name: 'product 3', image: require('./images/product3.png') },
    { id: 'p4', name: 'product 4', image: require('./images/product4.png') }
  ]
} ]);

@Radium
export default class NewScenesForYou extends Component {

  static styles = {
    container: {
      backgroundColor: colors.white,
      paddingTop: '6.25em'
    },
    tiles: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em',
      paddingTop: '1.875em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.sectionTitle}>New Scenes for You</SectionTitle>
        <Tiles
          horizontalSpacing={0.938}
          items={dummyScenes}
          numColumns={{ small: 1, medium: 2, large: 2, extraLarge: 2 }}
          style={styles.tiles}
          tileRenderer={(instanceProps) => <SceneTile {...instanceProps} />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }

}

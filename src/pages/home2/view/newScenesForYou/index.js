import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { ScalableContainer, SectionTitle, Tiles } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import SceneTile from '../_tiles/sceneTile';

const dummyScenes = fromJS([ {
  image: require('./images/suits.png'),
  seasonName: 'Season 1',
  episodeName: 'Episode 1',
  markers: [ { relativeLeft: 20, relativeTop: 40 } ]
}, {
  image: require('./images/daredevil.png'),
  seriesLogo: require('./images/daredevilLogo.png'),
  seasonName: 'Season 3',
  episodeName: 'Episode 5',
  markers: [
    { relativeLeft: 40, relativeTop: 38 },
    { relativeLeft: 53, relativeTop: 47 },
    { relativeLeft: 65, relativeTop: 33 },
    { relativeLeft: 90, relativeTop: 60 }
  ]
} ]);

@Radium
export default class NewScenesForYou extends Component {

  static styles = {
    container: {
      backgroundColor: 'white',
      paddingTop: '6.25em',
      marginBottom: '1.875em' // Compensate for tiles' transform
    },
    tiles: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em',
      transform: 'translateY(1.875em)'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.sectionTitle}>New Scenes for You</SectionTitle>
        <Tiles
          horizontalSpacing='0.938em'
          items={dummyScenes}
          numColumns={{ small: 1, medium: 2, large: 2, extraLarge: 2 }}
          style={styles.tiles}
          tileRenderer={(instanceProps) => <SceneTile {...instanceProps} />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }

}

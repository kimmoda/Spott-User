import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { Button, colors, Container, Page, fontWeights, makeTextStyle, SectionTitle, ScalableContainer, Tiles } from '../../../_common/buildingBlocks';
import { dummySelector } from '../../selectors';
import { dummy } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SceneTile from '../_tiles/sceneTile';

const dummyScenes = fromJS([ {
  image: require('./images/daredevil.png'),
  seriesLogo: require('./images/daredevilLogo.png')
}, {
  image: require('./images/suits.png')
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
      <ScalableContainer style={[ styles.container ]}>
        <SectionTitle style={styles.sectionTitle}>New Scenes for You</SectionTitle>
        <Tiles
          horizontalSpacing='0.938em'
          items={dummyScenes}
          numColumns={{ small: 1, medium: 2, large: 2, extraLarge: 2 }}
          style={styles.tiles}
          tile={<SceneTile />}
          verticalSpacing={0} />
      </ScalableContainer>
    );
  }

}

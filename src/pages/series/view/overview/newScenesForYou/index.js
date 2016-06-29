import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { colors, ScalableContainer, SectionTitle } from '../../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import SceneTiles from '../../../../_common/tiles/sceneTiles';

@Radium
export default class NewScenesForYou extends Component {

  static styles = {
    container: {
      backgroundColor: colors.white,
      paddingTop: '6.25em',
      marginBottom: '1.875em' // Compensate for tiles' transform
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.sectionTitle}>New Scenes For You</SectionTitle>
        <SceneTiles />
      </ScalableContainer>
    );
  }

}

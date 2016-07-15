import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { colors, ScalableContainer, SectionTitle } from '../../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import SceneTiles from '../../../../_common/tiles/sceneTiles';
import { fromJS } from 'immutable';
import scenes from '../../../../api/mock/scenes';

@Radium
export default class NewScenesForYou extends Component {

  static styles = {
    container: {
      backgroundColor: colors.whiteGray,
      paddingTop: '6.25em',
      marginBottom: '1.875em' // Compensate for tiles' transform
    },
    list: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SceneTiles items={scenes} listStyle={styles.list} title='New Scenes For You'/>
      </ScalableContainer>
    );
  }

}

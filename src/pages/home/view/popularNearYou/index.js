import React, { Component } from 'react';
import Radium from 'radium';
import { colors, SectionTitle, ScalableContainer } from '../../../_common/buildingBlocks';
import PosterTiles from '../../../_common/tiles/posterTiles';

@Radium
export default class PopularNearYou extends Component {

  static styles = {
    container: {
      backgroundColor: colors.whiteGray,
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle>Popular near you</SectionTitle>
        <PosterTiles />
      </ScalableContainer>
    );
  }

}

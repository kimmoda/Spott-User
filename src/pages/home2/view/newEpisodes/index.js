import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { colors, ScalableContainer, SectionTitle } from '../../../_common/buildingBlocks';
import EpisodeTiles from '../../../_common/tiles/episodeTiles';

@Radium
export default class NewEpisodes extends Component {

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
        <SectionTitle style={styles.sectionTitle}>New Episodes</SectionTitle>
        <EpisodeTiles />
      </ScalableContainer>
    );
  }

}

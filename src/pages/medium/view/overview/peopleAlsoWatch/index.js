import React, { Component } from 'react';
import Radium from 'radium';
import { colors, SectionTitle, ScalableContainer } from '../../../../_common/buildingBlocks';
import PosterTiles from '../../../../_common/tiles/posterTiles';
import posters from '../../../../../api/mock/posters';
import { fromJS } from 'immutable';

@Radium
export default class PeopleAlsoWatch extends Component {

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
        <SectionTitle style={styles.subtitle}>People Also Watch</SectionTitle>
        <PosterTiles items={fromJS(posters)} />
      </ScalableContainer>
    );
  }

}

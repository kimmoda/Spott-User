import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, ScalableContainer, SectionTitle } from '../../../_common/buildingBlocks';
import EpisodeTiles from '../../../_common/tiles/episodeTiles';
import localized from '../../../_common/localized';

@localized
@Radium
export default class NewEpisodes extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  static styles = {
    container: {
      backgroundColor: colors.whiteGray,
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    return (
      <ScalableContainer style={styles.container}>
        <SectionTitle style={styles.sectionTitle}>{t('home.newEpisodes.title')}</SectionTitle>
        <EpisodeTiles />
      </ScalableContainer>
    );
  }

}

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, Container, SectionTitle } from '../../../_common/buildingBlocks';
import EpisodeTiles from '../../../_common/tiles/episodeTiles';
import localized from '../../../_common/localized';

@localized
@Radium
export default class NewEpisodes extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  static styles = {
    wrapper: {
      backgroundColor: colors.whiteGray,
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    return (
      <div style={styles.wrapper}>
        <Container>
          <SectionTitle style={styles.sectionTitle}>{t('home.newEpisodes.title')}</SectionTitle>
          <EpisodeTiles />
        </Container>
      </div>
    );
  }

}

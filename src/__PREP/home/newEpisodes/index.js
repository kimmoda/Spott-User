import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { colors, Container, SectionTitle } from '../../../_common/buildingBlocks';
import EpisodeTiles from '../../../_common/tiles/episodeTiles';
import localized from '../../../_common/localized';
import dummyEpisodes from '../../../../api/mock/episodes';
import { fromJS } from 'immutable';

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
    },
    list: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em',
      paddingTop: '1.875em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    return (
      <div style={styles.wrapper}>
        <Container>
          <EpisodeTiles items={fromJS(dummyEpisodes)} listStyle={styles.list} title={t('home.newEpisodes.title')}/>
        </Container>
      </div>
    );
  }

}

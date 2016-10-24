import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { colors, Container, Message } from '../../../_common/buildingBlocks';
import { tvGuideEntriesSelector } from '../../selectors';
import localized from '../../../_common/localized';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TvGuideTiles from '../../../_common/tiles/tvGuideTiles';

@localized
@connect(tvGuideEntriesSelector, (dispatch) => ({

}))
@Radium
export default class NewEpisodes extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired,
    tvGuideEntries: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired
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
    const { tvGuideEntries, t } = this.props;
    return (
      <div style={styles.wrapper}>
        <Container>
          <TvGuideTiles
            items={tvGuideEntries}
            renderEmptyComponent={() => <Message>{t('home.tvGuide.empty')}</Message>}
            renderNotFoundComponent={() => <Message>{t('common.notFound')}</Message>}
            renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
            title={t('home.tvGuide.title')} />
        </Container>
      </div>
    );
  }

}

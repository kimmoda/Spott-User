import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Container, Message, colors } from '../../../_common/buildingBlocks';
import { tvGuideEntriesSelector } from '../../selectors';
import localized from '../../../_common/localized';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TvGuideTiles from '../../../_common/tiles/tvGuideTiles';
import { LOADED, UPDATING } from '../../../../data/statusTypes';

@localized
@connect(tvGuideEntriesSelector, (dispatch) => ({

}))
@Radium
export default class NewEpisodes extends Component {

  static propTypes = {
    style: PropTypes.object,
    t: PropTypes.func.isRequired,
    tvGuideEntries: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired
  }

  static styles = {
    wrapper: {
      paddingTop: '2.5em',
      paddingBottom: '3.125em'
    },
    empty: {
      backgroundColor: colors.white,
      height: '4.5em',
      marginTop: '-5.5em'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { style, tvGuideEntries, t } = this.props;

    if ((tvGuideEntries.get('_status') === LOADED || tvGuideEntries.get('_status') === UPDATING) && (tvGuideEntries.get('data') && tvGuideEntries.get('data').size === 0)) {
      return (<div style={styles.empty} />);
    }

    return (
      <div style={[ styles.wrapper, style ]}>
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

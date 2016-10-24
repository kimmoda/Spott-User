import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Container, Message } from '../../../_common/buildingBlocks';
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
    }
  };

  render () {
    const { styles } = this.constructor;
    const { style, tvGuideEntries, t } = this.props;
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

import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { replace as replaceRoute } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import SmallEpisodeTiles from '../../_common/tiles/smallEpisodeTiles';
import { colors, Container } from '../../_common/buildingBlocks';
import localized from '../../_common/localized';
import { episodesSelector } from '../selector';
import { loadEpisodes } from '../actions';
import { LOADED, UPDATING } from '../../../data/statusTypes';

const styles = {
  content: {
    color: colors.white,
    paddingTop: '1.75em',
    paddingBottom: '1.75em',
    position: 'relative'
  },
  smallEpisodes: {
    paddingBottom: '1.7em'
  },
  smallEpisodeList: {
    overflow: 'visible',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 0
  }
};

@localized
@connect(episodesSelector, (dispatch) => ({
  loadEpisodes: bindActionCreators(loadEpisodes, dispatch),
  replaceRoute: bindActionCreators(replaceRoute, dispatch)
}))
export default class SeasonsTabs extends Component {

  static propTypes = {
    children: PropTypes.node,
    episodes: ImmutablePropTypes.map,
    loadEpisodes: PropTypes.func,
    params: PropTypes.shape({
      episodeId: PropTypes.string,
      seasonId: PropTypes.string.isRequired
    }).isRequired,
    replaceRoute: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.loadEpisodes(this.props.params.seasonId);
  }

  componentWillReceiveProps (nextProps) {
    const { params: { episodeId, seasonId }, episodes } = nextProps;

    // Load episodes of the new seasons if necessary.
    if (this.props.params.seasonId !== seasonId) {
      this.props.loadEpisodes(seasonId);
    }

    // Select first episode if necessary
    if (!episodeId && episodes.get('data').size > 0) {
      this.props.replaceRoute(episodes.getIn([ 'data', 0, 'shareUrl' ]));
    }
  }

  render () {
    const { children, episodes, t } = this.props;

    if ((episodes.get('_status') === LOADED || episodes.get('_status') === UPDATING) && episodes.get('data').size === 0) {
      return <Container style={styles.content}>{t('medium.episodes.empty')}</Container>;
    }

    return (
      <Container>
        <div style={styles.smallEpisodes}>
          <Container>
            <SmallEpisodeTiles arrowsType='inline' items={episodes} listStyle={styles.smallEpisodeList} />
          </Container>
        </div>
        {children}
      </Container>
    );
  }

}
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SmallEpisodeTiles from '../../../_common/tiles/smallEpisodeTiles';
import { Container } from '../../../_common/buildingBlocks';
import { episodesSelector } from '../../selector';
import { loadEpisodes } from '../../actions';

const styles = {
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

@connect(episodesSelector, (dispatch) => ({
  loadEpisodes: bindActionCreators(loadEpisodes, dispatch)
}))
export default class SeasonsTabs extends Component {

  static propTypes = {
    children: PropTypes.node,
    episodes: ImmutablePropTypes.map,
    loadEpisodes: PropTypes.func,
    params: PropTypes.shape({
      seasonId: PropTypes.string.isRequired
    }).isRequired
  }

  componentWillMount () {
    this.props.loadEpisodes(this.props.params.seasonId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.seasonId !== nextProps.params.seasonId) {
      this.props.loadEpisodes(nextProps.params.seasonId);
    }
  }

  render () {
    const { children, episodes } = this.props;
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

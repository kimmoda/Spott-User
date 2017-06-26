/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../_common/localized';
import Cards from '../cards';
import * as actions from '../../actions';
import { topicDetailsSelector } from '../../selectors';

const styles = require('./index.scss');

@localized
@connect(topicDetailsSelector, (dispatch) => ({
  loadTopicSeasonEpisodeSpotts: bindActionCreators(actions.loadTopicSeasonEpisodeSpotts, dispatch),
  loadTopicSpottsMore: bindActionCreators(actions.loadTopicSpottsMore, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class EpisodeSpotts extends Component {
  static propTypes = {
    loadTopicSeasonEpisodeSpotts: PropTypes.func.isRequired,
    loadTopicSpottsMore: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      episodeId: PropTypes.string.isRequired,
      episodeSlug: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired,
    topicSeasonEpisodeSpotts: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.loadMore = ::this.loadMore;
  }

  componentDidMount () {
    this.props.loadTopicSeasonEpisodeSpotts({ uuid: this.props.params.episodeId, page: 0 });
  }

  componentWillReceiveProps (nextProps) {
    const { episodeId } = this.props.params;
    const { episodeId: nextEpisodeId } = nextProps.params;
    if (episodeId !== nextEpisodeId) {
      this.props.loadTopicSeasonEpisodeSpotts({ uuid: nextEpisodeId, page: 0 });
    }
  }

  loadMore (page) {
    this.props.loadTopicSpottsMore({ uuid: this.props.params.episodeId, page });
  }

  render () {
    const { topicSeasonEpisodeSpotts, params } = this.props;
    return (
      <div styleName='cards'>
        <Cards
          loadMore={this.loadMore}
          location={location}
          params={params}
          spotts={topicSeasonEpisodeSpotts}/>
      </div>
    );
  }
}

/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../_common/localized';
import Cards from '../cards';
import * as actions from '../actions';
import { topicDetailsSelector } from '../selectors';

const styles = require('./index.scss');

@localized
@connect(topicDetailsSelector, (dispatch) => ({
  loadTopicSeasonSpotts: bindActionCreators(actions.loadTopicSeasonSpotts, dispatch),
  loadTopicSeasonSpottsMore: bindActionCreators(actions.loadTopicSeasonSpottsMore, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class SeasonSpotts extends Component {
  static propTypes = {
    loadTopicSeasonSpotts: PropTypes.func.isRequired,
    loadTopicSeasonSpottsMore: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      seasonId: PropTypes.string.isRequired,
      seasonSlug: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired,
    topicSeasonSpotts: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.loadMore = ::this.loadMore;
  }

  componentDidMount () {
    this.props.loadTopicSeasonSpotts({ uuid: this.props.params.seasonId, page: 0 });
  }

  componentWillReceiveProps (nextProps) {
    const { seasonId } = this.props.params;
    const { seasonId: nextSeasonId } = nextProps.params;
    if (seasonId !== nextSeasonId) {
      this.props.loadTopicSeasonSpotts({ uuid: nextSeasonId, page: 0 });
    }
  }

  loadMore (page) {
    this.props.loadTopicSeasonSpottsMore({ uuid: this.props.params.seasonId, page });
  }

  render () {
    const { topicSeasonSpotts, params } = this.props;
    return (
      <div styleName='cards'>
        <Cards
          loadMore={this.loadMore}
          location={location}
          params={params}
          spotts={topicSeasonSpotts}/>
      </div>
    );
  }
}

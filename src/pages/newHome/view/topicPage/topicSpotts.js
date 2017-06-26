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
  loadTopicSpotts: bindActionCreators(actions.loadTopicSpotts, dispatch),
  loadTopicSpottsMore: bindActionCreators(actions.loadTopicSpottsMore, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class TopicSpotts extends Component {
  static propTypes = {
    loadTopicSpotts: PropTypes.func.isRequired,
    loadTopicSpottsMore: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      topicTitle: PropTypes.string.isRequired,
      topicId: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired,
    topicSpotts: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.loadMore = ::this.loadMore;
  }

  componentDidMount () {
    const { loadTopicSpotts, params } = this.props;
    loadTopicSpotts({ uuid: params.topicId, page: 0 });
  }

  componentWillReceiveProps (nextProps) {
    const dc = nextProps.location.state && nextProps.location.state.dc || '';
    const { topicId } = this.props.params;
    const { topicId: nextTopicId } = nextProps.params;
    if (topicId !== nextTopicId) {
      this.props.loadTopicSpotts({ uuid: nextTopicId, page: 0, dc });
    }
  }

  loadMore (page) {
    this.props.loadTopicSpottsMore({ uuid: this.props.params.topicId, page });
  }

  render () {
    const { topicSpotts, params } = this.props;
    return (
      <div styleName='cards'>
        <Cards
          loadMore={this.loadMore}
          location={location}
          params={params}
          spotts={topicSpotts}/>
      </div>
    );
  }
}

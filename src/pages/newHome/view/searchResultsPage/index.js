/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../_common/localized';
import Topics from '../topics';
import Cards from '../cards';
import * as actions from '../../actions';
import { topicDetailsSelector } from '../../selectors';

const styles = require('./index.scss');

@localized
@connect(topicDetailsSelector, (dispatch) => ({
  loadTopicDetails: bindActionCreators(actions.loadTopicDetails, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class SearchResults extends Component {
  static propTypes = {
    loadTopicDetails: PropTypes.func.isRequired,
    params: PropTypes.shape({
      searchString: PropTypes.string.isRequired
    }),
    topic: PropTypes.any.isRequired,
    topicRelated: PropTypes.any.isRequired,
    topicSpotts: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    // this.props.loadTopicDetails({ uuid: this.props.params.searchString });
  }

  render () {
    const { topicRelated, topicSpotts } = this.props;

    return (
      <section styleName='wrapper'>
        <div styleName='topics'>
          <div styleName='topics-content'>
            <div styleName='topics-title'>Related Topics</div>
            <Topics items={topicRelated} />
          </div>
        </div>
        <div styleName='cards'>
          <Cards items={topicSpotts}/>
        </div>
      </section>
    );
  }
}

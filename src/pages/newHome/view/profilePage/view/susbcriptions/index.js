/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { topicDetailsSelector } from '../../../../selectors';

const styles = require('./index.scss');

@localized
@connect(topicDetailsSelector, (dispatch) => ({
  loadTopicDetails: bindActionCreators(actions.loadTopicDetails, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserSubscriptions extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div styleName='subscriptions'>
        <h2 styleName='title'>Manage Subscriptions</h2>
        <div styleName='topics-list'>
          {new Array(10).fill(1).map((item, index) =>
            <div key={`user_subs_${index}`} styleName='topic'>
              <div styleName='topic-image'/>
              <div styleName='topic-dscr'>
                <div styleName='topic-title'>Topic</div>
                <div styleName='topic-type'>Type</div>
              </div>
              <button styleName='topic-btn'>Subscribed</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

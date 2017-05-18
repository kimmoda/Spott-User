/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { userSettingsDetailsSelector } from '../../../../selectors';
import { IconCheck } from '../../../icons';

const styles = require('./index.scss');

@localized
@connect(userSettingsDetailsSelector, (dispatch) => ({
  loadUserSubscriptions: bindActionCreators(actions.loadUserSubscriptions, dispatch),
  removeTopicSubscriber: bindActionCreators(actions.removeTopicSubscriber, dispatch),
  setTopicSubscriber: bindActionCreators(actions.setTopicSubscriber, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserSubscriptions extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadUserSubscriptions: PropTypes.func.isRequired,
    removeTopicSubscriber: PropTypes.func.isRequired,
    setTopicSubscriber: PropTypes.func.isRequired,
    subscriptions: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired,
    userId: PropTypes.string
  };

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    if (this.props.userId) {
      this.props.loadUserSubscriptions({ uuid: this.props.userId });
    }
  }

  async onSubscribeClick (topicId) {
    await this.props.removeTopicSubscriber({ uuid: topicId });
    this.props.loadUserSubscriptions({ uuid: this.props.userId });
  }

  render () {
    const { currentLocale, subscriptions } = this.props;

    return (
      <div styleName='subscriptions'>
        <h2 styleName='title'>Manage Subscriptions</h2>
        <div styleName='topics-list'>
          { subscriptions.get('data') && subscriptions.get('data').map((item, index) =>
            <div key={`user_subs_${index}`} styleName='topic'>
              <Link
                style={{ backgroundImage: `url('${item.getIn([ 'profileImage', 'url' ])}?width=68&height=38')` }}
                styleName='topic-image'
                to={`/${currentLocale}/topic/${item.get('text').replace(/ +/g, '-').replace(/\.+/g, '-').replace(/%+/g, '')}/${item.get('uuid')}`}/>
              <div styleName='topic-dscr'>
                <Link
                  styleName='topic-title'
                  to={`/${currentLocale}/topic/${item.get('text').replace(/ +/g, '-').replace(/\.+/g, '-').replace(/%+/g, '')}/${item.get('uuid')}`}>
                  {item.get('text')}
                </Link>
                <div styleName='topic-type'>{item.get('sourceType')}</div>
              </div>
              <button styleName='topic-btn' onClick={this.onSubscribeClick.bind(this, item.get('uuid'))}><span>Subscribed</span><i><IconCheck /></i></button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

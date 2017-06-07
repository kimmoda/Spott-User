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
import { slugify, getDetailsDcFromLinks } from '../../../../../../utils';

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
    const { currentLocale, subscriptions, t } = this.props;

    return (
      <div styleName='subscriptions'>
        <h2 styleName='title'>{t('userSettings.manageSubscriptions')}</h2>
        <div styleName='topics-list'>
          {subscriptions.get('data') && subscriptions.get('data').map((item, index) =>
            <div key={`user_subs_${index}`} styleName='topic'>
              <Link
                style={{ backgroundImage: `url('${item.getIn([ 'profileImage', 'url' ])}?width=68&height=38')` }}
                styleName='topic-image'
                to={{
                  pathname: `/${currentLocale}/topic/${slugify(item.get('text', ''))}/${item.get('uuid')}`,
                  state: { dc: getDetailsDcFromLinks(item.get('links').toJS()) }
                }}/>
              <div styleName='topic-dscr'>
                <Link
                  styleName='topic-title'
                  to={{
                    pathname: `/${currentLocale}/topic/${slugify(item.get('text', ''))}/${item.get('uuid')}`,
                    state: { dc: getDetailsDcFromLinks(item.get('links').toJS()) }
                  }}>
                  {item.get('text')}
                </Link>
                <div styleName='topic-type'>{item.get('sourceType')}</div>
              </div>
              <button styleName='topic-btn' onClick={this.onSubscribeClick.bind(this, item.get('uuid'))}>
                <span>{t('common.subscribed')}</span>
                <i><IconCheck/></i>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

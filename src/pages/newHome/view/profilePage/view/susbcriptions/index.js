/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import localized from '../../../../../_common/localized';
import * as actions from '../../../../actions';
import { userProfileDetailsSelector } from '../../../../selectors';

const styles = require('./index.scss');

@localized
@connect(userProfileDetailsSelector, (dispatch) => ({
  loadUserSubscriptions: bindActionCreators(actions.loadUserSubscriptions, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserSubscriptions extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadUserSubscriptions: PropTypes.func.isRequired,
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

  onSubscribedClick (topicId) {
    this.props.loadUserSubscriptions({ uuid: this.props.userId });
  }

  render () {
    const { currentLocale, subscriptions } = this.props;
    const brandSubscriptions = subscriptions.getIn([ 'brandSubscriptions', 'data' ]);
    const actorSubscriptions = subscriptions.getIn([ 'actorSubscriptions', 'data' ]);
    const characterSubscriptions = subscriptions.getIn([ 'characterSubscriptions', 'data' ]);
    const mediumSubscriptions = subscriptions.getIn([ 'mediumSubscriptions', 'data' ]);

    return (
      <div styleName='subscriptions'>
        <h2 styleName='title'>Manage Subscriptions</h2>
        <div styleName='topics-list'>
          {brandSubscriptions && brandSubscriptions.map((item, index) =>
            <div key={`user_brand_subs_${index}`} styleName='topic'>
              <Link
                style={{ backgroundImage: `url('${item.getIn([ 'logo', 'url' ])}?width=68&height=38')` }}
                styleName='topic-image'
                to={`/${currentLocale}/new/topic/${item.get('uuid')}`}/>
              <div styleName='topic-dscr'>
                <Link
                  styleName='topic-title'
                  to={`/${currentLocale}/new/topic/${item.get('uuid')}`}>
                  {item.get('name')}
                </Link>
                <div styleName='topic-type'>Brand</div>
              </div>
              <button styleName='topic-btn' onClick={this.onSubscribedClick.bind(this, item.get('uuid'))}>Subscribed</button>
            </div>
          )}
          {actorSubscriptions && actorSubscriptions.map((item, index) =>
            <div key={`user_actor_subs_${index}`} styleName='topic'>
              <Link
                style={{ backgroundImage: `url('${item.getIn([ 'logo', 'url' ])}?width=68&height=38')` }}
                styleName='topic-image'
                to={`/${currentLocale}/new/topic/${item.get('uuid')}`}/>
              <div styleName='topic-dscr'>
                <Link
                  styleName='topic-title'
                  to={`/${currentLocale}/new/topic/${item.get('uuid')}`}>
                  {item.get('name')}
                </Link>
                <div styleName='topic-type'>Actor</div>
              </div>
              <button styleName='topic-btn' onClick={this.onSubscribedClick.bind(this, item.get('uuid'))}>Subscribed</button>
            </div>
          )}
          {characterSubscriptions && characterSubscriptions.map((item, index) =>
            <div key={`user_character_subs_${index}`} styleName='topic'>
              <Link
                style={{ backgroundImage: `url('${item.getIn([ 'logo', 'url' ])}?width=68&height=38')` }}
                styleName='topic-image'
                to={`/${currentLocale}/new/topic/${item.get('uuid')}`}/>
              <div styleName='topic-dscr'>
                <Link
                  styleName='topic-title'
                  to={`/${currentLocale}/new/topic/${item.get('uuid')}`}>
                  {item.get('name')}
                </Link>
                <div styleName='topic-type'>Character</div>
              </div>
              <button styleName='topic-btn' onClick={this.onSubscribedClick.bind(this, item.get('uuid'))}>Subscribed</button>
            </div>
          )}
          {mediumSubscriptions && mediumSubscriptions.map((item, index) =>
            <div key={`user_medium_subs_${index}`} styleName='topic'>
              <Link
                style={{ backgroundImage: `url('${item.getIn([ 'profileImage', 'url' ])}?width=68&height=38')` }}
                styleName='topic-image'
                to={`/${currentLocale}/new/topic/${item.get('uuid')}`}/>
              <div styleName='topic-dscr'>
                <Link
                  styleName='topic-title'
                  to={`/${currentLocale}/new/topic/${item.get('uuid')}`}>
                  {item.get('title')}
                </Link>
                <div styleName='topic-type'>Medium</div>
              </div>
              <button styleName='topic-btn' onClick={this.onSubscribedClick.bind(this, item.get('uuid'))}>Subscribed</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

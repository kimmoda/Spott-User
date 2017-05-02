/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import DropdownMenu from '../../dropdownMenu';
import localized from '../../../../_common/localized';
import { IconForward } from '../../icons';
import * as actions from '../../../actions';
import { userProfileDetailsSelector } from '../../../selectors';

const styles = require('./index.scss');
const { cssHeaderHeight } = require('../../vars.scss');
const dummyAvatar = require('./dummyAvatar.svg');

@localized
@connect(userProfileDetailsSelector, (dispatch) => ({
  loadUserProfile: bindActionCreators(actions.loadUserProfile, dispatch),
  removeTopicSubscriber: bindActionCreators(actions.removeTopicSubscriber, dispatch),
  setTopicSubscriber: bindActionCreators(actions.setTopicSubscriber, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserProfile extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired
    }),
    removeTopicSubscriber: PropTypes.func.isRequired,
    setTopicSubscriber: PropTypes.func.isRequired,
    userProfile: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.handleScroll = ::this.handleScroll;
    this.state = {
      isScrolledToInfo: false
    };
    this.headerHeight = parseInt(cssHeaderHeight, 10);
    this.infoContainerHeight = null;
    this.isScrolledToInfo = false;
  }

  componentDidMount () {
    this.infoContainerHeight = this.infoContainer.clientHeight;
    window.addEventListener('scroll', this.handleScroll);
    this.props.loadUserProfile({ uuid: this.props.params.userId });
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    this.setState({
      isScrolledToInfo: this.infoContainer.offsetTop <= window.scrollY + this.headerHeight + 30
    });
  }

  onSubscribeClick (topicId, subscribed) {
    if (subscribed) {
      this.props.removeTopicSubscriber({ uuid: topicId });
    } else {
      this.props.setTopicSubscriber({ uuid: topicId });
    }
  }

  render () {
    const { children, currentLocale, userProfile } = this.props;
    const { userId } = this.props.params;
    const { isScrolledToInfo } = this.state;

    return (
      <section styleName='wrapper'>
        {userProfile.getIn([ 'profile', 'profile', 'picture', 'url' ]) && <div style={{ backgroundImage: `url('${userProfile.getIn([ 'profile', 'profile', 'picture', 'url' ])}?width=1200')` }} styleName='poster'/>}
        <div ref={(ref) => { this.infoContainer = ref; }} style={{ height: this.infoContainerHeight }} styleName='info-wrapper'>
          <div className={isScrolledToInfo && styles['info-sticky']} styleName='info'>
            <div styleName='info-content'>
              <div styleName='info-left'>
                <div
                  style={{ backgroundImage: `url('${userProfile.getIn([ 'profile', 'profile', 'avatar', 'url' ]) || dummyAvatar}?width=48&height=48')` }}
                  styleName='info-image'/>
                <div styleName='info-header'>
                  <h2 styleName='info-name'>
                    {userProfile.getIn([ 'profile', 'profile' ]) && `${userProfile.getIn([ 'profile', 'profile', 'firstName' ])} ${userProfile.getIn([ 'profile', 'profile', 'lastName' ])}`}
                  </h2>
                  <div styleName='info-about'>
                    {userProfile.getIn([ 'profile', 'profile', 'description' ])}
                  </div>
                </div>
              </div>
              <div styleName='info-followers'>
                <div styleName='info-followers-count'>{userProfile.getIn([ 'profile', 'profile', 'followerCount' ])}</div>
                <div styleName='info-followers-text'>Followers</div>
              </div>
              <div styleName='info-following'>
                <div styleName='info-following-count'>{userProfile.getIn([ 'profile', 'profile', 'followingCount' ])}</div>
                <div styleName='info-following-text'>Following</div>
              </div>
              <div
                styleName='info-follow-btn'
                onClick={this.onSubscribeClick.bind(this)}>
                Follow
              </div>
              <div styleName='info-share-wrapper'>
                <DropdownMenu alignLeft trigger={<div className={styles['info-share']}><i><IconForward/></i></div>}>
                  <div>Facebook</div>
                  <div>Twitter</div>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <div styleName='nav-wrapper'>
          <div styleName='nav'>
            <Link
              activeClassName={styles['nav-item-active']}
              styleName='nav-item'
              to={`/${currentLocale}/profile/${userId}/loves`}>
              Loves
            </Link>
            <Link
              activeClassName={styles['nav-item-active']}
              styleName='nav-item'
              to={`/${currentLocale}/profile/${userId}/wishlist`}>
              Wishlist
            </Link>
          </div>
        </div>
        <div styleName='content'>
          {children}
        </div>
      </section>
    );
  }
}

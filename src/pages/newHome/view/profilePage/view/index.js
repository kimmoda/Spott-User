/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import DropdownMenu from '../../dropdownMenu';
import localized from '../../../../_common/localized';
import { IconForward, IconAvatar, IconCheck } from '../../icons';
import * as actions from '../../../actions';
import { userProfileDetailsSelector } from '../../../selectors';

const styles = require('./index.scss');
const { cssHeaderHeight } = require('../../vars.scss');

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
    currentUserId: PropTypes.string,
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
      isScrolledToInfo: false,
      isMobile: false,
      infoContainerHeight: null
    };
    this.headerHeight = parseInt(cssHeaderHeight, 10);
    this.isScrolledToInfo = false;
  }

  componentDidMount () {
    this.getContainerHeight();
    window.addEventListener('scroll', this.handleScroll);
    this.props.loadUserProfile({ uuid: this.props.params.userId });
    this.checkIfMobile();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.userId && nextProps.params.userId !== this.props.params.userId) {
      this.props.loadUserProfile({ uuid: nextProps.params.userId });
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    this.setState({
      isScrolledToInfo: this.infoContainer.offsetTop <= window.scrollY + this.headerHeight + 30
    });
  }

  handleResize () {
    this.checkIfMobile();
    this.getContainerHeight();
  }

  checkIfMobile () {
    if (this.mainContainer) {
      if (window.innerWidth < 600) {
        this.setState({ isMobile: true });
      } else {
        this.setState({ isMobile: false });
      }
    }
  }

  getContainerHeight () {
    if (this.infoChildContainer) {
      this.setState({ infoContainerHeight: this.infoChildContainer.clientHeight });
    }
  }

  onSubscribeClick (topicId, subscribed) {
    if (subscribed) {
      this.props.removeTopicSubscriber({ uuid: topicId });
    } else {
      this.props.setTopicSubscriber({ uuid: topicId });
    }
  }

  render () {
    const { children, currentLocale, userProfile, currentUserId } = this.props;
    const { userId } = this.props.params;
    const { isScrolledToInfo, isMobile, infoContainerHeight } = this.state;

    return (
      <section ref={(ref) => { this.mainContainer = ref; }} styleName='wrapper'>
        {userProfile.getIn([ 'profile', 'profile', 'picture', 'url' ]) && <div style={{ backgroundImage: `url('${userProfile.getIn([ 'profile', 'profile', 'picture', 'url' ])}?width=1200')` }} styleName='poster'/>}
        <div ref={(ref) => { this.infoContainer = ref; }} style={{ height: infoContainerHeight }} styleName='info-wrapper'>
          <div className={isScrolledToInfo && styles['info-sticky']} ref={(ref) => { this.infoChildContainer = ref; }} styleName='info responsive-container'>
            <div styleName='info-content'>
              <div styleName='info-left'>
                <div
                  style={{ backgroundImage: userProfile.getIn([ 'profile', 'profile', 'avatar', 'url' ]) ? `url('${userProfile.getIn([ 'profile', 'profile', 'avatar', 'url' ])}?width=48&height=48')` : null }}
                  styleName='info-image'>
                  {!userProfile.getIn([ 'profile', 'profile', 'avatar', 'url' ]) && <IconAvatar/>}
                </div>
                <div styleName='info-header'>
                  <h2 styleName='info-name'>
                    {userProfile.getIn([ 'profile', 'profile' ]) && `${userProfile.getIn([ 'profile', 'profile', 'firstName' ])} ${userProfile.getIn([ 'profile', 'profile', 'lastName' ])}`}
                  </h2>
                  <div styleName='info-about'>
                    {userProfile.getIn([ 'profile', 'profile', 'description' ])}
                  </div>
                </div>
              </div>
              <div styleName='info-right'>
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
                  {isMobile ? <i><IconCheck/></i> : 'Follow'}
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
        </div>
        <div styleName='nav-wrapper responsive-container'>
          <div styleName='nav'>
            <Link
              activeClassName={styles['nav-item-active']}
              styleName='nav-item'
              to={`/${currentLocale}/profile/${userId}/loves`}>
              Loves
            </Link>
            {userId === currentUserId &&
              <Link
                activeClassName={styles['nav-item-active']}
                styleName='nav-item'
                to={`/${currentLocale}/profile/${userId}/wishlist`}>
                Wishlist
              </Link>}
          </div>
        </div>
        <div styleName='content responsive-container'>
          {children}
        </div>
      </section>
    );
  }
}

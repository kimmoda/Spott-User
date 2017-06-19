/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { push as routerPush } from 'react-router-redux';
import localized from '../../../../_common/localized';
import { IconAvatar, IconCheck } from '../../icons';
import * as actions from '../../../actions';
import { userProfileDetailsSelector } from '../../../selectors';
import UsersModal from './usersModal';

const styles = require('./index.scss');
const { cssHeaderHeight } = require('../../vars.scss');

@localized
@connect(userProfileDetailsSelector, (dispatch) => ({
  loadUserProfile: bindActionCreators(actions.loadUserProfile, dispatch),
  loadUserFollowers: bindActionCreators(actions.loadUserFollowers, dispatch),
  loadUserFollowing: bindActionCreators(actions.loadUserFollowing, dispatch),
  removeUserFollowing: bindActionCreators(actions.removeUserFollowing, dispatch),
  setUserFollowing: bindActionCreators(actions.setUserFollowing, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewUserProfile extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    loadUserFollowers: PropTypes.func.isRequired,
    loadUserFollowing: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired
    }),
    removeUserFollowing: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    setUserFollowing: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    userProfile: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.handleScroll = ::this.handleScroll;
    this.handleResize = ::this.handleResize;
    this.showFollowersModal = ::this.showFollowersModal;
    this.closeFollowersModal = ::this.closeFollowersModal;
    this.showFollowingModal = ::this.showFollowingModal;
    this.closeFollowingModal = ::this.closeFollowingModal;
    this.state = {
      isScrolledToInfo: false,
      isFollowersModalOpen: false,
      isFollowingModalOpen: false
    };
    this.headerHeight = parseInt(cssHeaderHeight, 10);
    this.infoContainerHeight = null;
  }

  componentDidMount () {
    this.infoContainerHeight = this.infoContainerChild.clientHeight;
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.props.loadUserProfile({ uuid: this.props.params.userId });
  }

  async componentWillReceiveProps (nextProps) {
    if (nextProps.params.userId && nextProps.params.userId !== this.props.params.userId) {
      this.setState({
        isFollowersModalOpen: false,
        isFollowingModalOpen: false
      });
      await this.props.loadUserProfile({ uuid: nextProps.params.userId });
      this.setState({
        isScrolledToInfo: false
      });
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize () {
    if (this.infoContainerChild.clientHeight !== this.infoContainerHeight) {
      this.infoContainerHeight = this.infoContainerChild.clientHeight;
      this.forceUpdate();
    }
  }

  handleScroll () {
    this.setState({
      isScrolledToInfo: this.infoContainer.offsetTop <= window.scrollY + this.headerHeight + 30
    });
  }

  showFollowersModal () {
    this.setState({
      isFollowersModalOpen: true
    });
  }

  closeFollowersModal () {
    this.setState({
      isFollowersModalOpen: false
    });
  }

  showFollowingModal () {
    this.setState({
      isFollowingModalOpen: true
    });
  }

  closeFollowingModal () {
    this.setState({
      isFollowingModalOpen: false
    });
  }

  async onFollowClick (following) {
    const currentUserId = this.props.currentUserId;
    const userId = this.props.params.userId;
    if (currentUserId) {
      try {
        if (following) {
          await this.props.removeUserFollowing({ uuid: currentUserId, data: { uuid: userId } });
        } else {
          await this.props.setUserFollowing({ uuid: currentUserId, data: { uuid: userId } });
        }
        this.props.loadUserProfile({ uuid: userId });
      } catch (error) {
        throw error;
      }
    } else {
      this.props.routerPush({ pathname: `/${this.props.currentLocale}/login`, state: { modal: true, returnTo: ((this.props.location && `${this.props.location.pathname}${this.props.location.search}`) || '/') } });
    }
  }

  render () {
    const { children, currentLocale, userProfile, currentUserId, location, loadUserFollowing, loadUserFollowers, t } = this.props;
    const { userId } = this.props.params;
    const { isScrolledToInfo, isFollowersModalOpen, isFollowingModalOpen } = this.state;
    return (
      <section styleName='wrapper'>
        {userProfile.getIn([ 'profile', 'profile', 'picture', 'url' ]) && <div style={{ backgroundImage: `url('${userProfile.getIn([ 'profile', 'profile', 'picture', 'url' ])}?width=1200&height=480')` }} styleName='poster'/>}
        <div ref={(ref) => { this.infoContainer = ref; }} style={{ height: this.infoContainerHeight }} styleName='info-wrapper'>
          <div className={isScrolledToInfo && styles['info-sticky']} ref={(ref) => { this.infoContainerChild = ref; }} styleName='info responsive-container'>
            <div styleName='info-content'>
              <div styleName='info-left'>
                <div
                  style={{ backgroundImage: userProfile.getIn([ 'profile', 'profile', 'avatar', 'url' ]) ? `url('${userProfile.getIn([ 'profile', 'profile', 'avatar', 'url' ])}?width=64&height=64')` : null }}
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
                <div styleName='info-followers' onClick={userProfile.getIn([ 'profile', 'profile', 'followerCount' ]) && this.showFollowersModal}>
                  <div styleName='info-followers-count'>{userProfile.getIn([ 'profile', 'profile', 'followerCount' ])}</div>
                  <div styleName='info-followers-text'>{t('common.followers')}</div>
                </div>
                {isFollowersModalOpen &&
                  <UsersModal
                    loadUsers={loadUserFollowers}
                    location={location} userId={userId}
                    onClose={this.closeFollowersModal}/>}
                <div styleName='info-following' onClick={userProfile.getIn([ 'profile', 'profile', 'followingCount' ]) && this.showFollowingModal}>
                  <div styleName='info-following-count'>{userProfile.getIn([ 'profile', 'profile', 'followingCount' ])}</div>
                  <div styleName='info-following-text'>{t('common.following')}</div>
                </div>
                {isFollowingModalOpen &&
                  <UsersModal
                    followingListMode
                    loadUsers={loadUserFollowing}
                    location={location} userId={userId}
                    onClose={this.closeFollowingModal}/>}
                {userId !== currentUserId &&
                  <div
                    className={userProfile.getIn([ 'profile', 'profile', 'followingUser' ], false) && styles['info-follow-btn-active']}
                    styleName='info-follow-btn'
                    onClick={this.onFollowClick.bind(this, userProfile.getIn([ 'profile', 'profile', 'followingUser' ], false))}>
                    <span>{userProfile.getIn([ 'profile', 'profile', 'followingUser' ], false) ? t('common.following') : t('common.follow')}</span>
                    <i><IconCheck/></i>
                  </div>}
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
              {t('common.loves')}
            </Link>
            {userId === currentUserId &&
              <Link
                activeClassName={styles['nav-item-active']}
                styleName='nav-item'
                to={`/${currentLocale}/profile/${userId}/wishlist`}>
                {t('common.wishlist')}
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

/* eslint-disable react/no-set-state */
import React, { PureComponent, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { Link } from 'react-router';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import localized from '../_common/localized';
import * as actions from '../actions';
import { activityFeedSelector } from '../selectors';
import { IconLightning, IconAvatar, IconClose } from '../icons';
import { slugify, getDetailsDcFromLinks, getPath, backgroundImageStyle } from '../../utils';
import UserListItem from '../usersListItem';
import CustomScrollbars from '../customScrollbars';
import { FETCHING, LOADED } from '../../data/statusTypes';
import moment from 'moment';

const styles = require('./index.scss');

@localized
@connect(activityFeedSelector, (dispatch) => ({
  loadUserActivityFeed: bindActionCreators(actions.loadUserActivityFeed, dispatch),
  loadUserFollowers: bindActionCreators(actions.loadUserFollowersMore, dispatch),
  resetUserActivityFeedCounter: bindActionCreators(actions.resetUserActivityFeedCounter, dispatch),
  resetUserFollowersCounter: bindActionCreators(actions.resetUserFollowersCounter, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class ActivityFeed extends PureComponent {
  static propTypes = {
    activityFeed: PropTypes.any.isRequired,
    appboy: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    isAuthenticated: PropTypes.string,
    loadUserActivityFeed: PropTypes.func.isRequired,
    loadUserFollowers: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    resetUserActivityFeedCounter: PropTypes.func.isRequired,
    resetUserFollowersCounter: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    userFollowers: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.loadMoreActivity = ::this.loadMoreActivity;
    this.loadMoreFollowers = ::this.loadMoreFollowers;
    this.hideDropdown = ::this.hideDropdown;
    this.openFeed = ::this.openFeed;
    this.closeFeed = ::this.closeFeed;
    this.resetActivityFeedCounter = ::this.resetActivityFeedCounter;
    this.resetUserFollowersCounter = ::this.resetUserFollowersCounter;

    this.state = {
      feedTabIndex: 0,
      newsFeedLoaded: false,
      feedData: [],
      height: window.innerHeight
    };
  }

  componentDidMount () {
    const { loadUserActivityFeed, currentUserId, loadUserFollowers, userFollowers } = this.props;
    if (currentUserId) {
      loadUserActivityFeed({ uuid: currentUserId, page: 0 });
      if (!userFollowers) {
        loadUserFollowers({ uuid: currentUserId });
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { activityFeed, appboy } = this.props;
    if (appboy.get('open') !== nextProps.appboy.get('open')) {
      if (nextProps.appboy.get('open')) {
        this.openFeed();
      }
    }

    if (activityFeed.get('data', []).toJS().length !== nextProps.activityFeed.get('data', []).toJS().length) {
      this.setState({ feedData: this.parseFeedData(nextProps.activityFeed.get('data', []).toJS()) });
    }
  }

  setFeedTabIndex (index) {
    this.setState({ feedTabIndex: index });
  }

  loadMoreActivity (values) {
    const { loadUserActivityFeed, currentUserId, activityFeed: a } = this.props;
    if (values.top === 1 && a.get('_status') !== FETCHING && a.get('totalResultCount') > a.get('pageSize') && a.get('page') + 1 !== a.get('pageCount')) {
      loadUserActivityFeed({ uuid: currentUserId, page: a.get('page') + 1 });
    }
  }

  loadMoreFollowers (values) {
    const { currentUserId, loadUserFollowers, userFollowers: f } = this.props;
    if (values.top === 1 && f && f.get('data') && f.get('_status') !== FETCHING && f.get('totalResultCount') > f.get('pageSize') && f.get('page') + 1 !== f.get('pageCount')) {
      loadUserFollowers({ uuid: currentUserId, page: f.get('page') + 1 });
    }
  }

  hideDropdown () {
    this.dropdown && this.dropdown.hide();
  }

  openFeed () {
    this.dropdown && this.dropdown.show();
    if (this.state.feedTabIndex === 0 && !this.state.newsFeedLoaded) {
      window.appboy.display.toggleFeed(document.getElementById('appboy-feed'));
      this.setState({ newsFeedLoaded: true });
    }
  }

  closeFeed () {
    this.dropdown && this.dropdown.hide();
  }

  resetActivityFeedCounter () {
    const { resetUserActivityFeedCounter, currentUserId, activityFeed } = this.props;
    activityFeed.get('newItemCount', 0) > 0 && resetUserActivityFeedCounter({ uuid: currentUserId });
  }

  resetUserFollowersCounter () {
    const { resetUserFollowersCounter, currentUserId, userFollowers } = this.props;
    userFollowers.get('newItemCount', 0) > 0 && resetUserFollowersCounter({ uuid: currentUserId });
  }

  renderUnreadCount () {
    let totalCount = 0;
    const { activityFeed, appboy, userFollowers } = this.props;

    if (appboy.get('_status') === LOADED && window.appboy.getCachedFeed().getUnreadCardCount() > 0) {
      totalCount += window.appboy.getCachedFeed().getUnreadCardCount();
    }

    if (activityFeed.get('newItemCount', 0) > 0) {
      totalCount += activityFeed.get('newItemCount', 0);
    }

    if (userFollowers && userFollowers.get('newItemCount', 0) > 0) {
      totalCount += userFollowers.get('newItemCount', 0);
    }

    if (totalCount > 0) {
      return (
        <div styleName='feed-dot'>{totalCount}</div>
      );
    }
    return null;
  }

  parseFeedData (activityFeed) {
    const tempFeed = activityFeed.slice();
    const indexObject = {};
    const resultData = [];
    tempFeed.map((feed) => {
      const difference = moment(feed.date).toNow(true);
      const name = `${feed.user.firstName} ${feed.user.lastName}`;
      const url = (feed.user.user && feed.user.user.avatar && feed.user.user.avatar.url) ? feed.user.user.avatar.url : '';
      const id = feed.user.user.uuid;
      const feedArray = [];
      feedArray.push(feed);
      if (indexObject[difference] === undefined) {
        indexObject[difference] = resultData.length;
        const tempData = {};
        tempData[name] = {
          name,
          url,
          id,
          data: {
            [feed.type]: {
              type: feed.type,
              data: feedArray
            }
          }
        };
        resultData.push({
          date: difference,
          data: tempData
        });
      } else {
        const index = indexObject[difference];
        const tempData = resultData[index].data;
        if (tempData.hasOwnProperty(name)) {
          const tempUserData = tempData[name].data;
          if (tempUserData.hasOwnProperty(feed.type)) {
            const tempTypeData = tempUserData[feed.type].data;
            tempTypeData.push(feed);
            tempUserData[feed.type].data = tempTypeData;
          } else {
            tempUserData[feed.type] = {
              type: feed.type,
              data: feedArray
            };
          }
          tempData[name].data = tempUserData;
        } else {
          tempData[name] = {
            name,
            url,
            id,
            data: {
              [feed.type]: {
                type: feed.type,
                data: feedArray
              }
            }
          };
        }
        resultData[index].data = tempData;
      }
    });

    return resultData;
  }

  render () {
    const { activityFeed, appboy, currentLocale, t, userFollowers, currentUserId } = this.props;
    const { feedTabIndex, feedData } = this.state;

    return (
      <div styleName='dd-wrapper'>
        <Dropdown
          className={styles['dd-container']}
          ref={(ref) => { this.dropdown = ref; }}>
          <DropdownTrigger className={styles['dd-trigger']}>
            <div styleName='feed-trigger' onClick={this.openFeed}>
              <i><IconLightning/></i>
              {this.renderUnreadCount()}
            </div>
          </DropdownTrigger>
          <DropdownContent className={styles['dd-content']}>
            <div styleName='feed-wrapper'>
              <div styleName='feed-title-wrapper'>
                <h3 styleName='feed-title'>Notification</h3>
                <div styleName='feed-close' onClick={this.closeFeed}>
                  <i><IconClose /></i>
                </div>
              </div>
              <div styleName='feed-nav'>
                <div
                  className={feedTabIndex === 0 ? styles['feed-nav-item-active'] : null}
                  styleName='feed-nav-item'
                  onClick={(event) => {
                    this.setFeedTabIndex(0);
                  }}>
                  Latest
                  {appboy.get('_status') === LOADED && window.appboy.getCachedFeed().getUnreadCardCount() > 0 && <span>{window.appboy.getCachedFeed().getUnreadCardCount()}</span>}
                </div>
                {currentUserId &&
                <div
                  className={feedTabIndex === 1 ? styles['feed-nav-item-active'] : null}
                  styleName='feed-nav-item'
                  onClick={(event) => {
                    this.resetActivityFeedCounter();
                    this.setFeedTabIndex(1);
                  }}>
                  Following
                  {activityFeed.get('newItemCount', 0) > 0 && <span>{activityFeed.get('newItemCount', 0)}</span>}
                </div>}
                {currentUserId &&
                <div
                  className={feedTabIndex === 2 ? styles['feed-nav-item-active'] : null}
                  styleName='feed-nav-item'
                  onClick={(event) => {
                    this.resetUserFollowersCounter();
                    this.setFeedTabIndex(2);
                  }}>
                  You
                  {userFollowers && userFollowers.get('newItemCount', 0) > 0 &&
                  <span>{userFollowers.get('newItemCount', 0)}</span>}
                </div>
                }
              </div>
              <CustomScrollbars
                className={feedTabIndex === 0 ? styles['feed-tab-active'] : null}
                styleName='feed-tab-wrapper feed-tab'>
                <div id='appboy-feed'/>
              </CustomScrollbars>
              <CustomScrollbars
                autoHeight
                autoHeightMax={this.state.height - 184}
                autoHeightMin={0}
                className={feedTabIndex === 1 ? styles['feed-tab-active'] : null}
                styleName='feed-tab-wrapper feed-tab infinite-scroll-tab'
                onScrollFrame={this.loadMoreActivity}>
                {feedData.length > 0
                  ? <div>
                  {feedData.map((item, index) =>
                    Object.keys(item.data).map((user, userIndex) =>
                      Object.keys((item.data)[user].data).map((type, actionIndex) =>
                        <div key={`activity_${index}_${userIndex}_${actionIndex}`} styleName='user-action'>
                          <Link
                            style={backgroundImageStyle((item.data)[user].url, 64, 64)}
                            styleName='user-avatar'
                            to={`/${currentLocale}/profile/${(item.data)[user].id}`}>
                            {!(item.data)[user].url && <IconAvatar/>}
                          </Link>
                          <div styleName='user-r'>
                            <div styleName='action-text'>
                              <Link styleName='user-name' to={`/${currentLocale}/profile/${(item.data)[user].id}`}>
                                {user}
                              </Link>
                              {type === 'PRODUCT_WISHLISTED' &&
                              <span styleName='action-type'>wishlisted {((item.data)[user].data)[type].data.length} item{((item.data)[user].data)[type].data.length > 1 ? 's' : '' }. <span style={{ color: '#b2b1b3' }}>{item.date} ago</span></span>}
                              {type === 'USER_FOLLOWED' &&
                              <span styleName='action-type'>
                                followed <span style={{ color: '#b2b1b3' }}>{item.date} ago</span>
                              </span>}
                              {type === 'ANNOTATED_POST_LOVED' &&
                              <span styleName='action-type'>loved {((item.data)[user].data)[type].data.length} spott{((item.data)[user].data)[type].data.length > 1 ? 's' : ''}. <span style={{ color: '#b2b1b3' }}>{item.date} ago</span></span>}
                              {type === 'DATA_TOPIC_SUBSCRIPTION' &&
                              <span styleName='action-type'>
                                subscribed to <span style={{ color: '#b2b1b3' }}>{item.date} ago</span>
                              </span>}
                            </div>
                            {type === 'USER_FOLLOWED' &&
                            <div styleName='action-type'>
                              {((item.data)[user].data)[type].data.map((feed, feedIndex) =>
                                <span key={feedIndex}>
                                  <Link
                                    to={`/${currentLocale}/profile/${feed.activityUser.user.uuid}`}>
                                    {`${feed.activityUser.firstName} ${feed.activityUser.lastName}`}
                                  </Link>
                                  {feedIndex < ((item.data)[user].data)[type].data.length - 1 ? ', ' : ''}
                                </span>
                              )}
                            </div>}
                            {type === 'ANNOTATED_POST_LOVED' &&
                              <div style={{ display: 'inline-block', marginTop: '5px' }}>
                                {((item.data)[user].data)[type].data.map((feed, feedIndex) =>
                                  <Link
                                    key={feedIndex}
                                    styleName='action-spott'
                                    to={{
                                      pathname: `/${currentLocale}/modal/${getPath(feed.activityPost.shareUrl)}`,
                                      state: {
                                        modal: true,
                                        returnTo: `${location.pathname}${location.search}`,
                                        spottDc: getDetailsDcFromLinks(feed.activityPost.links)
                                      }
                                    }}
                                    onClick={this.hideDropdown}>
                                    <img src={feed.activityPost.image.url} style={{ width: 'auto', height: '56px' }} />
                                  </Link>
                                )}
                              </div>
                            }
                            {type === 'PRODUCT_WISHLISTED' &&
                            <div style={{ display: 'inline-block', marginTop: '5px' }}>
                              {((item.data)[user].data)[type].data.map((feed, feedIndex) =>
                                <Link
                                  key={feedIndex}
                                  styleName='action-product'
                                  to={{
                                    pathname: `/${currentLocale}/${getPath(feed.activityProduct.shareUrl)}`,
                                    state: {
                                      modal: true,
                                      returnTo: `${location.pathname}${location.search}`
                                    }
                                  }}
                                  onClick={this.hideDropdown}>
                                  <img src={feed.activityProduct.image.url} style={{ width: 'auto', height: '56px' }} />
                                </Link>
                              )}
                            </div>}
                            {type === 'DATA_TOPIC_SUBSCRIPTION' &&
                            <div styleName='action-type'>
                              {((item.data)[user].data)[type].data.map((feed, feedIndex) =>
                                <span key={feedIndex}>
                                    <Link
                                      to={`/${currentLocale}/topic/${slugify(feed.activityTopic.text)}/${feed.activityTopic.uuid}`}>
                                      {feed.activityTopic.text}
                                    </Link>
                                  {feedIndex < ((item.data)[user].data)[type].data.length - 1 ? ', ' : ''}
                                  </span>
                              )}
                            </div>}
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
                : <div style={{ textAlign: 'center', color: '#a7a6a9', padding: '0 20px' }}>
                    <h4>{t('activityFeed.noFeedTitle')}</h4>
                    <h5>{t('activityFeed.noFeedSubtitle')}</h5>
                  </div>
                }
              </CustomScrollbars>
              <CustomScrollbars
                autoHeight
                autoHeightMax={this.state.height - 184}
                autoHeightMin={0}
                className={feedTabIndex === 2 ? styles['feed-tab-active'] : null}
                styleName='feed-tab-wrapper feed-tab infinite-scroll-tab'
                onScrollFrame={this.loadMoreFollowers}>
                <div>
                  <UsersList currentUserId={currentUserId} userFollowers={userFollowers} />
                </div>
              </CustomScrollbars>
            </div>
            <div styleName='feed-overlay' onClick={this.hideDropdown}/>
            <div styleName='feed-overlay-close' onClick={this.hideDropdown}>
              <i><IconClose/></i>
            </div>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  }
}

@localized
@CSSModules(styles, { allowMultiple: true })
class UsersList extends PureComponent {
  static propTypes = {
    currentUserId: PropTypes.any,
    location: PropTypes.any,
    userFollowers: PropTypes.any
  };

  render () {
    const { userFollowers, currentUserId } = this.props;
    return (
      <div>
        {userFollowers && userFollowers.get('data', []).map((item, index) =>
          <UserListItem
            activityFeedMode
            currentUserId={currentUserId}
            item={item}
            key={`activity_feed_user_${index}_${item.get('uuid')}`}
            location={location}/>
        )}
      </div>
    );
  }
}

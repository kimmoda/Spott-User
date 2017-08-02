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
import { slugify, getDetailsDcFromLinks, getPath } from '../../utils';
import UserListItem from '../usersListItem';
import CustomScrollbars from '../customScrollbars';
import { FETCHING } from '../../data/statusTypes';

const styles = require('./index.scss');

@localized
@connect(activityFeedSelector, (dispatch) => ({
  loadUserActivityFeed: bindActionCreators(actions.loadUserActivityFeed, dispatch),
  loadUserFollowers: bindActionCreators(actions.loadUserFollowersMore, dispatch),
  resetUserActivityFeedCounter: bindActionCreators(actions.resetUserActivityFeedCounter, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class ActivityFeed extends PureComponent {
  static propTypes = {
    activityFeed: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    isAuthenticated: PropTypes.string,
    loadUserActivityFeed: PropTypes.func.isRequired,
    loadUserFollowers: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    resetUserActivityFeedCounter: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    userFollowers: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.loadMoreActivity = ::this.loadMoreActivity;
    this.loadMoreFollowers = ::this.loadMoreFollowers;
    this.hideDropdown = ::this.hideDropdown;
    this.handleMouseEnter = ::this.handleMouseEnter;
    this.handleMouseLeave = ::this.handleMouseLeave;
    this.resetActivityFeedCounter = ::this.resetActivityFeedCounter;

    this.state = {
      feedTabIndex: 0
    };
  }

  componentDidMount () {
    const { loadUserActivityFeed, currentUserId, loadUserFollowers } = this.props;
    loadUserActivityFeed({ uuid: currentUserId, page: 0 });
    loadUserFollowers({ uuid: currentUserId });
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

  handleMouseEnter () {
    window.outerWidth >= 640 && this.dropdown && this.dropdown.show();
  }

  handleMouseLeave () {
    window.outerWidth >= 640 && this.dropdown && this.dropdown.hide();
  }

  resetActivityFeedCounter () {
    const { resetUserActivityFeedCounter, currentUserId, activityFeed } = this.props;
    activityFeed.get('newItemCount', 0) > 0 && resetUserActivityFeedCounter({ uuid: currentUserId });
  }

  render () {
    const { activityFeed, currentLocale, userFollowers, currentUserId } = this.props;
    const { feedTabIndex } = this.state;

    return (
      <div styleName='dd-wrapper' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Dropdown
          className={styles['dd-container']}
          ref={(ref) => { this.dropdown = ref; }}
          onShow={this.resetActivityFeedCounter}>
          <DropdownTrigger className={styles['dd-trigger']}>
            <div styleName='feed-trigger'>
              <i><IconLightning/></i>
              {activityFeed.get('newItemCount', 0) > 0 && <div styleName='feed-dot'/>}
            </div>
          </DropdownTrigger>
          <DropdownContent className={styles['dd-content']}>
            <div styleName='feed-wrapper'>
              <div styleName='feed-nav'>
                <div
                  className={feedTabIndex === 0 ? styles['feed-nav-item-active'] : null}
                  styleName='feed-nav-item'
                  onClick={this.setFeedTabIndex.bind(this, 0)}>
                  Following
                </div>
                <div
                  className={feedTabIndex === 1 ? styles['feed-nav-item-active'] : null}
                  styleName='feed-nav-item'
                  onClick={this.setFeedTabIndex.bind(this, 1)}>
                  You
                  {userFollowers && <span>{userFollowers.get('totalResultCount', 0)}</span>}
                </div>
              </div>
              <CustomScrollbars autoHeight autoHeightMax={400} autoHeightMin={0} onScrollFrame={this.loadMoreActivity}>
                <div className={feedTabIndex === 0 ? styles['feed-tab-active'] : null} styleName='feed-tab'>
                  {activityFeed.get('data', []).map((item, index) =>
                    <div key={`activity_${index}`} styleName='user-action'>
                      <Link
                        style={{
                          backgroundImage: item.getIn([ 'user', 'avatar', 'url' ]) ? `url(${item.getIn([ 'user', 'avatar', 'url' ])}?width=64&height=64)` : null
                        }}
                        styleName='user-avatar'
                        to={`/${currentLocale}/profile/${item.getIn([ 'user', 'user', 'uuid' ])}`}>
                        {!item.getIn([ 'user', 'avatar', 'url' ]) && <IconAvatar/>}
                      </Link>
                      <div styleName='user-r'>
                        <div styleName='action-text'>
                          <Link styleName='user-name' to={`/${currentLocale}/profile/${item.getIn([ 'user', 'user', 'uuid' ])}`}>
                            {item.getIn([ 'user', 'firstName' ])} {item.getIn([ 'user', 'lastName' ])}
                          </Link>
                          {item.get('type') === 'PRODUCT_WISHLISTED' &&
                          <span styleName='action-type'>wishlisted an item.</span>}
                          {item.get('type') === 'USER_FOLLOWED' &&
                          <span styleName='action-type'>
                          now follows
                          <Link
                            to={`/${currentLocale}/profile/${item.getIn([ 'activityUser', 'user', 'uuid' ])}`}>
                            {item.getIn([ 'activityUser', 'firstName' ])} {item.getIn([ 'activityUser', 'lastName' ])}
                          </Link>
                        </span>}
                          {item.get('type') === 'ANNOTATED_POST_LOVED' &&
                          <span styleName='action-type'>loved a spott.</span>}
                          {item.get('type') === 'DATA_TOPIC_SUBSCRIPTION' &&
                          <span styleName='action-type'>
                          subscribed to
                          <Link
                            to={`/${currentLocale}/topic/${slugify(item.getIn([ 'activityTopic', 'text' ]))}/${item.getIn([ 'activityTopic', 'uuid' ])}`}>
                            {item.getIn([ 'activityTopic', 'text' ])}
                          </Link>
                        </span>}
                        </div>
                        {item.get('type') === 'ANNOTATED_POST_LOVED' &&
                        <Link
                          style={{ backgroundImage: `url(${item.getIn([ 'activityPost', 'image', 'url' ])}?width=48&height=56)` }}
                          styleName='action-spott'
                          to={{
                            pathname: `/${currentLocale}/${getPath(item.getIn([ 'activityPost', 'shareUrl' ]))}`,
                            state: {
                              modal: true,
                              returnTo: `${location.pathname}${location.search}`,
                              spottDc: getDetailsDcFromLinks(item.getIn([ 'activityPost', 'links' ]).toJS())
                            }
                          }}
                          onClick={this.hideDropdown}/>}
                        {item.get('type') === 'PRODUCT_WISHLISTED' &&
                        <Link
                          style={{ backgroundImage: `url(${item.getIn([ 'activityProduct', 'image', 'url' ])}?width=56&height=56)` }}
                          styleName='action-product'
                          to={{
                            pathname: `/${currentLocale}/${getPath(item.getIn([ 'activityProduct', 'shareUrl' ]))}`,
                            state: {
                              modal: true,
                              returnTo: `${location.pathname}${location.search}`
                            }
                          }}
                          onClick={this.hideDropdown}/>}
                      </div>
                    </div>
                  )}
                </div>
              </CustomScrollbars>
              <CustomScrollbars autoHeight autoHeightMax={400} autoHeightMin={0} onScrollFrame={this.loadMoreFollowers}>
                <div className={feedTabIndex === 1 ? styles['feed-tab-active'] : null} styleName='feed-tab'>
                  {userFollowers && userFollowers.get('data', []).map((item, index) =>
                    <UserListItem
                      activityFeedMode
                      currentUserId={currentUserId}
                      item={item}
                      key={`activity_feed_user_${index}_${item.get('uuid')}`}
                      location={location}/>
                  )}
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

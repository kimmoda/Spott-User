/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { push as routerPush } from 'react-router-redux';
import localized from '../../../_common/localized';
import Topics from '../topics';
import { IconSearch, IconLightning, IconArrow3 } from '../icons';
import DropdownMenu, { DropdownDivider } from '../dropdownMenu';
import * as actions from '../../actions';
import * as appActions from '../../../app/actions';
import { newHeaderSelector } from '../../selectors';

const styles = require('./index.scss');

const spottLogo = require('./spott.svg');
const dummyAvatarImage = require('./dummyAvatar.svg');

@localized
@connect(newHeaderSelector, (dispatch) => ({
  loadTrendingTopics: bindActionCreators(actions.loadTrendingTopics, dispatch),
  logout: bindActionCreators(appActions.doLogout, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class Header extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    currentUserAvatar: ImmutablePropTypes.mapContains({
      url: PropTypes.string
    }),
    currentUserFirstname: PropTypes.string,
    currentUserId: PropTypes.string,
    currentUserLastname: PropTypes.string,
    isAuthenticated: PropTypes.string,
    loadTrendingTopics: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    trendingTopics: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.onLogoutClick = ::this.onLogoutClick;
    this.onSearchFocus = ::this.onSearchFocus;
    this.onSearchBlur = ::this.onSearchBlur;
    this.onSearchChange = ::this.onSearchChange;
    this.state = {
      isSearchActive: false,
      searchValue: ''
    };
  }

  onLogoutClick (e) {
    e.preventDefault();
    this.props.logout();
    this.props.routerPush(`/${this.props.currentLocale}/new/home`);
  }

  onSearchFocus () {
    this.setState({ isSearchActive: true });
  }

  onSearchBlur () {
    if (!this.state.searchValue) {
      this.setState({ isSearchActive: false });
    }
  }

  onSearchChange (e) {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
  }

  render () {
    const { currentLocale, t, trendingTopics, isAuthenticated, currentUserAvatar } = this.props;

    return (
      <div>
        <header className={this.state.isSearchActive && styles['header-search-active']} styleName='header'>
          <div styleName='header-wrapper'>
            <Link styleName='logo' to={`/${currentLocale}/new/home`}>
              <img alt={t('_common.header.home')} src={spottLogo}/>
            </Link>
            <div className={this.state.isSearchActive && styles['search-active']} styleName='search'>
              <div className={this.state.isSearchActive && styles['search-wrapper-active']} styleName='search-wrapper'>
                <i><IconSearch/></i>
                <input
                  placeholder='Search for inspiration'
                  styleName='search-input' type='text'
                  value={this.state.searchValue}
                  onBlur={this.onSearchBlur}
                  onChange={this.onSearchChange}
                  onFocus={this.onSearchFocus}/>
              </div>
            </div>
            <div styleName='header-right'>
              {isAuthenticated
                ? <div styleName='user-bar'>
                    <div styleName='user-notifications'>
                      <i><IconLightning/></i>
                    </div>
                    <div styleName='user-menu'>
                      <DropdownMenu alignLeft trigger={<div className={styles['user-avatar']}>
                        <img src={currentUserAvatar ? `${currentUserAvatar.get('url')}?height=24&width=24` : dummyAvatarImage}/>
                        <i><IconArrow3/></i>
                      </div>}>
                        <div>My profile</div>
                        <div>Settings</div>
                        <DropdownDivider/>
                        <div onClick={this.onLogoutClick}>Log Out</div>
                      </DropdownMenu>
                    </div>
                  </div>
                : <Link styleName='sign-in' to={{ pathname: `/${currentLocale}/new/login`, state: { modal: true, returnTo: this.props.location.pathname } }}>
                    Sign in
                  </Link>
              }
            </div>
          </div>
        </header>
        <div className={this.state.isSearchActive && styles['search-results-active']} styleName='search-results'>
          <div styleName='search-results-wrapper'>
            <div styleName='recent-searches'>
              <h2 styleName='recent-searches-title'>Recent searches</h2>
              <div styleName='recent-searches-items'>
                <Link styleName='recent-searches-item' to='#'>Gabriel Macht</Link>
                <Link styleName='recent-searches-item' to='#'>Harvey Specter</Link>
                <Link styleName='recent-searches-item' to='#'>Red Carpet</Link>
                <Link styleName='recent-searches-item' to='#'>Tom Ford</Link>
                <Link styleName='recent-searches-item' to='#'>Suits</Link>
                <Link styleName='recent-searches-item' to='#'>Series</Link>
                <Link styleName='recent-searches-item' to='#'>Suit</Link>
              </div>
              <div styleName='recent-searches-clear'>Clear search history</div>
            </div>
            <div styleName='search-topics'>
              <div styleName='search-topics-title'>Topics for you</div>
              <Topics items={trendingTopics} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

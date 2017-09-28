/* eslint-disable react/no-set-state */
/* eslint-disable no-nested-ternary */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { push as routerPush } from 'react-router-redux';
import Autosuggest from 'react-autosuggest';
import { backgroundImageStyle, getPath, slowdown } from '../../utils';
import localized from '../_common/localized';
import Topics from '../topics';
import { IconArrow3, IconAvatar, IconClose, IconDots, IconMenu, IconSearch } from '../icons';
import DropdownMenu, { DropdownDivider } from '../dropdownMenu';
import * as actions from '../actions';
import * as appActions from '../app/actions';
import { newHeaderSelector } from '../selectors';
import AutocompleteListItem from './autocompleteListItem';
import AutocompleteInput from './autocompleteInput';
import { localesHash, locales } from '../../locales';
import ActivityFeed from '../activityFeed';

const styles = require('./index.scss');
const spottLogo = require('./spott.svg');

@localized
@connect(newHeaderSelector, (dispatch) => ({
  clearSearchSuggestions: bindActionCreators(actions.clearSearchSuggestions, dispatch),
  loadSearchHistory: bindActionCreators(actions.loadSearchHistory, dispatch),
  loadSearchSuggestions: bindActionCreators(actions.loadSearchSuggestions, dispatch),
  loadTrendingTopics: bindActionCreators(actions.loadTrendingTopics, dispatch),
  logout: bindActionCreators(appActions.doLogout, dispatch),
  removeSearchHistory: bindActionCreators(actions.removeSearchHistory, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class Header extends Component {
  static propTypes = {
    clearSearchSuggestions: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentUserAvatar: PropTypes.object,
    currentUserFirstname: PropTypes.string,
    currentUserId: PropTypes.string,
    currentUserLastname: PropTypes.string,
    isAuthenticated: PropTypes.string,
    loadSearchHistory: PropTypes.func.isRequired,
    loadSearchSuggestions: PropTypes.func.isRequired,
    loadTrendingTopics: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    removeSearchHistory: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    searchHistory: PropTypes.object.isRequired,
    searchSuggestions: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    trendingTopics: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.onLogoutClick = ::this.onLogoutClick;

    this.getSuggestionValue = ::this.getSuggestionValue;
    this.onBlur = ::this.onBlur;
    this.onSearchClose = ::this.onSearchClose;
    this.onSearchOverlayClick = ::this.onSearchOverlayClick;
    this.onSearchHistoryClearClick = ::this.onSearchHistoryClearClick;
    this.onChange = ::this.onChange;
    this.onFocus = ::this.onFocus;
    this.onKeyDown = ::this.onKeyDown;
    this.onSuggestionsClearRequested = ::this.onSuggestionsClearRequested;
    this.onSuggestionsFetchRequested = slowdown(::this.onSuggestionsFetchRequested, 300);
    this.onSuggestionSelected = ::this.onSuggestionSelected;
    this.renderInputComponent = ::this.renderInputComponent;
    this.renderSuggestion = ::this.renderSuggestion;
    this.renderSuggestionsContainer = ::this.renderSuggestionsContainer;

    this.state = {
      isInputFocused: false,
      searchValue: this.props.location.query && this.props.location.query.q ? this.props.location.query.q : '',
      prevSearchValue: '',
      isTrendsLoaded: false
    };
  }

  componentDidMount () {
    this.props.isAuthenticated && this.props.loadSearchHistory();
    if (!this.checkIfFromShareUrl()) {
      this.loadTrendingTopics();
    }
  }

  componentWillReceiveProps (nextProps, nextState) {
    if (this.props.location.query.q !== nextProps.location.query.q) {
      this.state = {
        searchValue: nextProps.location.query && nextProps.location.query.q ? nextProps.location.query.q : ''
      };
    }
    if (nextProps.isAuthenticated && !this.props.isAuthenticated) {
      this.props.loadSearchHistory();
    }
    if (!nextProps.isAuthenticated && this.props.isAuthenticated) {
      this.props.removeSearchHistory();
    }
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    if (!prevState.isInputFocused && this.state.isInputFocused) {
      const inputs = document.getElementsByTagName('input');
      if (inputs.length > 0) {
        inputs[0].focus();
      }
    }
  }

  loadTrendingTopics () {
    if (this.state.isTrendsLoaded) {
      return;
    }
    this.setState({ isTrendsLoaded: true });
    this.props.loadTrendingTopics();
  }

  checkIfFromShareUrl () {
    return getPath(this.props.location.pathname).slice(0, 6) === 'spott/';
  }

  getSuggestionValue (suggestion) {
    return this.state.searchValue;
  }

  changeLocale (locale, e) {
    e.preventDefault();
    window.location.replace(window.location.href.replace(`/${this.props.currentLocale}`, `/${locale}`));
  }

  onBlur () {
  }

  onSearchClose () {
    this.setState({
      isInputFocused: false,
      searchValue: '',
      prevSearchValue: ''
    });
  }

  onSearchOverlayClick () {
    this.setState({
      isInputFocused: false
    });
  }

  onSearchHistoryClearClick () {
    this.props.removeSearchHistory();
  }

  onFocus () {
    this.setState({ isInputFocused: true });
    if (this.checkIfFromShareUrl()) {
      this.loadTrendingTopics();
    }
  }

  onChange (event, { newValue }) {
    this.setState({ searchValue: newValue });
  }

  onKeyDown (e) {
    if (e.keyCode === 13) {
      this.setState({ searchValue: this.state.searchValue });
    }
  }

  onLogoutClick (e) {
    e.preventDefault();
    this.props.logout();
    this.props.routerPush(`/${this.props.currentLocale}/`);
  }

  onSuggestionsFetchRequested ({ value }) {
    if (value !== this.state.prevSearchValue) {
      this.setState({ prevSearchValue: value });
      this.props.loadSearchSuggestions({ searchString: value });
    }
  }

  onSuggestionsClearRequested () {
  }

  onSuggestionSelected (event, { suggestion }) {
    this.setState({ searchValue: suggestion.text });
    if (suggestion.urlPart) {
      this.props.routerPush(`/${this.props.currentLocale}/${suggestion.urlPart}`);
    } else {
      this.props.routerPush(`/${this.props.currentLocale}/search?q=${suggestion.text}`);
    }
    this.setState({
      isInputFocused: false
    });
  }

  renderInputComponent (inputProps) {
    return (
      <AutocompleteInput {...inputProps}/>
    );
  }

  renderSuggestion (suggestion) {
    return (
      <AutocompleteListItem suggestion={suggestion}/>
    );
  }

  renderSuggestionsContainer ({ children, ...rest }) {
    const { t } = this.props;
    const suggestions = this.props.searchSuggestions.get('items').size;
    const value = this.state.searchValue;
    const prevValue = this.state.prevSearchValue;
    const isInputFocused = this.state.isInputFocused;
    const isLoading = this.props.searchSuggestions.get('isLoading');

    return (
      <div {...rest} className={`${styles['search-suggestions']} ${styles['responsive-container']}`}>
        { suggestions && value
          ? children
          : value && isInputFocused &&
          <span className={styles['search-suggestions-helper']}>
            { isLoading || value !== prevValue
              ? <span>{t('search.loadingResults')}</span>
              : <span>
                  {t('search.noResults')}
                </span>
            }
          </span>
        }
      </div>
    );
  }

  render () {
    const { currentLocale, t, trendingTopics, isAuthenticated, currentUserAvatar, currentUserId, searchSuggestions, searchHistory, location } = this.props;
    const { searchValue } = this.state;
    const suggestions = searchSuggestions.get('items').toJS();

    const inputProps = {
      autoFocus: 'true',
      value: searchValue,
      onBlur: this.onBlur,
      onChange: this.onChange,
      onSearchClose: this.onSearchClose,
      onKeyDown: this.onKeyDown,
      placeholder: t('search.findYourStyle')
    };

    return (
      <div>
        <header className={this.state.isInputFocused && styles['header-search-active']} styleName='header responsive-container '>
          <div styleName='header-wrapper'>
            <div styleName='menu-link menu-toggler'>
              <DropdownMenu
                customAlignClass={styles['full-width-menu']}
                dropdownClassName={styles['menu-dropdown-content']}
                openedView={
                  <div className={styles['menu-dropdown']}>
                    <i><IconClose/></i>
                  </div>
                }
                trigger={
                  <div className={styles['menu-dropdown']}>
                    <i><IconMenu/></i>
                  </div>
                }>
                <a href='http://blog.spott.tv' styleName='menu-link big-dropdown-item' target='_blank'>{t('common.blog')}</a>
                <DropdownDivider/>
                <Link to={`/${currentLocale}/terms`}>{t('common.terms')}</Link>
                <DropdownDivider/>
                <Link to={`/${currentLocale}/privacy`}>{t('common.privacy')}</Link>
              </DropdownMenu>
            </div>

            <Link styleName='logo' to={`/${currentLocale}/`}>
              <img alt={t('common.home')} src={spottLogo}/>
            </Link>
            <div styleName='header-nav-bar '>
              <div>
                <a href='http://blog.spott.tv' styleName='menu-link' target='_blank'>{t('common.blog')}</a>
              </div>
              <div styleName='menu-link menu-overflow'>
                <DropdownMenu alignRight trigger={
                    <div className={styles['menu-dropdown']}>
                      <i><IconDots/></i>
                    </div>
                  }>
                  <Link to={`/${currentLocale}/terms`}>{t('common.terms')}</Link>
                  <Link to={`/${currentLocale}/privacy`}>{t('common.privacy')}</Link>
                </DropdownMenu>
              </div>
            </div>
            {this.state.isInputFocused &&
            <div className={this.state.isInputFocused && styles['search-active']} styleName='search'>
              <div
                className={this.state.isInputFocused && (`${styles['search-wrapper-active']} ${styles['responsive-container']}`)}
                styleName='search-wrapper'>
                <Autosuggest
                  focusFirstSuggestion={false}
                  focusInputOnSuggestionClick={false}
                  getSuggestionValue={this.getSuggestionValue}
                  inputProps={inputProps}
                  renderInputComponent={this.renderInputComponent}
                  renderSuggestion={this.renderSuggestion}
                  renderSuggestionsContainer={this.renderSuggestionsContainer}
                  suggestions={suggestions}
                  onSuggestionSelected={this.onSuggestionSelected}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}/>
              </div>
            </div>
            }

            <div styleName='header-right'>
              {!this.state.isInputFocused && <i styleName='search-icon' onClick={this.onFocus}><IconSearch/></i>}
              <div styleName='languages-bar'>
                <DropdownMenu
                  alignLeft
                  trigger={
                    <div className={styles['language-dropdown']}>
                      <span>{localesHash[currentLocale]}</span>
                      <strong>{currentLocale}</strong>
                      <i><IconArrow3/></i>
                    </div>
                  }>
                  {locales.map((locale) =>
                    <div
                      className={currentLocale === locale ? 'selected' : null}
                      key={locale} onClick={this.changeLocale.bind(this, locale)}>
                      {localesHash[locale]}
                    </div>
                  )}
                </DropdownMenu>
              </div>
              <ActivityFeed location={location}/>
              {isAuthenticated
                ? <div styleName='user-bar'>
                    <div styleName='user-menu'>
                      <Link
                        className={styles['user-avatar']}
                        style={currentUserAvatar && backgroundImageStyle(currentUserAvatar.get('url'), 24, 24)}
                        to={`/${currentLocale}/profile/${currentUserId}`}>
                        {Boolean(!currentUserAvatar || !currentUserAvatar.get('url')) && <IconAvatar/>}
                      </Link>
                      <DropdownMenu alignLeft trigger={<div className={styles['user-dropdown']}>
                        <i><IconArrow3/></i>
                      </div>}>
                        <Link to={`/${currentLocale}/profile/${currentUserId}`}>{t('userMenu.myProfile')}</Link>
                        <Link to={`/${currentLocale}/user/settings`}>{t('common.settings')}</Link>
                        <DropdownDivider/>
                        <div onClick={this.onLogoutClick}>{t('common.logOut')}</div>
                      </DropdownMenu>
                    </div>
                  </div>
                : <Link styleName='sign-in' to={{ pathname: `/${currentLocale}/login`, state: { modal: true, returnTo: this.props.location.pathname } }}>
                    {t('common.signIn')}
                  </Link>
              }
            </div>
          </div>
        </header>
        <div className={this.state.isInputFocused && `${styles['search-results-active']} ${styles['responsive-container']}`} styleName='search-results'>
          <div styleName='search-results-wrapper'>
            {Boolean(searchHistory && searchHistory.get('data') && searchHistory.get('data').size) &&
            <div styleName='recent-searches'>
              <h2 styleName='recent-searches-title'>{t('search.recentSearches')}</h2>
              <div styleName='recent-searches-items'>
                {searchHistory.get('data').filter((item) => item.get('query') !== 'undefined').map((item, index) =>
                  <Link
                    key={`search_history_item_${index}`}
                    styleName='recent-searches-item'
                    to={`/${currentLocale}/search/posts?q=${item.get('query')}`}>
                    {item.get('query').trim()}
                  </Link>
                )}
              </div>
              <div styleName='recent-searches-clear' onClick={this.onSearchHistoryClearClick}>{t('search.clearSearchHistory')}</div>
            </div>}
            <div styleName='search-topics'>
              <div styleName='search-topics-title'>{t('search.topicsForYou')}</div>
              <Topics items={trendingTopics} />
            </div>
          </div>
        </div>
        <div
          className={this.state.isInputFocused && styles['search-results-overlay-active']}
          styleName='search-results-overlay'
          onClick={this.onSearchOverlayClick}/>
      </div>
    );
  }
}

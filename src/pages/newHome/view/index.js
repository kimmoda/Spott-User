/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import localized from '../../_common/localized';
import Topics from './topics';
import { IconSearch } from './icons';
import * as actions from '../actions';
import { newHomeSelector } from '../selectors';

const styles = require('./index.scss');

const spottLogo = require('./spott.svg');
const spottGrayLogo = require('./spottGray.svg');

@localized
@connect(newHomeSelector, (dispatch) => ({
  loadTrendingTopics: bindActionCreators(actions.loadTrendingTopics, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class New extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    currentLocale: PropTypes.string.isRequired,
    loadTrendingTopics: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    trendingTopics: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.onSearchFocus = ::this.onSearchFocus;
    this.onSearchBlur = ::this.onSearchBlur;
    this.onSearchChange = ::this.onSearchChange;
    this.state = {
      isSearchActive: false,
      searchValue: ''
    };
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
    const { currentLocale, t, children, trendingTopics } = this.props;

    return (
      <div styleName='wrapper'>
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
            <Link styleName='sign-in' to={{ pathname: `/${currentLocale}/new/login`, state: { modal: true, returnTo: this.props.location.pathname } }}>
              Sign in
            </Link>
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
        <section styleName='content'>
          {children}
        </section>
        <footer styleName='footer'>
          <div styleName='footer-wrapper'>
            <div styleName='footer-left'>
              <Link styleName='logo' to={`/${currentLocale}`}>
                <img alt={t('_common.header.home')} src={spottGrayLogo}/>
              </Link>
              <div styleName='footer-dsc'>
                Spott allows you to find products<br/>
                in the things you watch.
              </div>
            </div>
            <nav styleName='footer-navs'>
              <div styleName='footer-nav'>
                <Link styleName='footer-nav-link' to='#'>About</Link>
                <Link styleName='footer-nav-link' to='#'>Help</Link>
                <Link styleName='footer-nav-link' to='#'>Contact</Link>
              </div>
              <div styleName='footer-nav'>
                <Link styleName='footer-nav-link' to='#'>Terms</Link>
                <Link styleName='footer-nav-link' to='#'>Privacy</Link>
                <Link styleName='footer-nav-link' to='#'>Business</Link>
              </div>
            </nav>
            <div styleName='footer-follow'>
              Follow us on social media
            </div>
            <div styleName='footer-copyright'>
              © Spott 2017<br/>
              Appiness, Hertshage 10, 9300 Aalst, Belgium
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

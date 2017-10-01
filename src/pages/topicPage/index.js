/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { Link } from 'react-router';
import localized from '../_common/localized';
import SEOWidget from '../_common/seoWidget';
import Topics from '../topics';
import { IconCheck, IconArrow3 } from '../icons';
import * as actions from '../actions';
import { topicDetailsSelector } from '../selectors';
import DropdownMenu from '../dropdownMenu';
import { backgroundImageStyle, slugify } from '../../utils';
import Tiles from '../tiles';
import { LOADED } from '../../data/statusTypes';

const styles = require('./index.scss');
const { cssHeaderHeight } = require('../vars.scss');

@localized
@connect(topicDetailsSelector, (dispatch) => ({
  loadTopicDetails: bindActionCreators(actions.loadTopicDetails, dispatch),
  loadTopicSeasonEpisodes: bindActionCreators(actions.loadTopicSeasonEpisodes, dispatch),
  loadTopicSpottsMore: bindActionCreators(actions.loadTopicSpottsMore, dispatch),
  removeTopicSubscriber: bindActionCreators(actions.removeTopicSubscriber, dispatch),
  setTopicSubscriber: bindActionCreators(actions.setTopicSubscriber, dispatch),
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewTopic extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    currentLocale: PropTypes.string.isRequired,
    currentUserId: PropTypes.string,
    loadTopicDetails: PropTypes.func.isRequired,
    loadTopicSeasonEpisodes: PropTypes.func.isRequired,
    loadTopicSpottsMore: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.shape({
      topicTitle: PropTypes.string.isRequired,
      topicId: PropTypes.string.isRequired,
      seasonId: PropTypes.string,
      seasonSlug: PropTypes.string
    }),
    removeTopicSubscriber: PropTypes.func.isRequired,
    routerPush: PropTypes.func.isRequired,
    setTopicSubscriber: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    topic: PropTypes.any.isRequired,
    topicRelated: PropTypes.any.isRequired,
    topicSeasonEpisodes: PropTypes.any.isRequired,
    topicSeasonSpotts: PropTypes.any.isRequired,
    topicSeasons: PropTypes.any.isRequired,
    topicSpotts: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.handleScroll = ::this.handleScroll;
    this.handleResize = ::this.handleResize;
    this.loadMore = ::this.loadMore;
    this.state = {
      isScrolledToInfo: false,
      infoContainerHeight: null
    };
    this.headerHeight = parseInt(cssHeaderHeight, 10);
    this.isScrolledToInfo = false;
  }

  componentWillMount () {
    const { location, params, topicSpotts, loadTopicDetails, loadTopicSeasonEpisodes } = this.props;
    const dc = location.state && location.state.dc || '';
    loadTopicDetails({ uuid: params.topicId, page: topicSpotts.get('page') || 0, dc });
    if (params.seasonId) {
      loadTopicSeasonEpisodes({ uuid: params.seasonId });
    }
    this.getContainerHeight();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps (nextProps) {
    const dc = nextProps.location.state && nextProps.location.state.dc || '';
    const { topicId, seasonId } = this.props.params;
    const { topicId: nextTopicId, seasonId: nextSeasonId } = nextProps.params;
    if (topicId !== nextTopicId) {
      this.props.loadTopicDetails({ uuid: nextTopicId, page: nextProps.topicSpotts.get('page') || 0, dc });
    }
    if (nextSeasonId && seasonId !== nextSeasonId) {
      this.props.loadTopicSeasonEpisodes({ uuid: nextSeasonId });
    }
    this.getContainerHeight();
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleScroll () {
    this.setState({
      isScrolledToInfo: this.infoContainer.offsetTop <= window.scrollY + this.headerHeight + 30
    });
    this.getContainerHeight();
  }

  handleResize () {
    this.getContainerHeight();
  }

  getContainerHeight () {
    if (this.infoChildContainer) {
      this.setState({ infoContainerHeight: this.infoChildContainer.clientHeight });
    }
  }

  loadMore (page) {
    this.props.loadTopicSpottsMore({ uuid: this.props.params.topicId, page });
  }

  onSubscribeClick (topicId, subscribed) {
    if (this.props.currentUserId) {
      if (subscribed) {
        this.props.removeTopicSubscriber({ uuid: topicId });
      } else {
        this.props.setTopicSubscriber({ uuid: topicId });
      }
    } else {
      this.props.routerPush({ pathname: `/${this.props.currentLocale}/login`, state: { modal: true, returnTo: ((this.props.location && this.props.location.pathname) || '/') } });
    }
  }

  render () {
    const { topic, topicRelated, t, topicSeasons, children, currentLocale, topicSeasonEpisodes } = this.props;
    const { topicTitle, topicId, seasonId, seasonSlug } = this.props.params;
    const { isScrolledToInfo, infoContainerHeight } = this.state;
    const currentSeason = topicSeasons.get('data', []).find((item) => item.get('uuid') === seasonId);
    if (topic.get('_status') === LOADED) {
      return (
        <section styleName='wrapper'>
          {topic.getIn([ 'medium', 'profileImage', 'url' ]) && <div style={backgroundImageStyle(topic.getIn([ 'medium', 'profileImage', 'url' ]), 1200, 480)} styleName='poster' title={topic.get('text')}/>}
          <div ref={(ref) => { this.infoContainer = ref; }} style={{ height: infoContainerHeight }} styleName='info-wrapper'>
            <div className={isScrolledToInfo && styles['info-sticky']} ref={(ref) => { this.infoChildContainer = ref; }} styleName='info responsive-container'>
              <div styleName='info-content'>
                <div styleName='info-left'>
                  {Boolean(topic.get('sourceType') === 'BRAND' && topic.getIn([ 'brand', 'logo', 'url' ])) &&
                  <div
                    style={backgroundImageStyle(topic.getIn([ 'brand', 'logo', 'url' ]), 160, 160)}
                    styleName='info-image info-image-square'/>}
                  {Boolean(topic.get('sourceType') === 'MEDIUM' && topic.getIn([ 'medium', 'posterImage', 'url' ])) &&
                  <div
                    style={backgroundImageStyle(topic.getIn([ 'medium', 'posterImage', 'url' ]), 160, 160)}
                    styleName='info-image'/>}
                  {Boolean(topic.get('sourceType') === 'CHARACTER' && topic.getIn([ 'character', 'avatar', 'url' ])) &&
                  <div
                    style={backgroundImageStyle(topic.getIn([ 'character', 'avatar', 'url' ]), 160, 160)}
                    styleName='info-image info-image-square'/>}
                  {Boolean(topic.get('sourceType') === 'PERSON' && topic.getIn([ 'person', 'avatar', 'url' ])) &&
                  <div
                    style={backgroundImageStyle(topic.getIn([ 'person', 'avatar', 'url' ]), 160, 160)}
                    styleName='info-image info-image-square'/>}
                  <div styleName='info-header'>
                    <h1 styleName='info-title'>{topic.get('text')}</h1>
                    {topic.get('sourceType') &&
                    <div styleName='info-type'>
                      {topic.get('sourceType') === 'MEDIUM'
                        ? t(`topic.${topic.getIn([ 'medium', 'type' ])}`)
                        : t(`topic.${topic.get('sourceType')}`)
                      }
                    </div>}
                  </div>
                </div>
                <div styleName='info-right'>
                  <div styleName='info-subscribers'>
                    <div styleName='info-subscribers-count'>{topic.get('subscriberCount')}</div>
                    <div styleName='info-subscribers-text'>{t('common.subscribers')}</div>
                  </div>
                  <div
                    className={topic.get('subscribed') && styles['info-subscribe-btn-subscribed']}
                    styleName='info-subscribe-btn'
                    onClick={this.onSubscribeClick.bind(this, topic.get('uuid'), topic.get('subscribed'))}>
                    <span>{topic.get('subscribed') ? t('common.subscribed') : t('common.subscribe')}</span>
                    <i><IconCheck /></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {Boolean(topicRelated && topicRelated.get('data') && topicRelated.get('data').size) &&
          <div styleName='topics responsive-container'>
            <div styleName='topics-content'>
              <div styleName='topics-title'>{t('topic.relatedTopics')}</div>
              <Topics items={topicRelated} />
            </div>
          </div>}
          {(topic.get('sourceType') === 'MEDIUM' && topic.getIn([ 'medium', 'type' ]) === 'TV_SERIE') &&
          <div styleName='cards-filters-container responsive-container'>
            <div styleName='cards-filters'>
              <div styleName='cards-filter'>
                <DropdownMenu trigger={
                  <div className={styles['cards-filter-trigger']}>
                    {seasonId ? (currentSeason && currentSeason.get('title')) : 'All seasons'}
                    <i><IconArrow3/></i>
                  </div>
                }>
                  <Link to={`/${currentLocale}/topic/${slugify(topicTitle)}/${topicId}`}>All seasons</Link>
                  {topicSeasons.get('data', []).map((item, index) =>
                    <Link activeClassName='selected' key={`season_${index}`} to={`/${currentLocale}/topic/${slugify(topicTitle)}/${topicId}/season/${slugify(item.get('title'))}/${item.get('uuid')}`}>
                      {item.get('title')}
                    </Link>
                  )}
                </DropdownMenu>
              </div>
            </div>
            <div styleName='episodes'>
              {topicSeasonEpisodes.get('data') && <Tiles tileOffsetWidth={16} tilesCount={topicSeasonEpisodes.get('data').size}>
                {topicSeasonEpisodes.get('data', []).map((item, index) =>
                  <Link
                    activeClassName={styles['episode-wrapper-selected']}
                    key={`episode_${index}_${item.get('uuid')}`}
                    styleName='episode-wrapper'
                    to={`/${currentLocale}/topic/${slugify(topicTitle)}/${topicId}/season/${seasonSlug}/${seasonId}/episode/${slugify(item.get('title', ''))}/${item.get('uuid')}`}>
                    <div styleName='episode'>
                      <div
                        style={backgroundImageStyle(item.getIn([ 'profileImage', 'url' ]), 160, 90)}
                        styleName='episode-image'/>
                      <div styleName='episode-overlay'/>
                      <div styleName='episode-title'>{item.get('title')}</div>
                    </div>
                  </Link>
                )}
              </Tiles>}
            </div>
          </div>}
          <div styleName='cards-wrapper responsive-container'>
            {children}
          </div>
          {topic.get('text') && <SEOWidget description={t('seo.topic.description')} title={`${t('seo.title')} - ${topic.get('text')}`}/>}
        </section>
      );
    }
    return null;
  }
}

/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Masonry from 'react-masonry-component';
import localized from '../../../_common/localized';
import Topics from '../topics';
import Card from '../card';
import * as actions from '../../actions';
import { newHomeSelector } from '../../selectors';
import { FETCHING } from '../../../../data/statusTypes';

const styles = require('./index.scss');

@localized
@connect(newHomeSelector, (dispatch) => ({
  loadSpottsList: bindActionCreators(actions.loadSpottsListWrapper, dispatch),
  loadTrendingTopics: bindActionCreators(actions.loadTrendingTopics, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewHome extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    feedSpotts: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.string,
    loadSpottsList: PropTypes.func.isRequired,
    loadTrendingTopics: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    spotts: PropTypes.any.isRequired,
    spottsPromoted: PropTypes.any.isRequired,
    spottsSubscribed: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired,
    trendingTopics: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.handleResize = ::this.handleResize;
    this.loadData = ::this.loadData;
    this.loadMore = ::this.loadMore;
    this.loadMoreVisibility = ::this.loadMoreVisibility;
    this.state = {
      width: 280
    };
  }

  componentDidMount () {
    this.loadData(this.props);
    this.props.loadTrendingTopics();
    window.addEventListener('resize', this.handleResize);
    this.getWidth();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
      this.loadData(nextProps);
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  loadData (props) {
    const { spotts, spottsSubscribed, spottsPromoted, isAuthenticated } = props;
    const pages = {
      spottsPage: spotts.get('page', 0),
      spottsSubscribedPage: spottsSubscribed.get('page', 0),
      spottsPromotedPage: spottsPromoted.get('page', 0)
    };
    this.props.loadSpottsList(Boolean(isAuthenticated), pages);
  }

  handleResize () {
    this.getWidth();
  }

  getWidth () {
    if (this.cardsContainer) {
      if (window.outerWidth <= 640 && window.outerWidth > 425) {
        this.setState({ width: (this.cardsContainer.clientWidth - 64) / 2 });
      } else if (window.outerWidth <= 425) {
        this.setState({ width: (this.cardsContainer.clientWidth - 32) / 2 });
      } else {
        this.setState({ width: 280 });
      }
    }
  }

  loadMore () {
    const { spotts: s, spottsSubscribed: ss, spottsPromoted: sp } = this.props;
    const pages = {
      spottsPage: s.get('page', -1) + 1 < s.get('pageCount') ? s.get('page', -1) + 1 : -1,
      spottsSubscribedPage: ss.get('page', -1) + 1 < ss.get('pageCount') ? ss.get('page', -1) + 1 : -1,
      spottsPromotedPage: sp.get('page', -1) + 1 < sp.get('pageCount') ? sp.get('page', -1) + 1 : -1
    };
    this.props.loadSpottsList(Boolean(this.props.isAuthenticated), pages);
  }

  loadMoreVisibility () {
    const { spotts: s, spottsSubscribed: ss } = this.props;
    if (s.get('data').size && s.get('_status') !== FETCHING && s.get('page') + 1 < s.get('pageCount')) {
      return true;
    }
    if (ss.get('data').size && ss.get('_status') !== FETCHING && ss.get('page') + 1 < ss.get('pageCount')) {
      return true;
    }
    return false;
  }

  render () {
    const { trendingTopics, location, feedSpotts } = this.props;
    const { width } = this.state;
    return (
      <section styleName='wrapper'>
        <div styleName='topics responsive-container'>
          <div styleName='topics-content'>
            <div styleName='topics-title'>Trending Topics</div>
            <Topics items={trendingTopics} />
          </div>
        </div>
        <div styleName='cards responsive-container'>
          <div ref={(ref) => { this.cardsContainer = ref; }} styleName='cards-wrapper'>
            <Masonry disableImagesLoaded options={{ transitionDuration: 100, isFitWidth: true, horizontalOrder: true }}>
              {feedSpotts.map((item, index) =>
                <div key={`home_card_${index}_${item.get('uuid')}`} styleName='card-selector'>
                  <Card item={item} key={`home_card_${index}_${item.get('uuid')}`} location={location} spottId={item.get('uuid')} width={width}/>
                </div>
              )}
            </Masonry>
          </div>
        </div>
        {this.loadMoreVisibility() && <div styleName='load-more responsive-element' onClick={this.loadMore}>Load more...</div>}
      </section>
    );
  }
}

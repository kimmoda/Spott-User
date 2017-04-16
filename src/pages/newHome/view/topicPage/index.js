/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DropdownMenu, { DropdownNested, DropdownDivider } from '../dropdownMenu';
import localized from '../../../_common/localized';
import Topics from '../topics';
import Cards from '../cards';
import { IconForward, IconArrow3 } from '../icons';
import * as actions from '../../actions';
import { topicDetailsSelector } from '../../selectors';

const styles = require('./index.scss');
const { cssHeaderHeight } = require('../vars.scss');

@localized
@connect(topicDetailsSelector, (dispatch) => ({
  loadTopicDetails: bindActionCreators(actions.loadTopicDetails, dispatch),
  removeTopicSubscriber: bindActionCreators(actions.removeTopicSubscriber, dispatch),
  setTopicSubscriber: bindActionCreators(actions.setTopicSubscriber, dispatch)
}))
@CSSModules(styles, { allowMultiple: true })
export default class NewTopic extends Component {
  static propTypes = {
    loadTopicDetails: PropTypes.func.isRequired,
    params: PropTypes.shape({
      topicId: PropTypes.string.isRequired
    }),
    removeTopicSubscriber: PropTypes.func.isRequired,
    setTopicSubscriber: PropTypes.func.isRequired,
    topic: PropTypes.any.isRequired,
    topicRelated: PropTypes.any.isRequired,
    topicSpotts: PropTypes.any.isRequired
  };

  constructor (props) {
    super(props);
    this.handleScroll = ::this.handleScroll;
    this.onFilterClick = ::this.onFilterClick;
    this.onFilterSecondClick = ::this.onFilterSecondClick;
    this.state = {
      isScrolledToInfo: false,
      filterVal: 'Everything',
      filterVals: [ 'Test 1', 'Test 2', 'Test 3' ],
      filterSecondVal: 'Popular',
      filterSecondVals: [ 'Test 3', 'Test 4', 'Test 5' ]
    };
    this.headerHeight = parseInt(cssHeaderHeight, 10);
    this.infoContainerOffsetTop = null;
    this.infoContainerHeight = null;
    this.isScrolledToInfo = false;
  }

  componentWillMount () {
    this.props.loadTopicDetails({ uuid: this.props.params.topicId });
  }

  componentDidMount () {
    this.infoContainerOffsetTop = this.infoContainer.offsetTop;
    this.infoContainerHeight = this.infoContainer.clientHeight;
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps (nextProps) {
    const { topicId } = this.props.params;
    const { topicId: nextTopicId } = nextProps.params;
    if (topicId !== nextTopicId) {
      this.props.loadTopicDetails({ uuid: nextTopicId });
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    this.setState({
      isScrolledToInfo: this.infoContainerOffsetTop <= window.scrollY + this.headerHeight + 30
    });
  }

  onFilterClick (e) {
    this.setState({
      filterVals: this.state.filterVals.filter((item) => item !== e.target.innerText).concat(this.state.filterVal),
      filterVal: e.target.innerText
    });
  }

  onFilterSecondClick (e) {
    this.setState({
      filterSecondVals: this.state.filterSecondVals.filter((item) => item !== e.target.innerText).concat(this.state.filterSecondVal),
      filterSecondVal: e.target.innerText
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
    const { topic, topicRelated, topicSpotts } = this.props;
    const { isScrolledToInfo, filterVal, filterVals, filterSecondVal, filterSecondVals } = this.state;

    return (
      <section styleName='wrapper'>
        <div styleName='poster'/>
        <div style={{ height: this.infoContainerHeight }} styleName='info-wrapper'>
          <div className={isScrolledToInfo && styles['info-sticky']} ref={(ref) => { this.infoContainer = ref; }} styleName='info'>
            <div styleName='info-content'>
              <div styleName='info-left'>
                <div style={{ backgroundImage: `url('${topic.getIn([ 'profileImage', 'url' ])}?width=48&height=72')` }} styleName='info-image'/>
                <div styleName='info-header'>
                  <h2 styleName='info-title'>{topic.get('text')}</h2>
                  <div styleName='info-type'>{topic.get('sourceType')}</div>
                </div>
              </div>
              <div styleName='info-subscribers'>
                <div styleName='info-subscribers-count'>{topic.get('subscriberCount')}</div>
                <div styleName='info-subscribers-text'>Subscribers</div>
              </div>
              <div
                className={topic.get('subscribed') && styles['info-subscribe-btn-subscribed']}
                styleName='info-subscribe-btn'
                onClick={this.onSubscribeClick.bind(this, topic.get('uuid'), topic.get('subscribed'))}>
                {topic.get('subscribed') ? 'Subscribed' : 'Subscribe'}
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
        <div styleName='topics'>
          <div styleName='topics-content'>
            <div styleName='topics-title'>Related Topics</div>
            <Topics items={topicRelated} />
          </div>
        </div>
        <div styleName='cards-filters-container'>
          <div styleName='cards-filters'>
            <div styleName='cards-filter'>
              <DropdownMenu trigger={<div className={styles['cards-filter-trigger']}><div>{filterVal}</div><i><IconArrow3/></i></div>}>
                {filterVals.map((item, index) =>
                  <div key={`filter1_${index}`} onClick={this.onFilterClick}>{item}</div>
                )}
                <DropdownDivider/>
                <DropdownNested triggerText='Nested menu'>
                  <div>Nested menu item</div>
                  <div>Nested menu item 2</div>
                </DropdownNested>
              </DropdownMenu>
            </div>
            <div styleName='cards-filter'>
              <DropdownMenu trigger={<div className={styles['cards-filter-trigger']}><div>{filterSecondVal}</div><i><IconArrow3/></i></div>}>
                {filterSecondVals.map((item, index) =>
                  <div key={`filter2_${index}`} onClick={this.onFilterSecondClick}>{item}</div>
                )}
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div styleName='cards'>
          <Cards items={topicSpotts}/>
        </div>
      </section>
    );
  }
}

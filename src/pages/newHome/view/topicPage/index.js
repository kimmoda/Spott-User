/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Dropdown from '../dropdown';
import localized from '../../../_common/localized';
import Topics from '../topics';
import Cards from '../cards';
import { IconForward } from '../icons';

const styles = require('./index.scss');
const { cssHeaderHeight } = require('../vars.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class NewTopic extends Component {

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
    this.infoImage = 'https://spott-ios-rest-prd.appiness.mobi/spott/rest/v003/image/images/5b447383-ed89-40e7-a71a-a19788a00406?height=72&width=48';
    this.headerHeight = parseInt(cssHeaderHeight, 10);
    this.infoContainerOffsetTop = null;
    this.infoContainerHeight = null;
    this.isScrolledToInfo = false;
  }

  componentDidMount () {
    this.infoContainerOffsetTop = this.infoContainer.offsetTop;
    this.infoContainerHeight = this.infoContainer.clientHeight;
    window.addEventListener('scroll', this.handleScroll);
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

  render () {
    const { isScrolledToInfo, filterVal, filterVals, filterSecondVal, filterSecondVals } = this.state;

    return (
      <section styleName='wrapper'>
        <div styleName='poster'/>
        <div style={{ height: this.infoContainerHeight }} styleName='info-wrapper'>
          <div className={isScrolledToInfo && styles['info-sticky']} ref={(ref) => { this.infoContainer = ref; }} styleName='info'>
            <div styleName='info-content'>
              <div styleName='info-left'>
                <div style={{ backgroundImage: `url('${this.infoImage}')` }} styleName='info-image'/>
                <div styleName='info-header'>
                  <h2 styleName='info-title'>Suits</h2>
                  <div styleName='info-type'>Tv Series</div>
                </div>
              </div>
              <div styleName='info-subscribers'>
                <div styleName='info-subscribers-count'>856</div>
                <div styleName='info-subscribers-text'>Subscribers</div>
              </div>
              <div styleName='info-subscribe-btn'>Subscribed</div>
              <div styleName='info-share'>
                <i><IconForward/></i>
              </div>
            </div>
          </div>
        </div>
        <div styleName='topics'>
          <div styleName='topics-content'>
            <div styleName='topics-title'>Related Topics</div>
            <Topics />
          </div>
        </div>
        <div styleName='cards-filters-container'>
          <div styleName='cards-filters'>
            <Dropdown triggerText={filterVal}>
              {filterVals.map((item, index) =>
                <div key={`filter1_${index}`} onClick={this.onFilterClick}>{item}</div>
              )}
            </Dropdown>
            <Dropdown triggerText={filterSecondVal}>
              {filterSecondVals.map((item, index) =>
                <div key={`filter2_${index}`} onClick={this.onFilterSecondClick}>{item}</div>
              )}
            </Dropdown>
          </div>
        </div>
        <Cards/>
      </section>
    );
  }
}

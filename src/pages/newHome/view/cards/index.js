/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Masonry from 'react-masonry-component';
import VisibilitySensor from 'react-visibility-sensor';
import localized from '../../../_common/localized';
import Card from '../card';
import { FETCHING, LOADED } from '../../../../data/statusTypes';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Cards extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadMore: PropTypes.func,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    spotts: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.handleResize = ::this.handleResize;
    this.handleLayoutComplete = ::this.handleLayoutComplete;
    this.loadOnScroll = ::this.loadOnScroll;
    this.state = {
      cardWidth: 280,
      cardCount: 0
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize);
    this.getWidth();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize () {
    this.getWidth();
  }

  getWidth () {
    if (this.cardsWrapper) {
      if (window.outerWidth <= 640 && window.outerWidth > 425) {
        this.setState({ cardWidth: (this.cardsWrapper.clientWidth - 64) / 2 });
      } else if (window.outerWidth <= 425) {
        this.setState({ cardWidth: (this.cardsWrapper.clientWidth - 32) / 2 });
      } else {
        this.setState({ cardWidth: 280 });
      }
    }
  }

  handleLayoutComplete (laidOutItems) {
    if (this.state.cardCount !== laidOutItems.length) {
      this.setState({ cardCount: laidOutItems.length });
    }
  }

  loadOnScroll (isVisible) {
    const { spotts: s, loadMore } = this.props;
    if (isVisible && (s.get('data').size && s.get('_status') === LOADED)) {
      loadMore(s.get('page') + 1);
    }
  }

  render () {
    const { spotts, location, params } = this.props;
    const { cardWidth, cardCount } = this.state;

    return (
      <div ref={(ref) => { this.cardsWrapper = ref; }} styleName='cards-wrapper' >
        <Masonry className={cardCount < 4 && cardWidth === 280 && styles['left-align']} disableImagesLoaded options={{ isFitWidth: true }} ref={(ref) => { this.cardsContainer = ref; }} styleName='cards-container'
          onLayoutComplete={(laidOutItems) => this.handleLayoutComplete(laidOutItems)}>
          {spotts.get('data') && spotts.get('data').valueSeq().map((item, index) =>
          <div key={`home_card_${item.get('uuid')}_${index}`} styleName='card-selector'>
            <Card
              item={item}
              key={`home_card_${item.get('uuid')}_${index}`}
              location={location}
              params={params}
              spottId={item.get('uuid')}
              width={cardWidth} />
          </div>
          )}
        </Masonry>
        {Boolean(spotts.get('_status') !== FETCHING && spotts.get('totalResultCount') &&
          spotts.get('totalResultCount') > spotts.get('pageSize') &&
          spotts.get('page') + 1 !== spotts.get('pageCount')) &&
          <VisibilitySensor delayedCall intervalDelay={500} onChange={this.loadOnScroll}/>
        }
      </div>
    );
  }
}

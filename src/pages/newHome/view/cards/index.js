/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Masonry from 'react-masonry-component';
import localized from '../../../_common/localized';
import Card from '../card';
import { FETCHING } from '../../../../data/statusTypes';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class Cards extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadMore: PropTypes.func,
    location: PropTypes.object.isRequired,
    spotts: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      width: 280
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.getWidth();
  }

  handleResize () {
    this.getWidth();
  }

  getWidth () {
    if (this.cardsContainer) {
      if (window.outerWidth <= 640 && window.outerWidth > 425) {
        console.log('step1', this.cardsContainer);
        this.setState({ width: (this.cardsContainer.clientWidth - 64) / 2 });
      } else if (window.outerWidth <= 425) {
        console.log('step2', this.cardsContainer);
        this.setState({ width: (this.cardsContainer.clientWidth - 32) / 2 });
      } else {
        this.setState({ width: 280 });
      }
    }
  }

  render () {
    const { spotts, loadMore, location } = this.props;
    const { width } = this.state;

    return (
      <div ref={(ref) => { this.cardsContainer = ref; }} styleName='cards-wrapper' >
        <Masonry disableImagesLoaded options={{ transitionDuration: 100, isFitWidth: true }}>
          {spotts.get('data') && spotts.get('data').valueSeq().map((item, index) =>
          <div key={`home_card_${item.get('uuid')}_${index}`} styleName='card-selector'><Card item={item} key={`home_card_${item.get('uuid')}_${index}`} location={location} spottId={item.get('uuid')} width={width} /></div>
          )}
        </Masonry>
        {Boolean(spotts.get('_status') !== FETCHING && spotts.get('totalResultCount') &&
          spotts.get('totalResultCount') > spotts.get('pageSize') &&
          spotts.get('page') + 1 !== spotts.get('pageCount')) &&
          <div styleName='load-more' onClick={loadMore.bind(this, spotts.get('page') + 1)}>Load more...</div>
        }
      </div>
    );
  }
}

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

  render () {
    const { spotts, loadMore, location } = this.props;

    return (
      <div>
        <Masonry disableImagesLoaded options={{ transitionDuration: 100, isFitWidth: true, gutter: 32 }}>
          {spotts.get('data') && spotts.get('data').valueSeq().map((item, index) =>
            <Card item={item} key={`home_card_${item.get('uuid')}_${index}`} location={location} spottId={item.get('uuid')} />
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

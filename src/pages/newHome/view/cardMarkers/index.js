/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';
import { formatPrice } from '../../../_common/buildingBlocks';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class CardMarkers extends Component {
  static propTypes = {
    markers: PropTypes.any,
    t: PropTypes.func.isRequired,
    onImageClick: PropTypes.func,
    onMarkerClick: PropTypes.func
  };

  render () {
    const { markers, onImageClick, onMarkerClick } = this.props;

    return (
    <div styleName='markers-wrapper'>
      <div styleName='markers-overlay' onClick={onImageClick}/>
      <div styleName='markers'>
        {markers && markers.map((item, index) =>
          <div
            key={`marker_${index}`}
            style={{ top: item.getIn([ 'point', 'y' ]), left: item.getIn([ 'point', 'x' ]) }}
            styleName='marker'
            onClick={onMarkerClick}>
            <div styleName='marker-wrapper'>
              <div styleName='marker-content'>
                <div style={{ backgroundImage: `url('${item.getIn([ 'product', 'image', 'url' ])}?width=48&height=48')` }} styleName='marker-image'/>
                <div styleName='marker-right'>
                  <div styleName='marker-title'>Match indication</div>
                  <div styleName='marker-name'>{item.getIn([ 'product', 'shortName' ])}</div>
                  <div styleName='marker-price'>{formatPrice(item.getIn([ 'product', 'price' ]))}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  }
}

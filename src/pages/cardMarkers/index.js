/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../_common/localized';
import { formatPrice } from '../_common/buildingBlocks';

const styles = require('./index.scss');

@CSSModules(styles, { allowMultiple: true })
export default class CardMarkers extends Component {
  static propTypes = {
    markers: PropTypes.any.isRequired,
    onMarkerClick: PropTypes.func
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { markers, onMarkerClick } = this.props;
    return (
    <div styleName='markers-wrapper'>
      <div styleName='markers-overlay'/>
      <div styleName='markers'>
        {markers && markers.filter((item) => { return item.has('point'); }).map((item, index) =>
          <CardMarker item={item} key={`marker_${index}`} onMarkerClick={onMarkerClick}/>
        )}
      </div>
    </div>
    );
  }
}

@localized
@CSSModules(styles, { allowMultiple: true })
class CardMarker extends Component {
  static propTypes = {
    item: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired,
    onMarkerClick: PropTypes.func
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { onMarkerClick, t, item } = this.props;
    return (
      <div
        style={{ top: `${item.getIn([ 'point', 'y' ])}%`, left: `${item.getIn([ 'point', 'x' ])}%` }}
        styleName='marker'
        onClick={(e) => onMarkerClick(item, e)}>
        <div styleName='marker-wrapper'>
          <div styleName='marker-content'>
            <div style={{ backgroundImage: `url('${item.getIn([ 'product', 'image', 'url' ])}?width=80&height=80')` }} styleName='marker-image'/>
            <div styleName='marker-right'>
              <div className={item.get('relevance') === 'EXACT' ? styles['marker-rel-exact'] : styles['marker-rel-medium']}
                styleName='marker-rel'>
                {t(`relevance.${item.get('relevance')}`)}
              </div>
              <div styleName='marker-name'>{item.getIn([ 'product', 'shortName' ])}</div>
              <div styleName='marker-price'>{formatPrice(item.getIn([ 'product', 'price' ]))}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

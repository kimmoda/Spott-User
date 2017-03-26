/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class CardMarkers extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onImageClick: PropTypes.func,
    onMarkerClick: PropTypes.func
  };

  render () {
    const { onImageClick, onMarkerClick } = this.props;

    return (
    <div styleName='markers-wrapper'>
      <div styleName='markers-overlay' onClick={onImageClick}/>
      <div styleName='markers'>
        {new Array(5).fill(1).map((item, index) =>
          <div key={`marker_${index}`} styleName='marker' onClick={onMarkerClick}>
            <div styleName='marker-wrapper'>
              <div styleName='marker-content'>
                <div styleName='marker-image'/>
                <div styleName='marker-right'>
                  <div styleName='marker-title'>Match indication</div>
                  <div styleName='marker-name'>Product short name</div>
                  <div styleName='marker-price'>$0.0</div>
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

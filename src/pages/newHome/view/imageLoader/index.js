/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class ImageLoader extends Component {

  static propTypes = {
    autoHeight: PropTypes.string,
    imgOriginal: PropTypes.object.isRequired,
    imgThumb: PropTypes.object,
    width: PropTypes.number.isRequired,
    widthThumb: PropTypes.number
  };

  constructor (props) {
    super(props);
    this.onImageLoaded = ::this.onImageLoaded;
    this.state = {
      loaded: false
    };
  }

  onImageLoaded () {
    this.setState({
      loaded: true
    });
  }

  render () {
    const { imgThumb, imgOriginal, width, widthThumb, autoHeight } = this.props;

    return (
      <div
        className={this.state.loaded && styles['image-loaded']}
        style={{ height: autoHeight ? 'auto' : imgOriginal.getIn([ 'dimension', 'height' ]) * (width / imgOriginal.getIn([ 'dimension', 'width' ])) }}
        styleName='image'>
        {imgThumb &&
        <img
          height={autoHeight ? 'auto' : imgThumb.getIn([ 'dimension', 'height' ]) * (width / imgThumb.getIn([ 'dimension', 'width' ]))}
          src={`${imgThumb.get('url')}?width=${widthThumb || width}`}
          styleName='image-thumb'/>}
        {imgOriginal &&
        <img
          height={autoHeight ? 'auto' : imgOriginal.getIn([ 'dimension', 'height' ]) * (width / imgOriginal.getIn([ 'dimension', 'width' ]))}
          src={`${imgOriginal.get('url')}?width=${width}`}
          styleName='image-original'
          onLoad={this.onImageLoaded}/>}
      </div>
    );
  }
}

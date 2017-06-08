/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class ImageLoader extends Component {

  static propTypes = {
    height: PropTypes.number.isRequired,
    heightThumb: PropTypes.number,
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
    const { imgThumb, imgOriginal, width, height, heightThumb, widthThumb } = this.props;
    const imageWidth = parseInt(width, 10);

    return (
      <div
        className={this.state.loaded && styles['image-loaded']}
        style={{ height: imgOriginal.getIn([ 'dimension', 'height' ]) * (width / imgOriginal.getIn([ 'dimension', 'width' ])) }}
        styleName='image'>
        {imgThumb &&
        <img
          src={`${imgThumb.get('url')}?width=${widthThumb || imageWidth}&height=${heightThumb || height}`}
          style={{ height: imgThumb.getIn([ 'dimension', 'height' ]) * (width / imgThumb.getIn([ 'dimension', 'width' ])) }}
          styleName='image-thumb'/>}
        {imgOriginal &&
        <img
          src={`${imgOriginal.get('url')}?width=${imageWidth}&height=${height}`}
          style={{ height: imgOriginal.getIn([ 'dimension', 'height' ]) * (width / imgOriginal.getIn([ 'dimension', 'width' ])) }}
          styleName='image-original'
          onLoad={this.onImageLoaded}/>}
      </div>
    );
  }
}

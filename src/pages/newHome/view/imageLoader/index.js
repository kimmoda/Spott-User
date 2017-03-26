/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import localized from '../../../_common/localized';

const styles = require('./index.scss');

@localized
@CSSModules(styles, { allowMultiple: true })
export default class ImageLoader extends Component {

  static propTypes = {
    srcOriginal: PropTypes.string.isRequired,
    srcThumb: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.onImageLoaded = ::this.onImageLoaded;
    this.state = {
      loaded: false
    };
  }

  onImageLoaded () {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 1000);
  }

  render () {
    const { srcThumb, srcOriginal } = this.props;
    return (
      <div className={this.state.loaded && styles['image-loaded']} styleName='image'>
        <img
          src={srcThumb}
          styleName='image-thumb'/>
        <img
          src={srcOriginal}
          styleName='image-original'
          onLoad={this.onImageLoaded}/>
      </div>
    );
  }
}

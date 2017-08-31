import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { IconFacebook, IconTwitter, IconPinterest } from '../../icons';
const styles = require('./index.scss');

@CSSModules(styles, { allowMultiple: true })
export default class ShareWidget extends Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    shareUrl: PropTypes.string,
    title: PropTypes.string
  }

  shareFacebook (event) {
    event.preventDefault();
    const { shareUrl, title } = this.props;
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&title=${title}`, 'name', 'width=600,height=400');
  }

  shareTwitter (event) {
    event.preventDefault();
    const { shareUrl } = this.props;
    window.open(`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}`, 'name', 'width=600, height=400');
  }

  sharePinterest (event) {
    event.preventDefault();
    const { imageUrl, shareUrl, title } = this.props;
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&amp;media=${encodeURIComponent(imageUrl)}&amp;description=${title}`, '', 'width=600,height=400');
  }

  render () {
    return (
      <div styleName='icons-container'>
        <div styleName='icon-container icon-facebook' onClick={(event) => this.shareFacebook(event)}>
          <i><IconFacebook/></i>
        </div>
        <div styleName='icon-container icon-pinterest' onClick={(event) => this.sharePinterest(event)}>
          <i><IconPinterest/></i>
        </div>
        <div styleName='icon-container icon-twitter' onClick={(event) => this.shareTwitter(event)}>
          <i><IconTwitter/></i>
        </div>
      </div>
    );
  }
}

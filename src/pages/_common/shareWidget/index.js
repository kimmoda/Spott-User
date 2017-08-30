import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { IconFacebook, IconTwitter, IconPinterest } from '../../icons';
const styles = require('./index.scss');

@CSSModules(styles, { allowMultiple: true })
export default class ShareWidget extends Component {
  static propTypes = {
    onShareFacebook: PropTypes.func,
    onSharePinterest: PropTypes.func,
    onShareTwitter: PropTypes.func
  }

  render () {
    const { onShareFacebook, onSharePinterest, onShareTwitter } = this.props;
    return (
      <div styleName='icons-container'>
        <div styleName='icon-container icon-facebook' onClick={onShareFacebook}>
          <i><IconFacebook/></i>
        </div>
        <div styleName='icon-container icon-pinterest' onClick={onSharePinterest}>
          <i><IconPinterest/></i>
        </div>
        <div styleName='icon-container icon-twitter' onClick={onShareTwitter}>
          <i><IconTwitter/></i>
        </div>
      </div>
    );
  }
}

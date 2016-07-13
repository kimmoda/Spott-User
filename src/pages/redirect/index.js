import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import localized from '../_common/localized';
import { mediaQueries } from '../_common/buildingBlocks';
import DownloadAppButtons, { androidUrl, iosUrl, isIos, isAndroid } from '../_common/downloadAppButtons';
const rippleGifImage = require('./ripple.gif');

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    // Compensate footer
    bottom: '6.3em',
    // Compensate header
    top: '4.78125em',
    [mediaQueries.small]: {
      bottom: '6em'
    },
    [mediaQueries.medium]: {
      bottom: '3em'
    },
    [mediaQueries.large]: {
      top: '5.55469em'
    }
  },
  container: {
    textAlign: 'center'
  },
  ripple: {
    width: '9.375em',
    paddingBottom: '2em'
  }
};
@localized
@Radium
class Redirect extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (isIos()) {
      setTimeout(() => window.location.replace(iosUrl), 2000);
    } else if (isAndroid()) {
      setTimeout(() => window.location.replace(androidUrl), 2000);
    }
  }

  render () {
    const { t } = this.props;
    return (
      <section style={styles.wrapper}>
        <div style={styles.container}>
          <img src={rippleGifImage} style={styles.ripple}/>
          {(isIos() || isAndroid()) &&
            <p>{t('redirect.redirecting')}</p>}
          {!isIos() && !isAndroid() &&
            <DownloadAppButtons />}
        </div>
      </section>
    );
  }

}

export default Redirect;

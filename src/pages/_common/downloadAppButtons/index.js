import Radium from 'radium';
import React, { PropTypes } from 'react';
import { mediaQueries } from '../buildingBlocks';

const styles = {
  button: {
    display: 'inline-block'
  },
  buttonImage: {
    base: {
      height: '2.5em',
      [mediaQueries.medium]: {
        height: '2.8125em'
      },
      [mediaQueries.large]: {
        height: '3.125em'
      }
    },
    first: {
      marginRight: '0.375em',
      [mediaQueries.medium]: {
        marginRight: '0.625em'
      }
    }
  }
};

// iOS

export const isIos = () => (
  window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i) || window.navigator.userAgent.match(/iPod/i)
);
export const iosImage = require('./appStore.svg');
export const iosUrl = 'https://itunes.apple.com/be/app/spott-screen-just-became-your/id1047568044?mt=8';
export const DownloadIosAppButton = Radium((props) => (
  <a href={iosUrl} style={styles.button}><img src={iosImage} {...props} style={[ styles.buttonImage.base, props.style ]} /></a>
));

// Android

export const isAndroid = () => (
  window.navigator.userAgent.match(/Android/i)
);
export const androidImage = require('./googlePlay.svg');
export const androidUrl = 'https://play.google.com/store/apps/details?id=mobi.appiness.spott';
export const DownloadAndroidAppButton = Radium((props) => (
  <a href={androidUrl} style={styles.button}><img src={androidImage} {...props} style={[ styles.buttonImage.base, props.style ]} /></a>
));

// Component showing buttons for iOS and Android

export default function DownloadAppButtons (props) {
  return (
    <div {...props}>
      <DownloadIosAppButton className={props.buttonClassName} style={[ styles.buttonImage.first, props.buttonStyle ]} />
      <DownloadAndroidAppButton className={props.buttonClassName} style={props.buttonStyle} />
    </div>
  );
}
DownloadAppButtons.propTypes = {
  buttonClassName: PropTypes.string,
  buttonStyle: PropTypes.object,
  style: PropTypes.object
};

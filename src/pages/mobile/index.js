import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { colors, makeTextStyle } from '../_common/buildingBlocks';
import { isAndroid, isIos, DownloadIosAppButton, DownloadAndroidAppButton } from '../_common/downloadAppButtons';

const spottLogo = require('../app/view/spott.svg');

@connect(null, (dispatch) => ({
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@Radium
export default class MobileDownload extends Component {

  static propTypes = {
    location: PropTypes.object,
    routerPush: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onClose = ::this.onClose;
  }

  componentWillMount () {
    // If the user has no Android or Ios device, go to home page.
    if (!isIos() && !isAndroid()) {
      this.props.routerPush('/');
    }
  }

  onClose () {
    this.props.routerPush((this.props.location.state && this.props.location.state.returnTo) || '/');
  }

  static styles = {
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '3.143em',
      backgroundColor: colors.white
    },
    logo: {
      verticalAlign: 'center',
      height: '2em'
    },
    content: {
      padding: '1.5em',
      backgroundColor: colors.whiteGray,
      height: '100%',
      width: '100%',
      textAlign: 'center'
    },
    title: {
      ...makeTextStyle(null, '1.857em', '0.024em'),
      paddingTop: '4.6em',
      color: colors.cool,
      opacity: 0.7
    },
    download: {
      ...makeTextStyle(null, '1em', '0.021em'),
      color: colors.cool,
      opacity: 0.5
    },
    downloadPadding: {
      paddingTop: '2.571em'
    },
    downloadButton: {
      height: '2.8em'
    },
    desktop: {
      ...makeTextStyle(null, '1em', '0.019em'),
      paddingTop: '10.314em',
      color: colors.darkPink,
      textDecoration: 'underline'
    }
  }

  render () {
    const { styles } = this.constructor;
    console.log(this.props.location);
    return (
      <div style={styles.container}>
        <div style={styles.header}><img src={spottLogo} style={styles.logo}/></div>
        <div style={styles.content}>
          <div style={styles.title}>Spott is now available on { isIos() && 'the App Store' }{ isAndroid() && 'the Play Store' }</div>
          <div style={styles.downloadPadding}>
            <h3 style={styles.download}>Download the app</h3>
          </div>
          <div style={{ paddingTop: '1.5em' }}>
            { isIos() && <DownloadIosAppButton style={styles.downloadButton}/>}
            { isAndroid() && <DownloadAndroidAppButton style={styles.downloadButton}/>}
          </div>
          <div style={styles.desktop} onClick={this.onClose}>or visit to the desktop version</div>
        </div>
      </div>
    );
  }
}

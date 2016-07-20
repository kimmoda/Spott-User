import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
// import { fromJS } from 'immutable'; // TODO: remove after API is implemented
import { colors, mediaQueries, Button, UpperCaseSubtitle, SectionTitle, Title, Container, pinkButtonStyle } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../../_common/localized';
import DownloadAppButtons, { iosUrl, isIos, androidUrl, isAndroid } from '../../../_common/downloadAppButtons';

const spottImage = require('./images/spott.jpg');
const deviceImage = require('./images/device.png');

@localized
@Radium
export default class DownloadApp extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  static styles = {
    button: {
      position: 'relative'
    },
    wrapper: {
      backgroundColor: colors.white,
      paddingTop: '6.25em',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      position: 'relative',
      textAlign: 'center',
      [mediaQueries.medium]: {
        paddingBottom: '11em',
        textAlign: 'left'
      }
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundImage: 'linear-gradient(rgba(220, 220, 220, 0.8), rgba(255, 255, 255, 0.95))',
      // backgroundImage: 'linear-gradient(to bottom, #000000, rgb(255, 255, 255))',
      pointerEvents: 'none' // Don't capture pointer events. "Click through..."
    },
    title: {
      marginBottom: '0.17em'
    },
    subtitle: {
      opacity: 0.5
    },
    upperCaseSubtitle: {
      marginBottom: '1.635em'
    },
    innerWrapper: {
      position: 'relative'
    },
    fontWrapper: {
      fontSize: '12px',
      [mediaQueries.small]: {
        fontSize: '14px'
      },
      [mediaQueries.medium]: {
        fontSize: '16px'
      }
    },
    deviceWrapper: {
      display: 'block',
      height: 'auto',
      // right: 0,
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
      paddingTop: '1.875em',
      [mediaQueries.small]: {
        width: '60%',
        maxWidth: 360
      },
      [mediaQueries.medium]: {
        paddingTop: 0,
        position: 'absolute',
        width: '60%',
        marginLeft: 'inherit',
        marginRight: 'inherit',
        left: 'inherit',
        right: 0,
        bottom: 0
      },
      [mediaQueries.large]: {
        width: '40%',
        maxWidth: 600
      }
    },
    device: {
      display: 'block',
      width: '100%',
      userSelect: 'none'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    return (
      <div style={{ ...styles.wrapper, backgroundImage: `url("${spottImage}")` }}>
        <Container>
          <div style={styles.overlay}></div>
          <div style={styles.innerWrapper}>
            <div style={styles.fontWrapper}>
              <Title style={styles.title}>{t('home.downloadApp.title')}</Title>
              <SectionTitle style={styles.subtitle}>{t('home.downloadApp.subtitle')}</SectionTitle>
              <UpperCaseSubtitle style={styles.upperCaseSubtitle}>{t('home.downloadApp.availability')}</UpperCaseSubtitle>
            </div>
            {(() => {
              // IOS or Android?
              if (isIos()) {
                return <Button href={iosUrl} style={{ ...pinkButtonStyle, ...styles.button }}>{t('home.downloadApp.downloadButton')}</Button>;
              } else if (isAndroid()) {
                return <Button href={androidUrl} style={{ ...pinkButtonStyle, ...styles.button }}>{t('home.downloadApp.downloadButton')}</Button>;
              }
              // Non-mobile
              return <DownloadAppButtons style={styles.button} />;
            })()}
          </div>
          <div style={styles.deviceWrapper}>
            <img src={deviceImage} style={styles.device} />
          </div>
        </Container>
      </div>
    );
  }

}

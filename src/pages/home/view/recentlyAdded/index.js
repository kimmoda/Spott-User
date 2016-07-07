import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Button, colors, Title, UpperCaseSubtitle, SectionTitle, ScalableContainer, pinkButtonStyle } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import SeriesTiles from '../../../_common/tiles/seriesTiles';
import localized from '../../../_common/localized';

const xFilesImage = require('./images/x-files.jpg');

@localized
@Radium
export default class RecentlyAdded extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired
  }

  static styles = {
    button: {
      marginBottom: '5.45em',
      position: 'relative'
    },
    container: {
      backgroundColor: colors.white,
      backgroundSize: 'cover',
      position: 'relative',
      paddingTop: '2.5em',
      paddingBottom: 0
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      opacity: 0.5,
      backgroundImage: 'linear-gradient(to bottom, #000000, rgb(255, 255, 255))',
      pointerEvents: 'none' // Don't capture pointer events. "Click through..."
    },
    title: {
      color: 'white',
      marginBottom: '0.17em'
    },
    subtitle: {
      color: 'white'
    },
    upperCaseSubtitle: {
      color: 'white',
      marginBottom: '2.725em'
    },
    tiles: {
      marginTop: '-3em',
      transform: 'translateY(3em)'
    },
    wrapper: {
      position: 'relative'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    return (
      <ScalableContainer style={{ ...styles.container, backgroundImage: `url("${xFilesImage}")` }}>
        <div style={styles.overlay}></div>
        <div style={styles.wrapper}>
          <Title style={styles.title}>X-files</Title>
          <UpperCaseSubtitle style={styles.upperCaseSubtitle}>{t('home.recentlyAdded.highlight')}</UpperCaseSubtitle>
          <Button style={{ ...pinkButtonStyle, ...styles.button }}>{t('home.recentlyAdded.browseButton')}</Button>
          <SectionTitle style={styles.subtitle}>{t('home.recentlyAdded.title')}</SectionTitle>
        </div>
        <SeriesTiles style={styles.tiles}/>
      </ScalableContainer>
    );
  }

}

import React, { Component /* , PropTypes */ } from 'react';
import Radium from 'radium';
import { Button, colors, Title, UpperCaseSubtitle, SectionTitle, ScalableContainer, pinkButtonStyle } from '../../../_common/buildingBlocks';
// import { dummySelector } from '../../selectors';
// import { dummy } from '../../actions';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import SeriesTiles from '../../../_common/tiles/seriesTiles';
const xFilesImage = require('./images/x-files.jpg');

@Radium
export default class RecentlyAdded extends Component {

  static styles = {
    button: {
      marginBottom: '5.45em',
      position: 'relative'
    },
    container: {
      backgroundColor: colors.white,
      paddingTop: '6.25em',
      backgroundSize: 'cover',
      position: 'relative'
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
      color: 'white',
      marginBottom: '1.304em'
    },
    upperCaseSubtitle: {
      color: 'white',
      marginBottom: '2.725em'
    },
    tiles: {
      transform: 'translateY(1.875em)'
    },
    wrapper: {
      position: 'relative'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <ScalableContainer style={{ ...styles.container, backgroundImage: `url("${xFilesImage}")` }}>
        <div style={styles.overlay}></div>
        <div style={styles.wrapper}>
          <Title style={styles.title}>X-files</Title>
          <UpperCaseSubtitle style={styles.upperCaseSubtitle}>Now available on Spott</UpperCaseSubtitle>
          <Button style={{ ...pinkButtonStyle, ...styles.button }}>Browse</Button>
          <SectionTitle style={styles.subtitle}>Recently added</SectionTitle>
        </div>
        <SeriesTiles />
      </ScalableContainer>
    );
  }

}

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Button, colors, Title, UpperCaseSubtitle, SectionTitle, Container, pinkButtonStyle } from '../../../_common/buildingBlocks';
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
    wrapper: {
      backgroundColor: colors.white,
      backgroundSize: 'cover',
      position: 'relative',
      paddingTop: '2.5em',
      paddingBottom: 0,
      marginBottom: '3em'
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
    innerWrapper: {
      position: 'relative'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { t } = this.props;
    return (
      <div style={{ ...styles.wrapper, backgroundImage: `url("${xFilesImage}")` }}>
        <Container>
          <div style={styles.overlay}></div>
          <div style={styles.innerWrapper}>
            <Title style={styles.title}>The X-files</Title>
            <UpperCaseSubtitle style={styles.upperCaseSubtitle}>{t('home.recentlyAdded.highlight')}</UpperCaseSubtitle>
            <Button style={{ ...pinkButtonStyle, ...styles.button }}>{t('home.recentlyAdded.browseButton')}</Button>
            <SectionTitle style={styles.subtitle}>{t('home.recentlyAdded.title')}</SectionTitle>
          </div>
          <SeriesTiles style={styles.tiles}/>
        </Container>
      </div>
    );
  }

}

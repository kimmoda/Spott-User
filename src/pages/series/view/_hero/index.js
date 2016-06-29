import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { colors, Container, fontWeights, makeTextStyle, Button, SectionTitle, Title, pinkButtonStyle } from '../../../_common/buildingBlocks';
import CharacterTiles from '../../../_common/tiles/characterTiles';
const backgroundImage = require('./images/daredevil.jpg');

/* TODO: add id of the series */
@Radium
export default class Hero extends Component {

  static propTypes = {
    seriesId: PropTypes.string.isRequired
  };

  static styles = {
    background: {
      display: 'block',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      width: '100%',
      position: 'relative',
      top: 0
    },
    container: {
      paddingTop: '5.222em',
      position: 'relative'
    },
    mediaType: {
      ...makeTextStyle(fontWeights.bold, '0.688em', '0.219em'),
      color: 'white',
      opacity: 0.5,
      textTransform: 'uppercase',
      margin: 0
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      opacity: 0.5,
      backgroundImage: 'linear-gradient(to bottom, #000000, rgba(0, 0, 0, 0))',
      pointerEvents: 'none' // Don't capture pointer events. "Click through..."
    },
    title: {
      large: {
        color: 'white'
      },
      medium: {
        color: 'white',
        marginBottom: '0.927em'
      }
    },
    emph: {
      fontFamily: fontWeights.bold
    },
    followButton: {
      backgroundColor: 'transparent',
      marginBottom: '2.222em'
    },
    tab: {
      base: {
        ...makeTextStyle(fontWeights.bold, '0.75em', '0.237em'),
        backgroundColor: colors.dark,
        color: 'white',
        opacity: 0.5,
        paddingBottom: '1em',
        paddingTop: '1em',
        textDecoration: 'none',
        textAlign: 'center',
        minWidth: '12.5em',
        display: 'inline-block',
        borderBottomWidth: 4,
        borderBottomStyle: 'solid',
        borderBottomColor: colors.dark
      },
      active: {
        borderBottomColor: colors.darkPink,
        opacity: 1
      }
    },
    tabs: {
      position: 'relative',
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { seriesId } = this.props;

    return (
      <div style={styles.background}>
        <div style={styles.overlay} />
        <Container style={styles.container}>
          <h4 style={styles.mediaType}>Tv show</h4>
          <Title style={styles.title.large}>Daredevil</Title>
          <SectionTitle style={styles.title.medium}>Followers <span style={styles.emph}>825</span></SectionTitle>
          <Button style={[ pinkButtonStyle, styles.followButton ]}>Follow</Button>

          <CharacterTiles />

        </Container>
        <Container style={styles.tabs}>
          <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/overview`}>Overview</Link>
          <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/products`}>Products</Link>
          <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/scenes`}>Scenes</Link>
        </Container>
      </div>
    );
  }

}

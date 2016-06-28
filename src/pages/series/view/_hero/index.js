import React, { Component } from 'react';
import Radium from 'radium';
import { fromJS } from 'immutable';
import { fontWeights, makeTextStyle, Button, SectionTitle, Title, pinkButtonStyle, Tiles } from '../../../_common/buildingBlocks';
import CharacterTile from '../../../_common/tiles/characterTile';
const backgroundImage = require('./images/daredevil.jpg');

const characters = fromJS([ {
  image: require('./images/mattMurdock.jpg'),
  name: 'Matt Murdock Matt Murdock'
}, {
  image: require('./images/karenPage.jpg'),
  name: 'Karen Page'
}, {
  image: require('./images/foggy.jpg'),
  name: 'Foggy'
}, {
  image: require('./images/frankCastle.jpg'),
  name: 'Frank Castle'
}, {
  image: require('./images/elektra.jpg'),
  name: 'Elektra'
}, {
  image: require('./images/claireTemple.jpg'),
  name: 'Claire Temple'
}, {
  image: require('./images/mattMurdock.jpg'),
  name: 'Matt Murdock'
}, {
  image: require('./images/karenPage.jpg'),
  name: 'Karen Page'
}, {
  image: require('./images/foggy.jpg'),
  name: 'Foggy'
} ]);

/* TODO: add id of the series */
@Radium
export default class Hero extends Component {

  static styles = {
    background: {
      display: 'block',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      width: '100%',
      position: 'relative',
      top: 0,
      height: '46.8em'
    },
    container: {
      paddingLeft: '8.438em',
      paddingRight: '8.438em',
      paddingTop: '8.813em',
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
    tiles: {
      marginLeft: '-0.938em',
      marginRight: '-0.938em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    return (
      <div style={styles.background}>
        <div style={styles.overlay} />
        <div style={styles.container}>
          <h4 style={styles.mediaType}>Tv show</h4>
          <Title style={styles.title.large}>Daredevil</Title>
          <SectionTitle style={styles.title.medium}>Followers <span style={styles.emph}>825</span></SectionTitle>
          <Button style={[ pinkButtonStyle, styles.followButton ]}>Follow</Button>
          <Tiles
            horizontalSpacing='0.938em'
            items={characters}
            numColumns={{ small: 2, medium: 4, large: 5, extraLarge: 7 }}
            style={styles.tiles}
            tileRenderer={({ item, key, style }) => <CharacterTile item={item} key={key} style={style} />}
            verticalSpacing={0} />
        </div>
      </div>
    );
  }

}

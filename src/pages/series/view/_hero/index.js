import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { fromJS } from 'immutable';
import { colors, Container, fontWeights, makeTextStyle, Button, SectionTitle, Title, pinkButtonStyle, FadedTiles } from '../../../_common/buildingBlocks';
import CharacterTile from '../../../_common/tiles/characterTile';
import SmallEpisodeTile from '../../../_common/tiles/smallEpisodeTile';
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

const episodes = fromJS([ {
  image: require('./images/episodes/1.png'),
  name: 'Episode 1'
}, {
  image: require('./images/episodes/2.png'),
  name: 'Episode 2'
}, {
  image: require('./images/episodes/3.png'),
  name: 'Episode 3'
}, {
  image: require('./images/episodes/4.png'),
  name: 'Episode 4'
}, {
  image: require('./images/episodes/5.png'),
  name: 'Episode 5'
}, {
  image: require('./images/episodes/6.png'),
  name: 'Episode 6'
}, {
  image: require('./images/episodes/7.png'),
  name: 'Episode 7'
} ]);

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
    tiles: {
      marginBottom: '1.7em'
    },
    smallEpisodes: {
      paddingBottom: '1.7em'
    },
    tab: {
      base: {
        ...makeTextStyle(fontWeights.bold, '0.75em', '0.237em'),
        backgroundImage: 'linear-gradient(to top, #000000, rgba(0, 0, 0, 0))',
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
    season: {
      base: {
        ...makeTextStyle(fontWeights.bold, '0.75em', '0.237em'),
        backgroundImage: 'linear-gradient(to top, #000000, rgba(0, 0, 0, 0))',
        color: 'white',
        opacity: 0.5,
        paddingBottom: '1em',
        paddingTop: '1em',
        textDecoration: 'none',
        textAlign: 'center',
        minWidth: '12.5em',
        display: 'inline-block'
      },
      active: {
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
        </Container>
        <FadedTiles
          horizontalSpacing={0.833}
          items={characters}
          numColumns={{ extraSmall: 2, small: 3, medium: 4, large: 5, extraLarge: 7 }}
          style={styles.tiles}
          tileRenderer={({ item, key, style }) => <CharacterTile item={item} key={key} style={style} />}
          verticalSpacing={0} />
        <Container style={styles.tabs}>
          <div>
            <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/overview`}>Overview</Link>
            <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/products`}>Products</Link>
            <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/scenes`}>Scenes</Link>
          </div>
          <div>
            <Link activeStyle={styles.season.active} style={styles.season.base} to={`/series/${seriesId}/overview`}>Season 3</Link>
            <Link activeStyle={styles.season.active} style={styles.season.base} to={`/series/${seriesId}/products`}>Season 2</Link>
            <Link activeStyle={styles.season.active} style={styles.season.base} to={`/series/${seriesId}/scenes`}>Season 1</Link>
          </div>
        </Container>
        <div style={styles.smallEpisodes}>
          <FadedTiles
            horizontalSpacing={0.833}
            items={episodes}
            numColumns={{ extraSmall: 2, small: 3, medium: 4, large: 5, extraLarge: 7 }}
            tileRenderer={({ item, key, style }) => (
              <Link to={`/series/${seriesId}/overview`}>
                <SmallEpisodeTile item={item} key={key} selected={key === 0} style={style} />
              </Link>
            )}
            verticalSpacing={0} />
        </div>
      </div>
    );
  }

}

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { fromJS } from 'immutable';
import { colors, fontWeights, makeTextStyle, pinkButtonStyle, Button, ScalableContainer, FadedTiles, SectionTitle, Title, Tiles } from '../../../_common/buildingBlocks';
import CharacterTiles from '../../../_common/tiles/characterTiles';
import SmallEpisodeTile from '../../../_common/tiles/smallEpisodeTile';
const backgroundImage = require('./images/daredevil.jpg');

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
      base: {
        marginBottom: '2.222em'
      },
      unactive: {
        backgroundColor: 'transparent'
      }
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

    const following = true;

    return (
      <div style={styles.background}>
        <div style={styles.overlay} />
        <ScalableContainer style={styles.container}>
          <h4 style={styles.mediaType}>Tv show</h4>
          <Title style={styles.title.large}>Daredevil</Title>
          <SectionTitle style={styles.title.medium}>Followers <span style={styles.emph}>825</span></SectionTitle>
          <Button style={[ pinkButtonStyle, styles.followButton.base, !following && styles.followButton.unactive ]}>Follow</Button>
        </ScalableContainer>
        <FadedTiles>
          <CharacterTiles />
        </FadedTiles>
        <ScalableContainer style={styles.tabs}>
          <div>
            <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/overview`}>Overview</Link>
            <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/products`}>Products</Link>
            <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/season/3`}>Scenes</Link>
          </div>
          <div>
            <Link activeStyle={styles.season.active} style={styles.season.base} to={`/series/${seriesId}/season/3`}>Season 3</Link>
            <Link activeStyle={styles.season.active} style={styles.season.base} to={`/series/${seriesId}/season/2`}>Season 2</Link>
            <Link activeStyle={styles.season.active} style={styles.season.base} to={`/series/${seriesId}/season/1`}>Season 1</Link>
          </div>
        </ScalableContainer>
        <div style={styles.smallEpisodes}>
          <FadedTiles>
            <Tiles
              horizontalSpacing={0.833}
              items={episodes}
              numColumns={{ extraSmall: 2, small: 3, medium: 4, large: 5, extraLarge: 7 }}
              tileRenderer={({ item, key, style }) => (
                <SmallEpisodeTile item={item} key={key} linkTo={`/series/${seriesId}/season/3/episode/${key}/scenes`} style={style} />
              )}
              verticalSpacing={0} />
          </FadedTiles>
        </div>
      </div>
    );
  }

}

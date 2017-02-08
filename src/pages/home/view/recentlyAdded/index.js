import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { colors, fontWeights, makeTextStyle, mediaQueries, pinkButtonStyle, responsiveBackgroundImage, Button, Container, Title, UpperCaseSubtitle } from '../../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TopLevelMediumTiles from '../../../_common/tiles/topLevelMediumTiles';
import localized from '../../../_common/localized';
import { recentlyAddedSelector } from '../../selectors';
import Video from './video';
import Playlist from './playlist';

class SharingHeaders extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired
  }

  render () {
    const { currentLocale, video } = this.props;
    const meta = [
      { property: 'fb:app_id', content: '418487828343937' },
      { property: 'og:description', content: video.description[currentLocale] },
      { property: 'og:image', content: video.poster },
      { property: 'og:site_name', content: 'Spott' },
      { property: 'og:title', content: video.title[currentLocale] },
      { property: 'og:type', content: 'video.movie' },
      { property: 'title', content: video.title[currentLocale] },
      { property: 'twitter:card', content: video.title[currentLocale] },
      { property: 'twitter:description', content: video.description[currentLocale] },
      { property: 'twitter:domain', content: 'https://spott.it' },
      { property: 'twitter:image', content: video.poster },
      { property: 'twitter:site', content: '@SpottBE_nl' },
      { property: 'twitter:title', content: video.title[currentLocale] }
    ];
    return <Helmet meta={meta} />;
  }
}

@localized
@connect(recentlyAddedSelector)
@Radium
export default class RecentlyAdded extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    firstMedium: ImmutablePropTypes.mapContains({
      profileImage: ImmutablePropTypes.mapContains({
        url: PropTypes.string.isRequired
      }).isRequired,
      title: PropTypes.string.isRequired
    }),
    otherRecentlyAddedMedia: PropTypes.any.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired,
    videosById: PropTypes.object.isRequired
  }

  static styles = {
    button: {
      marginBottom: '1.25em',
      [mediaQueries.medium]: {
        marginBottom: '2em'
      }
    },
    wrapper: {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      position: 'relative',
      paddingTop: '3em',
      paddingBottom: 0,
      marginBottom: '4.5em',
      [mediaQueries.medium]: {
        paddingTop: '5.875em'
      }
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
    tilesTitle: {
      color: colors.white
    },
    upperCaseSubtitle: {
      color: colors.white,
      marginBottom: '3.2em'
    },
    tiles: {
      transform: 'translateY(3.8em)'
    },
    innerWrapper: {
      width: '40%',
      position: 'relative',
      fontSize: '12px',
      [mediaQueries.small]: {
        fontSize: '14px'
      },
      [mediaQueries.medium]: {
        fontSize: '16px'
      }
    },
    playlistTitle: {
      color: '#ffffff',
      ...makeTextStyle(fontWeights.light, '1.125em', '0.4px'),
      paddingBottom: 20
    }
  };

  render () {
    const { styles } = this.constructor;
    const { currentLocale, firstMedium, params, playlist, otherRecentlyAddedMedia, style, t, videosById } = this.props;
    const videoId = params && params.trailer || 'trailer-1';
    console.warn('params', params);
    return (
      <div style={[
        styles.wrapper,
        firstMedium && firstMedium.get('profileImage') && responsiveBackgroundImage(firstMedium.getIn([ 'profileImage', 'url' ])),
        style
      ]}>
        <SharingHeaders currentLocale={currentLocale} video={videosById[videoId]}/>
        <Container>
          <div style={styles.overlay} />
          <div style={{ display: 'flex' }}>
            {!__SERVER__ && <Video style={{ flex: '1', marginRight: 20 }} video={videosById[videoId]}/>}
            <div style={styles.innerWrapper}>
              <Title style={styles.title}>{(firstMedium && firstMedium.get('title')) || '\u00A0'}</Title>
              <UpperCaseSubtitle style={styles.upperCaseSubtitle} >{t('home.recentlyAdded.highlight')}</UpperCaseSubtitle>
              <Button disabled={!firstMedium} style={{ ...pinkButtonStyle, ...styles.button }} to={firstMedium && firstMedium.get('shareUrl')}>{t('home.recentlyAdded.browseButton')}</Button>

              <h3 style={styles.playlistTitle}>More Fifty Shades</h3>
              <Playlist playlist={playlist.filter(({ id }) => id !== videoId)}/>
            </div>
          </div>

          <TopLevelMediumTiles items={otherRecentlyAddedMedia}
            style={styles.tiles} title={t('home.recentlyAdded.title')} titleStyle={styles.tilesTitle} />
        </Container>
      </div>
    );
  }

}

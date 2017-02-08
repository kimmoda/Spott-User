import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push as routerPush } from 'react-router-redux';
import { colors, fontWeights, makeTextStyle, Button, pinkButtonStyle, responsiveBackgroundImage, mediaQueries, Title, UpperCaseSubtitle, Container } from '../../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TopLevelMediumTiles from '../../../_common/tiles/topLevelMediumTiles';
import localized from '../../../_common/localized';
import { recentlyAddedSelector } from '../../selectors';
import Video from './video';
import hoverable from '../../../_common/hoverable';

const playSVG = require('./images/play.svg');

@localized
@hoverable
@Radium
class PlaylistItem extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    hovered: PropTypes.bool.isRequired,
    video: PropTypes.object.isRequired,
    onClickPlaylistItem: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  onClick (e) {
    e.preventDefault();
    this.props.onClickPlaylistItem();
  }

  static styles = {
    thumbContainer: {
      position: 'relative',
      marginRight: 15,
      height: 40,
      width: 70
    },
    thumb: {
      borderRadius: 4,
      height: 40,
      width: 70,
      objectFit: 'scale-down'
    },
    play: {
      left: '50%', /* position the left edge of the element at the middle of the parent */
      position: 'absolute',
      top: '50%',  /* position the top  edge of the element at the middle of the parent */
      transform: 'translate(-50%, -50%)'
    },
    overlay: {
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5))',
      borderRadius: 4,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    title: {
      color: '#ffffff',
      ...makeTextStyle(fontWeights.medium, '0.875em', '0.3px'),
      paddingBottom: 3
    },
    duration: {
      color: '#ffffff',
      ...makeTextStyle(fontWeights.regular, '0.75em', '0.3px')
    },
    playlistItem: {
      position: 'relative',
      borderRadius: 4,
      cursor: 'pointer',
      display: 'flex',
      width: '100%',
      padding: 4
    },
    backgroundGradient: {
      base: {
        backgroundImage: 'linear-gradient(to left, rgba(0, 0, 0, 0.0), #000000)',
        borderRadius: 4,
        bottom: 0,
        left: 0,
        opacity: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        transition: 'opacity 0.4s ease-in'
      },
      hovered: {
        opacity: 0.4,
        transition: 'opacity 0.4s ease-out'
      }
    }
  }

  render () {
    const styles = this.constructor.styles;
    const { currentLocale, hovered, video } = this.props;
    return (
      <li key={video.id} style={styles.playlistItem} onClick={this.onClick}>
        <div style={[ styles.backgroundGradient.base, hovered && styles.backgroundGradient.hovered ]}/>
        <div style={styles.thumbContainer}>
          <img alt={video.title[currentLocale]} src={video.thumb} style={styles.thumb} title={video.title[currentLocale]}/>
          <div style={styles.overlay}/>
          <img src={playSVG} style={styles.play} />
        </div>
        <div>
          <h3 style={styles.title}>{video.title[currentLocale]}</h3>
          <div style={styles.duration}>{video.duration}</div>
        </div>
      </li>
    );
  }
}

@localized
@connect(null, (dispatch) => ({
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@Radium
export default class Playlist extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    playlist: PropTypes.array.isRequired,
    routerPush: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  onClickPlaylistItem (video, e) {
    this.props.routerPush(`/${this.props.currentLocale}/fifty-shades-of-grey/${video.id}`);
  }

  static styles = {
  }

  render () {
    const { playlist } = this.props;
    console.warn('playlist', playlist);
    return (
      <ul>
        {playlist.map((video) => <PlaylistItem key={video.id} video={video} onClickPlaylistItem={this.onClickPlaylistItem.bind(this, video)}/>)}
      </ul>
    );
  }
}

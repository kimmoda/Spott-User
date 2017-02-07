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

const playSVG = require('./images/play.svg');

@connect(null, (dispatch) => ({
  routerPush: bindActionCreators(routerPush, dispatch)
}))
@localized
@Radium
export default class Playlist extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    playlist: PropTypes.array.isRequired,
    routerPush: PropTypes.func.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  }

  onClickVideo (video, e) {
    e.preventDefault();
    this.props.routerPush(`/${this.props.currentLocale}/fifty-shades-of-grey/${video.id}`);
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
      borderRadius: 4,
      cursor: 'pointer',
      display: 'flex',
      width: '100%',
      padding: 4
    },
    playlist: {
      height: 150,
      overflowY: 'auto'
    }
  }

  render () {
    const { styles } = this.constructor;
    const { currentLocale, playlist, style, t } = this.props;
    console.warn('playlist', playlist);
    return (
      <ul style={styles.playlist}>
        {playlist.map((video) => (
          <li key={video.id} style={styles.playlistItem} onClick={this.onClickVideo.bind(this, video)}>
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
        ))}
      </ul>
    );
  }

}

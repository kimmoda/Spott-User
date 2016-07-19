import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { colors, Title, UpperCaseSubtitle, Container } from '../../../_common/buildingBlocks';
// import { dummy } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TopLevelMediumTiles from '../../../_common/tiles/topLevelMediumTiles';
import localized from '../../../_common/localized';
import { recentlyAddedSelector } from '../../selectors';
import { loadRecentlyAdded } from '../../actions';

const bigbangImage = require('./images/bigBang.jpg');

@localized
@connect(recentlyAddedSelector, (dispatch) => ({
  loadRecentlyAdded: bindActionCreators(loadRecentlyAdded, dispatch)
}))
@Radium
export default class RecentlyAdded extends Component {

  static propTypes = {
    loadRecentlyAdded: PropTypes.func.isRequired,
    recentlyAddedMedia: ImmutablePropTypes.mapContains({
      _status: PropTypes.string,
      data: PropTypes.list
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.loadRecentlyAdded();
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
      marginBottom: '4.5em'
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
      marginBottom: '2.725em'
    },
    tiles: {
      transform: 'translateY(3.8em)'
    },
    innerWrapper: {
      position: 'relative'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { recentlyAddedMedia, t } = this.props;
    return (
      <div style={{ ...styles.wrapper, backgroundImage: `url("${bigbangImage}")` }}>
        <Container>
          <div style={styles.overlay}></div>
          <div style={styles.innerWrapper}>
            <Title style={styles.title}>The X-files</Title>
            <UpperCaseSubtitle style={styles.upperCaseSubtitle} >{t('home.recentlyAdded.highlight')}</UpperCaseSubtitle>
            {/* TODO: temporarily removed
                <Button style={{ ...pinkButtonStyle, ...styles.button }}>{t('home.recentlyAdded.browseButton')}</Button> */}
          </div>
          <TopLevelMediumTiles items={recentlyAddedMedia.get('data')} style={styles.tiles} title={t('home.recentlyAdded.title')} titleStyle={styles.tilesTitle} />
        </Container>
      </div>
    );
  }

}

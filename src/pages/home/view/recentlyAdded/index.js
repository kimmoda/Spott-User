import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { colors, Button, pinkButtonStyle, mediaQueries, Title, UpperCaseSubtitle, Container } from '../../../_common/buildingBlocks';
// import { dummy } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TopLevelMediumTiles from '../../../_common/tiles/topLevelMediumTiles';
import localized from '../../../_common/localized';
import { recentlyAddedSelector } from '../../selectors';
import { loadRecentlyAdded } from '../../actions';

@localized
@connect(recentlyAddedSelector, (dispatch) => ({
  loadRecentlyAdded: bindActionCreators(loadRecentlyAdded, dispatch)
}))
@Radium
export default class RecentlyAdded extends Component {

  static propTypes = {
    firstMedium: ImmutablePropTypes.mapContains({
      profileImage: ImmutablePropTypes.mapContains({
        url: PropTypes.string.isRequired
      }).isRequired,
      title: PropTypes.string.isRequired
    }),
    loadRecentlyAdded: PropTypes.func.isRequired,
    otherRecentlyAddedMedia: PropTypes.any.isRequired,
    t: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.loadRecentlyAdded();
  }

  static styles = {
    button: {
      marginBottom: '0.75em',
      [mediaQueries.medium]: {
        marginBottom: '1.5em'
      }
    },
    wrapper: {
      backgroundColor: colors.white,
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
      position: 'relative',
      fontSize: '12px',
      [mediaQueries.small]: {
        fontSize: '14px'
      },
      [mediaQueries.medium]: {
        fontSize: '16px'
      }
    }
  };

  render () {
    const { styles } = this.constructor;
    const { firstMedium, otherRecentlyAddedMedia, t } = this.props;
    console.log(this.props);
    return (
      <div style={[ styles.wrapper, firstMedium && firstMedium.get('profileImage') && { backgroundImage: `url("${firstMedium.getIn([ 'profileImage', 'url' ])}")` } ]}>
        <Container>
          <div style={styles.overlay}></div>
          <div style={styles.innerWrapper}>
            <Title style={styles.title}>{(firstMedium && firstMedium.get('title')) || '\u00A0'}</Title>
            <UpperCaseSubtitle style={styles.upperCaseSubtitle} >{t('home.recentlyAdded.highlight')}</UpperCaseSubtitle>
            <Button disabled={!firstMedium} style={{ ...pinkButtonStyle, ...styles.button }} to={firstMedium && firstMedium.get('shareUrl')}>{t('home.recentlyAdded.browseButton')}</Button>
          </div>
          <TopLevelMediumTiles items={otherRecentlyAddedMedia} style={styles.tiles} title={t('home.recentlyAdded.title')} titleStyle={styles.tilesTitle} />
        </Container>
      </div>
    );
  }

}

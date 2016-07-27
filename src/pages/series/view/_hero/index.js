import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors, fontWeights, makeTextStyle, pinkButtonStyle, Button, Container, SectionTitle, Title } from '../../../_common/buildingBlocks';
import CharacterTiles from '../../../_common/tiles/characterTiles';
import { FETCHING, LAZY, LOADED, UPDATING } from '../../../../data/statusTypes';
import Spinner from '../../../_common/spinner';
import { heroSelector } from '../../selector';
import localized from '../../../_common/localized';
import * as actions from '../../actions';

@localized
@connect(heroSelector, (dispatch) => ({
  loadCharacters: bindActionCreators(actions.loadCharacters, dispatch),
  toggleFollow: bindActionCreators(actions.toggleFollow, dispatch)
}))
@Radium
export default class Hero extends Component {

  static propTypes = {
    characters: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    }),
    currentLocale: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loadCharacters: PropTypes.func.isRequired,
    series: ImmutablePropTypes.mapContains({
      _error: PropTypes.object,
      _status: PropTypes.string,
      id: PropTypes.string,
      posterImage: PropTypes.string,
      subscribed: PropTypes.bool,
      subscriberCount: PropTypes.number,
      title: PropTypes.string
    }),
    seriesId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    toggleFollow: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.toggleFollow = ::this.toggleFollow;
  }

  componentWillMount () {
    this.props.loadCharacters(this.props.seriesId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.seriesId !== nextProps.seriesId) {
      this.props.loadCharacters(nextProps.seriesId);
    }
  }

  toggleFollow (e) {
    e.preventDefault();
    this.props.toggleFollow();
  }

  static styles = {
    background: {
      display: 'block',
      backgroundSize: 'cover',
      width: '100%',
      position: 'relative',
      top: 0
    },
    container: {
      paddingTop: '5.222em',
      position: 'relative'
    },
    characters: {
      marginBottom: '1.7em'
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
      backgroundImage: 'linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0))',
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
        backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
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
    },
    smallEpisodeList: {
      overflow: 'visible',
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
      marginTop: 0
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { characters, currentLocale, isAuthenticated, series, seriesId, t, toggleFollow } = this.props;

    if (series.get('_status') === FETCHING || series.get('_status') === LAZY) {
      return (<Spinner />);
    }

    if (series.get('_status') === LOADED || series.get('_status') === UPDATING) {
      return (
        <div style={[ styles.background, { backgroundImage: `url(${series.get('profileImage')})` } ]}>
          <div style={styles.overlay} />
          <Container style={styles.container}>
            <h4 style={styles.mediaType}>Tv show</h4>
            <Title style={styles.title.large}>{series.get('title')}</Title>
            <SectionTitle style={styles.title.medium}>
              {t('medium.followers', { count: series.get('subscriberCount') || 0 }, (contents, key) => {
                return <span key={key} style={styles.emph}>{contents}</span>;
              })}
            </SectionTitle>
            <Button style={[ pinkButtonStyle, styles.followButton.base, !series.get('subscribed') && styles.followButton.unactive, !isAuthenticated && { visibility: 'hidden' } ]} onClick={toggleFollow}>
              {series.get('subscribed') ? t('medium.unfollow') : t('medium.follow')}
            </Button>
          </Container>
          <Container>
            {(characters.get('_status') === FETCHING || characters.get('_status') === LAZY) &&
              <Spinner />}
            {(characters.get('_status') === LOADED || characters.get('_status') === UPDATING) &&
              <CharacterTiles items={characters.get('data')} style={styles.characters} />}
          </Container>
          <Container style={styles.tabs}>
            <div>
              <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/${currentLocale}/series/${seriesId}/overview`}>Overview</Link>
              {/*
              <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/products`}>Products</Link>
              <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`/series/${seriesId}/season/3`}>Scenes</Link>
              */}
            </div>
            {/*
            <div>
              <Link activeStyle={styles.season.active} style={styles.season.base} to={`/series/${seriesId}/season/3`}>Season 3</Link>
              <Link activeStyle={styles.season.active} style={styles.season.base} to={`/series/${seriesId}/season/2`}>Season 2</Link>
              <Link activeStyle={styles.season.active} style={styles.season.base} to={`/series/${seriesId}/season/1`}>Season 1</Link>
            </div>
            */}
          </Container>

          {/*
          <div style={styles.smallEpisodes}>
            <FadedTiles>
              <SmallEpisodeTiles items={fromJS(dummySmallEpisodes)} listStyle={styles.smallEpisodeList} seriesId={seriesId} />
            </FadedTiles>
          </div>
          */}
        </div>
      );
    }
  }

}

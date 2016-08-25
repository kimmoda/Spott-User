import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { colors, fontWeights, load, makeTextStyle, pinkButtonStyle, Button, Container, Message, SectionTitle, Spinner, Title } from '../../_common/buildingBlocks';
import { heroSelector } from '../selector';
import localized from '../../_common/localized';
import * as actions from '../actions';

@localized
@connect(heroSelector, (dispatch) => ({
  toggleFollow: bindActionCreators(actions.toggleFollow, dispatch)
}))
@Radium
export default class Hero extends Component {

  static propTypes = {
    character: ImmutablePropTypes.mapContains({
      _error: PropTypes.object,
      _status: PropTypes.string,
      id: PropTypes.string,
      profileImage: ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }),
      subscribed: PropTypes.bool,
      subscriberCount: PropTypes.number,
      title: PropTypes.string
    }),
    currentLocale: PropTypes.string.isRequired,
    currentPathname: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    toggleFollow: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.toggleFollow = ::this.toggleFollow;
    this.renderCharacter = ::this.renderCharacter;
    this.renderEmpty = ::this.renderEmpty;
  }

  toggleFollow (e) {
    e.preventDefault();
    this.props.toggleFollow();
  }

  static styles = {
    background: {
      display: 'block',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      width: '100%',
      position: 'relative',
      top: 0
    },
    container: {
      paddingTop: '5.222em',
      position: 'relative'
    },
    type: {
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
      backgroundImage: 'linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25), rgb(0, 0, 0))',
      pointerEvents: 'none' // Don't capture pointer events. "Click through..."
    },
    title: {
      large: {
        color: 'white'
      },
      character: {
        color: 'white',
        marginBottom: '0.927em'
      }
    },
    emph: {
      fontFamily: fontWeights.bold
    },
    followButton: {
      base: {
        marginBottom: '7.7em'
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
      textTransform: 'uppercase',
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

  renderEmpty () {
    const { t } = this.props;
    return <Container><Message>{t('character.empty')}</Message></Container>;
  }

  renderCharacter () {
    const styles = this.constructor.styles;
    const { character, currentLocale, currentPathname, isAuthenticated, t, toggleFollow } = this.props;
    console.warn('character', character && character.toJS());

    return (
      <div style={[ styles.background, character.get('image') && { backgroundImage: `url(${character.getIn([ 'image', 'url' ])})` } ]}>
        <div style={styles.overlay} />
        <Container style={styles.container}>
          <h4 style={styles.type}>{t('character.CHARACTER')}</h4>
          <Title style={styles.title.large}>{character.get('name')}</Title>
          <SectionTitle style={styles.title.character}>
            {t('common.followers', { count: character.get('subscriberCount') || 0 }, (contents, key) => (
              <span key={key} style={styles.emph}>{contents}</span>
            ))}
          </SectionTitle>
          {isAuthenticated
            ? <Button style={[ pinkButtonStyle, styles.followButton.base ]} onClick={toggleFollow}>
                {character.get('subscribed') ? t('common.unfollow') : t('common.follow')}
              </Button>
            : <Button style={[ pinkButtonStyle, styles.followButton.base ]} to={{
              pathname: `/${currentLocale}/login`,
              state: { modal: true, returnTo: currentPathname }
            }}>
              {t('common.follow')}
            </Button>}
        </Container>
        <Container style={styles.tabs}>
          <div>
            <Link activeStyle={styles.tab.active} style={styles.tab.base} to={`${character.get('shareUrl')}/products`}>{t('character.products.title')}</Link>
          </div>
        </Container>
      </div>
    );
  }

  render () {
    return load(this.props.character, this.renderCharacter);
  }

}

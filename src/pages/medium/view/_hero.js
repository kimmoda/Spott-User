import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fontWeights, makeTextStyle, pinkButtonStyle, responsiveBackgroundImage, Button, Container, Message, SectionTitle, Spinner, Title } from '../../_common/buildingBlocks';
import CharacterTiles from '../../_common/tiles/characterTiles';
import { FETCHING, LAZY, LOADED, UPDATING } from '../../../data/statusTypes';
import { COMMERCIAL } from '../../../data/mediumTypes';
import { heroSelector } from '../selector';
import localized from '../../_common/localized';
import * as actions from '../actions';

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
    children: PropTypes.node,
    currentLocale: PropTypes.string.isRequired,
    currentPathname: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loadCharacters: PropTypes.func.isRequired,
    medium: ImmutablePropTypes.mapContains({
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
    mediumId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    toggleFollow: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.toggleFollow = ::this.toggleFollow;
  }

  componentWillMount () {
    this.props.loadCharacters(this.props.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.mediumId !== nextProps.mediumId) {
      this.props.loadCharacters(nextProps.mediumId);
    }
  }

  // A user can't follow a commercial.
  toggleFollow (e) {
    e.preventDefault();
    this.props.toggleFollow(this.props.mediumId);
  }

  static styles = {
    background: {
      display: 'block',
      backgroundSize: 'cover',
      backgroundPosition: 'center 25%',
      width: '100%',
      position: 'relative',
      top: 0
    },
    container: {
      paddingTop: '5.222em',
      position: 'relative'
    },
    characters: {
      marginBottom: '1.7em',
      marginTop: '1em'
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
      opacity: 0.8,
      backgroundImage: 'linear-gradient(to bottom, rgba(34, 31, 38, 0.4), rgba(34, 31, 38, 0.25), rgba(34, 31, 38, 0.25), rgba(34, 31, 38, 0.25), rgba(34, 31, 38, 0.25), rgba(34, 31, 38, 0.625), rgb(34, 31, 38))',
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
      }
    },
    tiles: {
      marginBottom: '1.7em'
    },
    noCharacters: {
      paddingTop: '6.5em'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { characters, currentLocale, currentPathname, isAuthenticated, medium, t } = this.props;

    console.warn('HERO', medium.toJS());

    if (medium.get('_status') === FETCHING || medium.get('_status') === LAZY) {
      return (<Spinner />);
    }

    if (medium.get('_status') === LOADED || medium.get('_status') === UPDATING) {
      const showFollowers = medium.get('type') !== COMMERCIAL;
      return (
        <div style={[ styles.background, medium.get('profileImage') && responsiveBackgroundImage(medium.getIn([ 'profileImage', 'url' ])) ]}>
          <div style={styles.overlay} />
          <Container style={styles.container}>
            <h4 style={styles.mediaType}>{t(`medium.${medium.get('type')}`)}</h4>
            <Title style={styles.title.large}>{medium.get('title')}</Title>
            {/* A user can't follow a commercial. */}
            {showFollowers &&
              <div>
                <SectionTitle style={styles.title.medium}>
                  {t('common.followers', { count: medium.get('subscriberCount') || 0 }, (contents, key) => (
                    <span key={key} style={styles.emph}>{contents}</span>
                  ))}
                </SectionTitle>
                {isAuthenticated
                  ? <Button style={[ pinkButtonStyle, styles.followButton.base ]} onClick={this.toggleFollow}>
                      {medium.get('subscribed') ? t('common.unfollow') : t('common.follow')}
                    </Button>
                  : <Button style={[ pinkButtonStyle, styles.followButton.base ]} to={{
                    pathname: `/${currentLocale}/login`,
                    state: { modal: true, returnTo: currentPathname }
                  }}>
                    {t('common.follow')}
                  </Button>}
            </div>}
          </Container>
          <Container>
            <CharacterTiles
              arrowsType='inline'
              items={characters}
              renderEmptyComponent={() => <div style={styles.noCharacters} />}
              renderNotFoundComponent={() => <Message>{t('common.notExist')}</Message>}
              renderUnexpectedComponent={() => <Message>{t('common.unexpected')}</Message>}
              style={styles.characters} />
          </Container>
          {this.props.children}
        </div>
      );
    }
  }

}

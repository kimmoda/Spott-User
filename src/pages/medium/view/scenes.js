import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { load, Message, Container, SectionTitle } from '../../_common/buildingBlocks';
import VerticalTiles from '../../_common/verticalTiles';
import { scenesSelector } from '../selector';
import { loadMediumScenes } from '../actions';
import { SceneTile } from '../../_common/tiles/sceneTiles';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import localized from '../../_common/localized';
import mostSpecificMedium from '../_mostSpecificMedium';
import { MOVIE, SERIES } from '../../../data/mediumTypes';

const styles = {
  content: {
    fontSize: 16,
    marginBottom: '3em', // We contain only tiles with shadow, so we overcompensate a bit for the shadow.
    marginTop: '2.5em'
  },
  title: {
    emph: {
      fontWeight: 'bold'
    }
  }
};

@localized
@connect(scenesSelector, (dispatch) => ({
  loadMediumScenes: bindActionCreators(loadMediumScenes, dispatch)
}))
export default class MediumScenes extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    currentScenesMediumId: PropTypes.string,
    // Depending on the medium type, there is an episode available.
    // Used to render title.
    episode: ImmutablePropTypes.mapContains({
      title: PropTypes.string
    }),
    loadMediumScenes: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    // Depending on the medium type, there is an episode available.
    // Used to render title.
    medium: ImmutablePropTypes.mapContains({
      type: PropTypes.string
    }),
    params: PropTypes.shape({
      episodeId: PropTypes.string,
      mediumId: PropTypes.string.isRequired,
      seasonId: PropTypes.string
    }).isRequired,
    route: PropTypes.shape({
      mediumType: PropTypes.string.isRequired
    }).isRequired,
    scenes: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    }),
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.renderScenes = ::this.renderScenes;
    this.renderEmpty = ::this.renderEmpty;
  }

  componentWillMount () {
    const mediumId = mostSpecificMedium(this.props);
    if (mediumId) {
      this.props.loadMediumScenes(mediumId);
    }
  }

  componentWillReceiveProps (nextProps) {
    const mediumId = mostSpecificMedium(this.props);
    const nextMediumId = mostSpecificMedium(nextProps);
    if (nextMediumId !== undefined && mediumId !== nextMediumId) {
      this.props.loadMediumScenes(nextMediumId);
    }
  }

  renderSceneTitle () {
    const { episode, medium, t } = this.props;

    switch (medium.get('type')) {
      case SERIES:
        return (
          <SectionTitle>
            {t('medium.scenes.sceneFrom', {}, (contents, key) => (
              <span key={key} style={styles.title.emph}>
                {t(episode.get('generatedTitle') ? 'medium.scenes.sceneFromEpisodeShort' : 'medium.scenes.sceneFromEpisode', { episode: episode.get('number'), title: episode.get('title') || '\u00A0' })}
              </span>
            ))}
          </SectionTitle>
        );
      case MOVIE:
        return (
          <SectionTitle>
            {t('medium.scenes.sceneFrom', {}, (contents, key) => (
              <span key={key} style={styles.title.emph}>{medium.get('title') || '\u00A0'}</span>
            ))}
          </SectionTitle>
        );
    }

    return <SectionTitle>{'\u00A0'}</SectionTitle>;
  }

  renderScenes () {
    const { location, scenes } = this.props;
    return (
      <Container style={styles.content}>
        {this.renderSceneTitle()}
        <VerticalTiles
          aspectRatio={0.55994248}
          horizontalSpacing={30}
          items={scenes.get('data')}
          numColumns={{ 0: 1, 480: 2, 768: 3, 992: 4 }}
          tile={<SceneTile location={location} />}
          verticalSpacing={30} />
      </Container>
    );
  }

  renderEmpty () {
    const { t } = this.props;
    return (<Container><Message>{t('medium.scenes.empty')}</Message></Container>);
  }

  render () {
    return load(this.props.scenes, this.renderScenes, null, null, null, this.renderEmpty);
  }
}

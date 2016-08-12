import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { load, Message } from '../../../_common/buildingBlocks';
import VerticalTiles from '../../../_common/verticalTiles';
import { savedScenesOfCurrentUserSelector } from '../../selector';
import { loadSavedScenesOfUser } from '../../actions';
import { SceneTile } from '../../../_common/tiles/sceneTiles';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import localized from '../../../_common/localized';

@localized
@connect(savedScenesOfCurrentUserSelector, (dispatch) => ({
  loadSavedScenesOfUser: bindActionCreators(loadSavedScenesOfUser, dispatch)
}))
export default class Wishlists extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadSavedScenesOfUser: PropTypes.func.isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired
    }).isRequired,
    savedScenes: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    }),
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.renderSavedScenes = ::this.renderSavedScenes;
    this.renderEmpty = ::this.renderEmpty;
  }

  componentWillMount () {
    // (Re)fetch the savedScenes.
    this.props.loadSavedScenesOfUser(this.props.params.userId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.userId !== nextProps.params.userId) {
      this.props.loadSavedScenesOfUser(nextProps.params.userId);
    }
  }

  renderSavedScenes () {
    const { savedScenes } = this.props;
    if (savedScenes.get('data').size > 0) {
      return (
        <VerticalTiles
          aspectRatio={0.55994248}
          horizontalSpacing={30}
          items={savedScenes.get('data')}
          numColumns={{ 0: 1, 480: 2, 768: 3, 992: 4 }}
          tile={<SceneTile />}
          verticalSpacing={30} />
      );
    }
  }

  renderEmpty () {
    const { t } = this.props;
    return (<Message>{t('profile.savedScenes.empty')}</Message>);
  }

  render () {
    console.log(this.props);
    const { savedScenes } = this.props;
    return load(savedScenes, this.renderSavedScenes, null, null, null, this.renderEmpty);
  }
}

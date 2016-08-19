import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { load, Message } from '../../../_common/buildingBlocks';
import VerticalTiles from '../../../_common/verticalTiles';
import { scenesSelector } from '../../selector';
import { loadMediumScenes } from '../../actions';
import { SceneTile } from '../../../_common/tiles/sceneTiles';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import localized from '../../../_common/localized';

@localized
@connect(scenesSelector, (dispatch) => ({
  loadMediumScenes: bindActionCreators(loadMediumScenes, dispatch)
}))
export default class Wishlists extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadMediumScenes: PropTypes.func.isRequired,
    params: PropTypes.shape({
      mediumId: PropTypes.string.isRequired
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
    // (Re)fetch the savedScenes.
    this.props.loadMediumScenes(this.props.params.mediumId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.mediumId !== nextProps.params.mediumId) {
      this.props.loadMediumScenes(nextProps.params.mediumId);
    }
  }

  renderScenes () {
    const { scenes } = this.props;
    return (
      <VerticalTiles
        aspectRatio={0.55994248}
        horizontalSpacing={30}
        items={scenes.get('data')}
        numColumns={{ 0: 1, 480: 2, 768: 3, 992: 4 }}
        tile={<SceneTile />}
        verticalSpacing={30} />
    );
  }

  renderEmpty () {
    const { t } = this.props;
    return (<Message>There are no scenes.</Message>);
  }

  render () {
    return load(this.props.scenes, this.renderScenes, null, null, null, this.renderEmpty);
  }
}

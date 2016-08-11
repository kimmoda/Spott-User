import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';
import { Map } from 'immutable';
import { colors, load, fontWeights, makeTextStyle, mediaQueries, pinkButtonStyle, Button, Container, Money, Spinner } from '../../_common/buildingBlocks';
import ProductTiles from '../../_common/tiles/productTiles';
import * as actions from '../actions';
import FacebookShareData from '../../_common/facebookShareData';
import { productSelector } from '../selector';
import ImmutablePropTypes from 'react-immutable-proptypes';
import localized from '../../_common/localized';
import { LOADED } from '../../../data/statusTypes';

@localized
@connect(productSelector, (dispatch) => ({
  loadScene: bindActionCreators(actions.loadScene, dispatch)
}))
@Radium
export default class Scene extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadScene: PropTypes.func.isRequired,
    params: PropTypes.shape({
      sceneId: PropTypes.string.isRequired
    }).isRequired,
    scene: ImmutablePropTypes.mapContains({
      image: ImmutablePropTypes.mapContains({
        url: PropTypes.string,
        id: PropTypes.string
      }),
      id: PropTypes.string,
      shareUrl: PropTypes.string
    }),
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    // this.share = ::this.share;
    this.renderScene = ::this.renderScene;
    this.renderNotFoundError = ::this.renderNotFoundError;
    this.renderUnexpectedError = ::this.renderUnexpectedError;
  }

  async componentWillMount () {
    // (Re)fetch the scene.
    await this.props.loadScene(this.props.params.sceneId);
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props.params.sceneId !== nextProps.params.sceneId) {
      await this.props.loadScene(nextProps.params.sceneId);
    }
  }

  // share (e) {
  //   e.preventDefault();
  //   window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&title=Discover ${this.props.product.get('shortName')} now on Spott`, 'name', 'width=600,height=400');
  // }

  static styles = {

  }

  renderScene () {
    const { scene } = this.props;
    return (
      <Container>
        {scene.get('image') && <img src={scene.getIn([ 'image', 'url' ])} />}
      </Container>
    );
  }

  renderNotFoundError () {
    const { styles } = this.constructor;
    const { currentLocale, t } = this.props;
    return (
      <Container>
        <p style={styles.emptyText}>{t('productDetail.notExist')} <Link style={styles.return} to={`/${currentLocale}`}>{t('common.return')}</Link></p>
      </Container>
    );
  }

  renderUnexpectedError () {
    return <div></div>;
  }

  render () {
    return load(this.props.scene, this.renderScene, null, this.renderNotFoundError, this.renderUnexpectedError);
  }

}

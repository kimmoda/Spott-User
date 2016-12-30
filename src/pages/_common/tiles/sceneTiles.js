import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { RadiumLink } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import Marker from './_marker';
import localized from '../localized';
import hoverable from '../hoverable';
import makeTiles from './_makeTiles';
import { fetchScene } from '../../../data/actions';
import { COMMERCIAL, MOVIE, SERIES } from '../../../data/mediumTypes';
import { sceneTilesStyle } from './styles';
import ProductImpressionSensor from '../productImpressionSensor';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(undefined, (dispatch) => ({
  fetchScene: bindActionCreators(fetchScene, dispatch)
}))
@localized
@hoverable
@Radium
export class SceneTile extends Component {

  static propTypes = {
    fetchScene: PropTypes.func,
    hovered: PropTypes.bool.isRequired,
    item: ImmutablePropTypes.mapContains({
      id: PropTypes.string.isRequired,
      image: ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
      /* TODO: add ;)
      seriesLogo: PropTypes.string,
      season: PropTypes.number.isRequired,
      episode: PropTypes.number.isRequired,
      faces: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          id: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired
        })
      ),
      products: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          id: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired
        })
      ),
      markers: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          id: PropTypes.string.isRequired,
          relativeLeft: PropTypes.number.isRequired,
          relativeTop: PropTypes.number.isRequired
        })
      )
      */
    }).isRequired,
    // The location to return to if the popup closes.
    location: PropTypes.object,
    showDetails: PropTypes.bool,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.renderDetails = ::this.renderDetails;
    this.onHoverChange = ::this.onHoverChange;
  }

  onHoverChange (hovered) {
    if (this.props.showDetails && hovered && this.props.item.get('_summary')) {
      // Fetch all scene data, including appearances
      this.props.fetchScene({ sceneId: this.props.item.get('id') });
    }
  }

  renderDetails () {
    const styles = sceneTilesStyle;
    const { hovered, item, t } = this.props;

    return (
      <div key='details'>
        {/* Product markers */}
        <div style={[ styles.details.base, hovered && styles.details.hovered ]}>
          {/* Only show the markers for the products which have a position.
              Global products and hidden products don't have a position. */}
          {item.get('products').filter((p) => p.get('position')).map((p) => (
            <Marker key={p.get('id')} relativeLeft={p.getIn([ 'position', 'x' ])} relativeTop={p.getIn([ 'position', 'y' ])} />
          ))}
        </div>
        {/* Characters (top right) */}
        <div style={[ styles.characters, styles.details.base, hovered && styles.details.hovered ]}>
          {item.get('characters').take(4).map((character, i) =>
            <RadiumLink alt={character.get('name')} key={i} title={character.get('name')} to={character.get('shareUrl')}>
              <div style={[ styles.subtile.base, styles.subtile.face ]}>
                <img
                  alt={character.get('name')}
                  key={character.get('id')}
                  src={`${character.getIn([ 'avatarImage', 'url' ])}?height=90&width=90`}
                  style={styles.subtileImage}
                  title={character.get('name')} />
              </div>
            </RadiumLink>)}
        </div>
        {item.get('type') === COMMERCIAL &&
          <p style={[ styles.text.base, hovered && styles.text.hovered ]}>
            {t('_common.sceneTiles.sceneFromCommercial', { commercial: item.getIn([ 'commercial', 'title' ]) }, (contents, key) => {
              return <span key={key} style={styles.textHighlight}>{contents}</span>;
            })}
          </p>}
        {item.get('type') === SERIES &&
          <div>
            <p style={[ styles.text.base, hovered && styles.text.hovered ]}>
              {t('_common.sceneTiles.sceneFromEpisode', { episode: item.getIn([ 'episode', 'number' ]) || 1, season: item.getIn([ 'season', 'number' ]) || 1 }, (contents, key) => {
                return <span key={key} style={styles.textHighlight}>{contents}</span>;
              })}
            </p>
            {<p style={styles.seriesText}>{item.getIn([ 'series', 'title' ])}</p>}
          </div>}
          {item.get('type') === MOVIE &&
            <p style={[ styles.text.base, hovered && styles.text.hovered ]}>
              {t('_common.sceneTiles.sceneFromMovie', { movie: item.getIn([ 'movie', 'title' ]) }, (contents, key) => {
                return <span key={key} style={styles.textHighlight}>{contents}</span>;
              })}
            </p>}
          <div style={[ styles.line.base, hovered && styles.line.hovered ]} />
          <div style={[ styles.products.base, hovered && styles.products.hovered ]}>{item.get('products').take(8).filter((p) => p.get('image')).map((product) =>
            <ProductImpressionSensor active={hovered} key={product.get('id')} productId={product.get('id')}>
              <div key={product.get('id')} style={[ styles.subtile.base, styles.subtile.product ]}>
                <RadiumLink key={product.get('id')} title={product.get('shortName')} to={{
                  pathname: `${item.get('shareUrl')}/product/${product.get('id')}`,
                  state: { modal: true, returnTo: (location && location.pathname) || '/' }
                }}>
                  <img alt={product.get('shortName')} key={product.get('id')} src={`${product.getIn([ 'image', 'url' ])}?height=96&width=96`} style={styles.subtileImage} />
                </RadiumLink>
              </div>
            </ProductImpressionSensor>)}
          </div>
      </div>
    );
  }

  render () {
    const styles = sceneTilesStyle;
    const { item, location, style, showDetails, hovered } = this.props;
    return (
      <BaseTile style={style}>
        <div style={styles.container}>
          {/* Make sure we don't have nested links. */}
          <RadiumLink key={item.get('id')} to={{
            pathname: item.get('shareUrl'),
            state: { modal: true, returnTo: (location && location.pathname) || '/' }
          }}>
            <div style={[ styles.image, item.get('image') && { backgroundImage: `url("${item.getIn([ 'image', 'url' ])}?width=750&height=422")` } ]} />
            {showDetails &&
              <div>
                <div style={[ styles.layer, hovered && styles.layer.hovered ]} />
                <div style={[ styles.layerSecond, hovered && styles.layerSecond.hovered ]} />
              </div>
            }
          </RadiumLink>
          {showDetails && this.renderDetails()}
        </div>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.938,
  { extraSmall: 1, small: 1, medium: 2, large: 2, extraLarge: 2, extraExtraLarge: 2 },
  (instanceProps) => <SceneTile {...instanceProps} />
);

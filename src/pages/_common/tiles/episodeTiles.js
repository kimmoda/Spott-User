/* eslint-disable no-nested-ternary */
import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import { fontWeights, makeTextStyle, mediaQueries, RadiumLink } from '../../_common/buildingBlocks';
import BaseTile from './_baseTile';
import localized from '../localized';
import hoverable from '../hoverable';
import makeTiles from './_makeTiles';
import { sceneTilesStyle } from './styles';
import ProductImpressionSensor from '../productImpressionSensor';

@localized
@hoverable
@Radium
export class EpisodeTile extends Component {

  static propTypes = {
    fetchMediumTopProducts: PropTypes.func.isRequired,
    hovered: PropTypes.bool.isRequired,
    isInSeriesRender: PropTypes.bool,
    item: ImmutablePropTypes.mapContains({
      id: PropTypes.string.isRequired,
      generatedTitle: PropTypes.bool.isRequired,
      profileImage: ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }),
      seriesLogo: PropTypes.string,
      season: ImmutablePropTypes.mapContains({
        number: PropTypes.number.isRequired
      }).isRequired,
      title: PropTypes.string.isRequired
    }).isRequired,
    mediumHasTopProducts: ImmutablePropTypes.map.isRequired,
    products: ImmutablePropTypes.map.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  onHoverChange (hovered) {
    if (hovered && !this.props.mediumHasTopProducts.getIn([ this.props.item.get('id'), 'data' ])) {
      // Fetch all scene data, including appearances
      this.props.fetchMediumTopProducts({ mediumId: this.props.item.get('id'), pageSize: 8 });
    }
  }

  // Style is based on the scene tile.
  static styles = {
    ...sceneTilesStyle,
    contents: {
      base: {
        left: '1.818em',
        position: 'absolute',
        right: '1.818em',
        textAlign: 'center',
        top: '40%',
        transition: 'top 0.5s ease-in'
      },
      hovered: {
        transition: 'top 0.5s ease-out',
        top: '30%'
      }
    },
    seriesLogo: {
      maxWidth: '5.1875em',
      maxHeight: '2em',
      filter: 'brightness(0) invert(1)'
    },
    text: {
      ...makeTextStyle(fontWeights.bold, '0.688em', '0.318em'),
      color: '#ffffff',
      overflow: 'hidden',
      paddingBottom: '0.125em',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      [mediaQueries.large]: {
        bottom: '7.6em'
      }
    },
    seriesText: {
      fontSize: '1em',
      paddingBottom: '0.438em'
    }
  };

  renderDetails () {
    const styles = this.constructor.styles;
    const { hovered, item, mediumHasTopProducts, products, isInSeriesRender } = this.props;
    const episodeProducts = (mediumHasTopProducts.getIn([ item.get('id'), 'data' ]) || List()).map((id) => products.get(id));

    return (
      <div key='details'>
        <div style={[
          styles.line.base,
          hovered && (isInSeriesRender ? styles.line.smallHovered : styles.line.hovered)
        ]} />
        <div style={[
          isInSeriesRender ? styles.products.smallBase : styles.products.base,
          hovered && (isInSeriesRender ? styles.products.smallHovered : styles.products.hovered)
        ]}>
          {episodeProducts.filter((p) => p.get('image')).take(8).map((product) =>
            <ProductImpressionSensor active={hovered} key={product.get('id')} productId={product.get('id')}>
              <div key={product.get('id')} style={[
                isInSeriesRender ? styles.subtile.smallBase : styles.subtile.base,
                isInSeriesRender ? styles.subtile.smallProduct : styles.subtile.product
              ]}>
                <RadiumLink key={product.get('id')} title={product.get('shortName')} to={product.get('shareUrl')}>
                  <img key={product.get('id')} src={`${product.getIn([ 'image', 'url' ])}?height=96&width=96`} style={styles.subtileImage}/>
                </RadiumLink>
              </div>
            </ProductImpressionSensor>
          )}
        </div>
      </div>
    );
  }

  render () {
    const styles = this.constructor.styles;
    const { hovered, item, style, t, isInSeriesRender } = this.props;

    return (
      <BaseTile key={item.get('id')} style={style}>
        <div style={styles.container}>
          {/* Make sure we don't have nested links. */}
          <RadiumLink key={item.get('id')} to={item.get('shareUrl')}>
            <div style={[ styles.image, item.get('profileImage') && { backgroundImage: `url("${item.getIn([ 'profileImage', 'url' ])}?height=422&width=750")` } ]}/>
            <div style={styles.layer}/>
          </RadiumLink>
          <div style={[ styles.contents.base, hovered && styles.contents.hovered ]}>
            {isInSeriesRender
              ? null
              : item.get('seriesLogo')
                ? <img src={item.get('seriesLogo')} style={styles.seriesLogo}/>
                : <p style={[ styles.text, styles.seriesText ]}>{item.getIn([ 'series', 'title' ])}</p>
            }
            <p style={styles.text}>{t('_common.episodeTiles.episode', {
              episode: item.get('number'),
              season: item.getIn([ 'season', 'number' ])
            })}</p>
            {!item.get('generatedTitle') &&
            <p style={isInSeriesRender ? styles.smallSubtext : styles.subtext}>{item.get('title')}</p>}
          </div>
          {this.renderDetails()}
        </div>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.938,
  { extraSmall: 1, small: 1, medium: 2, large: 2, extraLarge: 2, extraExtraLarge: 2 },
  (instanceProps) => <EpisodeTile {...instanceProps} />
);

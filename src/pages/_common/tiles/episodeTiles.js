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

@localized
@hoverable
@Radium
export class EpisodeTile extends Component {

  static propTypes = {
    fetchMediumTopProducts: PropTypes.func.isRequired,
    hovered: PropTypes.bool.isRequired,
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
    if (hovered) {
      // Fetch all scene data, including appearances
      this.props.fetchMediumTopProducts({ mediumId: this.props.item.get('id') });
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
    const { hovered, item, mediumHasTopProducts, products } = this.props;
    const episodeProducts = (mediumHasTopProducts.getIn([ item.get('id'), 'data' ]) || List()).map((id) => products.get(id));

    return (
      <div key='details'>
        <div style={[ styles.line.base, hovered && styles.line.hovered ]} />
        <div style={[ styles.products.base, hovered && styles.products.hovered ]}>{episodeProducts.filter((p) => p.get('image')).take(8).map((product) =>
          <div key={product.get('id')} style={[ styles.subtile.base, styles.subtile.product ]}>
            <RadiumLink key={product.get('id')} title={product.get('shortName')} to={product.get('shareUrl')}>
              <img alt={product.get('shortName')} key={product.get('id')} src={`${product.getIn([ 'image', 'url' ])}?height=96&width=96`} style={styles.subtileImage} />
            </RadiumLink>
          </div>)}
        </div>
      </div>
    );
  }

  render () {
    const styles = this.constructor.styles;
    const { hovered, item, style, t } = this.props;

    return (
      <BaseTile key={item.get('id')} style={style}>
        <div style={styles.container}>
          {/* Make sure we don't have nested links. */}
          <RadiumLink key={item.get('id')} to={item.get('shareUrl')}>
            <div style={[ styles.image, item.get('profileImage') && { backgroundImage: `url("${item.getIn([ 'profileImage', 'url' ])}?height=422&width=750")` } ]} />
            <div style={styles.layer} />
          </RadiumLink>
          <div style={[ styles.contents.base, hovered && styles.contents.hovered ]}>
            {item.get('seriesLogo')
              ? <img src={item.get('seriesLogo')} style={styles.seriesLogo}/>
            : <p style={[ styles.text, styles.seriesText ]}>{item.getIn([ 'series', 'title' ])}</p>}
            <p style={styles.text}>{t('_common.episodeTiles.episode', { episode: item.get('number'), season: item.getIn([ 'season', 'number' ]) })}</p>
            {!item.get('generatedTitle') &&
              <p style={styles.subtext}>{item.get('title')}</p>}
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

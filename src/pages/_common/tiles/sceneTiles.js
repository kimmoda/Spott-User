import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fontWeights, makeTextStyle, mediaQueries, Tiles } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import Marker from './_marker';
import localized from '../localized';
import makeTiles from './_makeTiles';

@localized
@Radium
export class SceneTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
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
    }).isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  static styles = {
    container: {
      position: 'relative',
      paddingTop: '56%',
      height: 0
    },
    layer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
      pointerEvents: 'none' // Don't capture pointer events. "Click through..."
    },
    image: {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '0.25em',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    markers: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    },
    seriesLogo: {
      position: 'absolute',
      maxWidth: '5.1875em',
      maxHeight: '2em',
      filter: 'brightness(0) invert(1)',
      top: '1.125em',
      left: '1.25em'
    },
    text: {
      position: 'absolute',
      bottom: '6.8em',
      left: '1.818em',
      right: '1.818em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...makeTextStyle(fontWeights.regular, '0.6875em', '0.318em'),
      color: '#ffffff',
      textTransform: 'uppercase',
      [mediaQueries.large]: {
        bottom: '7.6em'
      }
    },
    textHighlight: {
      ...makeTextStyle(fontWeights.bold, '1em', '0.318em')
    },
    line: {
      position: 'absolute',
      left: '1.25em',
      right: '1.25em',
      bottom: '4.125em',
      opacity: 0.3,
      backgroundColor: '#ffffff',
      height: '1px',
      [mediaQueries.large]: {
        bottom: '4.625em'
      }
    },
    faces: {
      position: 'absolute',
      left: '1.25em',
      right: '1.25em',
      textAlign: 'right',
      top: '1.125em'
    },
    products: {
      position: 'absolute',
      left: '1.25em',
      right: '1.25em',
      bottom: '1.125em'
    },
    subtile: {
      base: {
        height: '2em',
        position: 'relative',
        display: 'inline-block',
        opacity: 0.98,
        width: '2em',
        [mediaQueries.large]: {
          width: '2.5em',
          height: '2.5em'
        }
      },
      face: {
        marginLeft: '0.4em'
      },
      product: {
        marginRight: '0.4em'
      }
    },
    subtileImage: {
      bottom: 0,
      height: 'auto',
      left: 0,
      margin: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: 'auto',
      transition: 'filter 0.25s ease-in-out',
      ':hover': {
        filter: 'opacity(70%)'
      }
    }
  };

  render () {
    const { styles } = this.constructor;
    const { item, style, t } = this.props;
    return (
      <BaseTile style={style}>
        <div style={styles.container}>
          <div style={[ styles.image, { backgroundImage: `url("${item.get('image')}")` } ]} />
          <div style={styles.layer}></div>
          <div>
            <div>{item.get('markers').map((marker) =>
              <Marker key={marker.get('id')} relativeLeft={marker.get('relativeLeft')} relativeTop={marker.get('relativeTop')} />)}
            </div>
            <div style={styles.faces}>{item.get('faces').take(4).map((face) =>
              <div key={face.get('id')} style={[ styles.subtile.base, styles.subtile.face ]}>
                <img alt={face.get('name')} key={face.get('id')} src={face.get('image')} style={styles.subtileImage} title={face.get('name')}/>
              </div>)}
            </div>
            <div style={styles.line} />
            <div style={styles.products}>{item.get('products').take(8).map((product) =>
              <div key={product.get('id')} style={[ styles.subtile.base, styles.subtile.product ]}>
                <img alt={product.get('name')} key={product.get('id')} src={product.get('image')} style={styles.subtileImage} title={product.get('name')}/>
              </div>)}
            </div>
            <p style={styles.text}>
              {t('_common.sceneTiles.sceneFrom', { episode: item.get('episode'), season: item.get('season') }, (contents, key) => {
                return <span key={key} style={styles.textHighlight}>{contents}</span>;
              })}
            </p>
            {item.get('seriesLogo') && <img src={item.get('seriesLogo')} style={styles.seriesLogo}/>}
          </div>
        </div>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.938,
  { small: 1, medium: 2, large: 2, extraLarge: 2 },
  (instanceProps) => <SceneTile {...instanceProps} />
);

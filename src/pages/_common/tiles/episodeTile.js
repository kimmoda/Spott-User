import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fontWeights, makeTextStyle, mediaQueries } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';

@Radium
export default class SceneTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      seriesLogo: PropTypes.string,
      season: PropTypes.number.isRequired,
      episode: PropTypes.number.isRequired,
      episodeTitle: PropTypes.string.isRequired,
      products: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
          id: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired
        })
      )
    }).isRequired,
    style: PropTypes.object
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

    contents: {
      textAlign: 'center',
      position: 'absolute',
      top: '2.625em',
      left: '1.818em',
      right: '1.818em'
    },
    seriesLogo: {
      maxWidth: '5.1875em',
      maxHeight: '2em',
      filter: 'brightness(0) invert(1)'
    },
    text: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...makeTextStyle(fontWeights.bold, '0.6875em', '0.318em'),
      color: '#ffffff',
      textTransform: 'uppercase',
      [mediaQueries.large]: {
        bottom: '7.6em'
      }
    },
    subtext: {
      color: '#ffffff',
      ...makeTextStyle(fontWeights.regular, '0.6875em', '0.318em'),
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    line: {
      position: 'absolute',
      left: '0.625em',
      right: '0.625em',
      bottom: '2.625em',
      opacity: 0.3,
      backgroundColor: '#ffffff',
      height: '1px'
    },

    products: {
      position: 'absolute',
      left: '0.625em',
      right: '0.625em',
      bottom: '0.625em',
      lineHeight: 0
    },
    subtile: {
      height: '1.5em',
      marginRight: '0.4em',
      position: 'relative',
      display: 'inline-block',
      opacity: 0.98,
      width: '1.5em'
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
      transition: '0.25s ease-in-out',
      ':hover': {
        filter: 'opacity(70%)'
      }
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { item, style } = this.props;
    return (
      <BaseTile style={style}>
        <div style={styles.container}>
          <div style={[ styles.image, { backgroundImage: `url("${item.get('image')}")` } ]} />
          <div style={styles.layer}></div>
          <div>
            <div style={styles.contents}>
              {item.get('seriesLogo') && <img src={item.get('seriesLogo')} style={styles.seriesLogo}/>}
              <p style={styles.text}>Season {item.get('season')} &ndash; Episode {item.get('episodeName')}</p>
              <p style={styles.subtext}>{item.get('episodeTitle')}</p>
            </div>
            <div style={styles.line} />
            <div style={styles.products}>{item.get('products').take(7).map((product) =>
              <div key={product.get('id')} style={styles.subtile}>
                <img alt={product.get('name')} key={product.get('id')} src={product.get('image')} style={styles.subtileImage} title={product.get('name')}/>
              </div>)}
            </div>
          </div>
        </div>
      </BaseTile>
    );
  }
}

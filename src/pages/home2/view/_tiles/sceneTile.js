import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';

@Radium
export default class SceneTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      image: PropTypes.string.isRequired,
      seriesLogo: PropTypes.string
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
    seriesLogo: {
      position: 'absolute',
      maxWidth: '5.1875em',
      maxHeight: '2em',
      filter: 'grayscale(100%) contrast(10%) brightness(200%)',
      top: 0,
      left: 0
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
          {item.get('seriesLogo') && <img src={item.get('seriesLogo')} style={styles.seriesLogo}/>}
        </div>
      </BaseTile>
    );
  }
}

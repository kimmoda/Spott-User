import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import Marker from './_marker';

@Radium
export default class SceneTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.mapContains({
      image: PropTypes.string.isRequired,
      seriesLogo: PropTypes.string,
      seasonName: PropTypes.string.isRequired,
      episodeName: PropTypes.string.isRequired
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
      filter: 'brightness(0) invert(1)',
      top: '1.125em',
      left: '1.25em'
    },
    text: {
      position: 'absolute',
      bottom: '3.695em',
      left: '1.25em',
      ...makeTextStyle(fontWeights.regular, '0.6875em', '0.318em'),
      color: '#ffffff',
      textTransform: 'uppercase'
    },
    textHighlight: {
      ...makeTextStyle(fontWeights.bold, '1em', '0.318em')
    },
    markers: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
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
          <div style={styles.markers}>
            {item.get('markers').map((marker) => <Marker relativeLeft={marker.get('relativeLeft')} relativeTop={marker.get('relativeTop')} />)}
          </div>
          <p style={styles.text}>Scene from <span style={styles.textHighlight}>{item.get('seasonName')}</span> &ndash; <span style={styles.textHighlight}>{item.get('episodeName')}</span></p>
          {item.get('seriesLogo') && <img src={item.get('seriesLogo')} style={styles.seriesLogo}/>}

        </div>
      </BaseTile>
    );
  }
}

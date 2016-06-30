import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { colors, fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import hoverable from '../hoverable';

@hoverable
@Radium
export default class SmallEpisodeTile extends Component {

  static propTypes = {
    hovered: PropTypes.bool.isRequired,
    item: ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequired
    }).isRequired,
    selected: PropTypes.bool,
    style: PropTypes.object
  };

  static styles = {
    container: {
      position: 'relative',
      paddingTop: '60%',
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
    title: {
      base: {
        ...makeTextStyle(fontWeights.bold, '0.54em', '0.219em'),
        color: 'white',
        textTransform: 'uppercase',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        position: 'absolute',
        top: '45%',
        paddingLeft: '1em',
        paddingRight: '1em',
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: 0,
        transition: 'opacity 0.5s ease-in'
      },
      hovered: {
        transition: 'opacity 0.5s ease-out',
        opacity: 1
      }
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
    selected: {
      borderColor: colors.darkPink,
      borderWidth: 2,
      borderRadius: '0.25em',
      borderStyle: 'solid',
      padding: 2
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { hovered, item, selected, style } = this.props;
    return (
      <BaseTile style={style}>
        <div style={[ selected && styles.selected ]}>
          <div style={styles.container}>
            <div
              style={[ styles.image, { backgroundImage: `url("${item.get('image')}")` } ]}
              title={item.get('name')} />
            <div style={styles.layer}></div>
            <div style={[ styles.title.base, hovered && styles.title.hovered ]}>{item.get('name')}</div>
          </div>
        </div>
      </BaseTile>
    );
  }
}

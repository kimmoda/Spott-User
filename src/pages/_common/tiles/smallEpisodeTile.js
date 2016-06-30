import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
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
    linkTo: PropTypes.string,
    style: PropTypes.object
  };

  static styles = {
    container: {
      position: 'relative',
      paddingTop: '60%',
      height: 0
    },
    image: {
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      borderRadius: '0.25em',
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
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
    link: {
      active: {
        borderColor: colors.darkPink
      },
      base: {
        borderColor: 'transparent',
        borderRadius: '0.25em',
        borderStyle: 'solid',
        borderWidth: 2,
        display: 'block',
        padding: 2
      }
    },
    title: {
      base: {
        ...makeTextStyle(fontWeights.bold, '0.54em', '0.219em'),
        color: 'white',
        left: 0,
        opacity: 0,
        overflow: 'hidden',
        paddingLeft: '1em',
        paddingRight: '1em',
        position: 'absolute',
        right: 0,
        textAlign: 'center',
        textOverflow: 'ellipsis',
        textTransform: 'uppercase',
        top: '45%',
        transition: 'opacity 0.5s ease-in',
        whiteSpace: 'nowrap'
      },
      hovered: {
        opacity: 1,
        transition: 'opacity 0.5s ease-out'
      }
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { hovered, item, linkTo, style } = this.props;

    const children = (
      <div style={styles.container}>
        <div
          style={[ styles.image, { backgroundImage: `url("${item.get('image')}")` } ]}
          title={item.get('name')} />
        <div style={styles.layer} />
        <div style={[ styles.title.base, hovered && styles.title.hovered ]}>{item.get('name')}</div>
      </div>
    );
    return (
      <BaseTile style={style}>
        {linkTo
          ? <Link activeStyle={styles.link.active} style={styles.link.base} to={linkTo}>{children}</Link>
          : children}
      </BaseTile>
    );
  }
}

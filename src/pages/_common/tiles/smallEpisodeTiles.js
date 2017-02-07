import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { colors, fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
// import { formatEpisodeNumber } from '../../../utils';
import BaseTile from './_baseTile';
import hoverable from '../hoverable';
import makeTiles from './_makeTiles';

@hoverable
@Radium
export class SmallEpisodeTile extends Component {

  static propTypes = {
    hovered: PropTypes.bool.isRequired,
    item: ImmutablePropTypes.mapContains({
      title: PropTypes.string.isRequired,
      shareUrl: PropTypes.string.isRequired,
      profileImage: ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    }).isRequired,
    style: PropTypes.object
  };

  static styles = {
    container: {
      position: 'relative',
      paddingTop: '60%',
      height: 0
    },
    image: {
      backgroundColor: colors.dark,
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
      pointerEvents: 'none', // Don't capture pointer events. "Click through...",
      opacity: 0,
      transition: 'opacity 0.5s ease-in',
      hovered: {
        transition: 'opacity 0.5s ease-out',
        opacity: 1
      }
    },
    title: {
      base: {
        ...makeTextStyle(fontWeights.bold, '0.688em', '0.219em'),
        color: 'white',
        textTransform: 'uppercase',
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: 0,
        right: 0,
        padding: '1em 1.25em',
        overflow: 'hidden',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        opacity: 0,
        transition: 'opacity 0.5s ease-in',
        zIndex: 1
      },
      hovered: {
        transition: 'opacity 0.5s ease-out',
        opacity: 1
      }
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
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { hovered, item, style } = this.props;

    const children = (
      <div style={styles.container}>
        <div
          style={[ styles.image, item.get('profileImage') && { backgroundImage: `url("${item.getIn([ 'profileImage', 'url' ])}")` } ]} />
          <span style={[ styles.title.base, hovered && styles.title.hovered ]}>{item.get('title')}</span>
          <div style={[ styles.layer, hovered && styles.layer.hovered ]} />
      </div>
    );
    return (
      <BaseTile innerStyle={{ backgroundColor: 'transparent' }} style={style}>
        <Link activeStyle={styles.link.active} style={styles.link.base} title={item.get('title')} to={item.get('shareUrl')} >{children}</Link>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.938,
  { extraSmall: 3, small: 4, medium: 5, large: 5, extraLarge: 6, extraExtraLarge: 8 },
  (instanceProps) => <SmallEpisodeTile {...instanceProps} />
);

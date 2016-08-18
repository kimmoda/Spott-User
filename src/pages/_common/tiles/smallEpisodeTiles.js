import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { colors } from '../../_common/buildingBlocks';
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
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { item, style } = this.props;

    const children = (
      <div style={styles.container}>
        <div
          style={[ styles.image, item.get('profileImage') && { backgroundImage: `url("${item.getIn([ 'profileImage', 'url' ])}")` } ]}
          title={item.get('title')} />
        <div style={styles.layer} />
      </div>
    );
    return (
      <BaseTile style={style}>
        <Link activeStyle={styles.link.active} style={styles.link.base} to={item.get('shareUrl')}>{children}</Link>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.938,
  { extraSmall: 4, small: 5, medium: 6, large: 7, extraLarge: 9 },
  (instanceProps) => <SmallEpisodeTile {...instanceProps} />
);

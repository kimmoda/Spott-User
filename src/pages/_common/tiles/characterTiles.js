import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { fontWeights, makeTextStyle, RadiumLink } from '../buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import hoverable from '../hoverable';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';

@hoverable
@Radium
export class CharacterTile extends Component {

  static propTypes = {
    hovered: PropTypes.bool.isRequired,
    item: ImmutablePropTypes.mapContains({
      avatarImage: ImmutablePropTypes.mapContains({
        url: PropTypes.string.isRequired
      }),
      name: PropTypes.string
    }).isRequired,
    style: PropTypes.object
  };

  // We suppose the data won't change often, so if the status and id is the same,
  // we don't trigger a rerender.
  shouldComponentUpdate (nextProps) {
    const { hovered, item } = this.props;
    // NOTE: we ignore style prop right now, because it remains unchanged.
    return item.get('_status') !== nextProps.item.get('_status') ||
      item.get('id') !== nextProps.item.get('id') ||
      hovered !== nextProps.hovered;
  }

  static styles = {
    container: {
      position: 'relative',
      paddingTop: '100%',
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
        position: 'absolute',
        bottom: '1.24em',
        left: '1.25em',
        right: '1.25em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
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
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { hovered, item, style } = this.props;

    return (
      <BaseTile style={style}>
        <RadiumLink alt={item.get('name')} key={item.get('id')} title={item.get('name')} to={item.get('shareUrl')}>
          <div style={styles.container}>
            <div
              style={[ styles.image, item.get('avatarImage') && { backgroundImage: `url("${item.getIn([ 'avatarImage', 'url' ])}?height=250&width=250")` } ]}
              title={item.get('name')} />
            <div style={styles.layer} />
            <span style={[ styles.title.base, hovered && styles.title.hovered ]}>{item.get('name')}</span>
          </div>
        </RadiumLink>
      </BaseTile>
    );
  }
}

export default makeTiles(
  0.833,
  { extraSmall: 2, small: 3, medium: 4, large: 5, extraLarge: 7, extraExtraLarge: 8 },
  (instanceProps) => <CharacterTile {...instanceProps} />
);

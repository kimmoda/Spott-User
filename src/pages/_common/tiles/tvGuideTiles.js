import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { colors, fontWeights, makeTextStyle } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';

const channelImage = require('../../../api/mock/channels/vtm.png');

@Radium
export class TvGuideTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.map.isRequired,
    style: PropTypes.object
  };

  static styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    detailsContainer: {
      padding: '0.8em 0.9em'
    },
    name: {
      ...makeTextStyle(fontWeights.regular, '0.875em'),
      color: colors.slateGray,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    price: {
      ...makeTextStyle(fontWeights.regular, '0.875em')
    },
    posterImage: {
      bottom: 0,
      height: 'auto',
      left: 0,
      margin: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: 'auto'
    },
    channelImage: {
      marginTop: '0.7em',
      height: '4em',
      width: '4em'
    },
    imageContainer: {
      height: 0,
      paddingTop: '147%',
      position: 'relative',
      width: '100%'
    },
    title: {
      ...makeTextStyle(fontWeights.medium, '1em', '0.03em'),
      color: colors.cool
    },
    hour: {
      ...makeTextStyle(fontWeights.regular, '0.8em'),
      color: colors.coolGray,
      marginTop: '2px'
    }
  };

  render () {
    const styles = this.constructor.styles;
    const { item, style } = this.props;

    return (
      <div style={style}>
        <BaseTile>
          <div>
            <div style={[ styles.imageContainer ]}>
              <img src={item.getIn([ 'posterImage', 'url' ])} style={styles.posterImage} />
            </div>
          </div>
        </BaseTile>
        <div style={styles.container}>
          <img src={channelImage} style={styles.channelImage} />
          <p style={styles.title}>Tonight</p>
          <p style={styles.hour}>19.30h</p>
        </div>
      </div>

    );
  }
}

export default makeTiles(
  0.938,
  { small: 4, medium: 5, large: 6, extraLarge: 7 },
  (instanceProps) => <TvGuideTile {...instanceProps} />
);

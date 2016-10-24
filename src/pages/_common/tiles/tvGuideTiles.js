import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { colors, fontWeights, makeTextStyle, RadiumLink } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';
import moment from 'moment';
import localized from '../../_common/localized';

const channelImage = require('../../../api/mock/channels/vtm.png');

@localized
@Radium
export class TvGuideTile extends Component {

  static propTypes = {
    item: ImmutablePropTypes.map.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
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
      height: '100%',
      left: 0,
      objectFit: 'cover',
      margin: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: '100%'
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
    const { item, style, t } = this.props;
    const start = item.get('start');
    const day = moment(start);
    const today = moment();
    const tomorrow = moment().add(1, 'days');
    const time = moment(start).format('HH:mm');
    let title = day.format('dddd');
    if (day.format('DD/MM/YYYY') === today.format('DD/MM/YYYY')) {
      title = 'Today';
    } else if (day.format('DD/MM/YYYY') === tomorrow.format('DD/MM/YYYY')) {
      title = 'Tomorrow';
    }
    return (
      <div style={style}>
        <BaseTile>
          <RadiumLink to={item.getIn([ 'medium', 'shareUrl' ])}>
            <div style={styles.imageContainer}>
              <img src={item.getIn([ 'medium', 'posterImage', 'url' ])} style={styles.posterImage} />
            </div>
          </RadiumLink>
        </BaseTile>
        <div style={styles.container}>
          <img src={channelImage} style={styles.channelImage} />
          <p style={styles.title}>{t(`_common.tvGuideTiles.${title.toLowerCase()}`)}</p>
          <p style={styles.hour}>{time}{t('_common.tvGuideTiles.h')}</p>
        </div>
      </div>

    );
  }
}

export default makeTiles(
  0.938,
  { extraSmall: 3, small: 4, medium: 5, large: 6, extraLarge: 7 },
  (instanceProps) => <TvGuideTile {...instanceProps} />
);

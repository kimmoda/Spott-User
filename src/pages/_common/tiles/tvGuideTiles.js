import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { colors, fontWeights, makeTextStyle, RadiumLink } from '../../_common/buildingBlocks';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseTile from './_baseTile';
import makeTiles from './_makeTiles';
import moment from 'moment';
import localized from '../../_common/localized';

@localized
@Radium
export class TvGuideTile extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    item: ImmutablePropTypes.map.isRequired,
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.getTitle = ::this.getTitle;
  }

  getTitle () {
    const { currentLocale, item, t } = this.props;

    // Set the locale used by moment.
    moment.locale(currentLocale);

    const now = moment();
    const tomorrow = moment().add(1, 'days');
    const start = moment(item.get('start'));
    const end = moment(item.get('end'));

    // Is currently on tv?
    if (now.isBetween(start, end)) {
      return t('_common.tvGuideTiles.now');
    }
    // Later today on tv?
    if (now.format('DD/MM/YYYY') === start.format('DD/MM/YYYY')) {
      return t('_common.tvGuideTiles.today');
    }
    // Tomorrow on tv?
    if (tomorrow.format('DD/MM/YYYY') === start.format('DD/MM/YYYY')) {
      return t('_common.tvGuideTiles.tomorrow');
    }

    // After tomorrow on tv.
    // Return title starting with a capital.
    const title = start.format('dddd D MMM');
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

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
    channelImageContainer: {
      marginTop: '0.7em',
      height: '4em',
      position: 'relative',
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
    const time = moment(item.get('start')).format('HH:mm');

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
          <div style={styles.channelImageContainer}>
            {item.getIn([ 'channel', 'logo' ]) &&
              <img src={item.getIn([ 'channel', 'logo', 'url' ])} style={styles.channelImage} title={item.getIn([ 'channel', 'name' ])} />}
          </div>
          <p style={styles.title}>{this.getTitle()}</p>
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

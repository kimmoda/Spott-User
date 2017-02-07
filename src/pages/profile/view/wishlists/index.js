/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, fontWeights, makeTextStyle, load, Message, RadiumLink } from '../../../_common/buildingBlocks';
import VerticalTiles from '../../../_common/verticalTiles';
import { wishlistsOfCurrentUserSelector } from '../../selector';
import { loadWishlistsOfUser } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { slugify } from '../../../../utils';
import { bindActionCreators } from 'redux';
import localized from '../../../_common/localized';
import BaseTile from '../../../_common/tiles/_baseTile';
import hoverable from '../../../_common/hoverable';
import WishlistSettings from '../wishlistSettings';

const placeholderLargeImage = require('./placeholderLarge.png');
const iconSettings = require('../images/iconSettings.svg');

const itemStyles = {
  container: {
    backgroundColor: colors.white,
    display: 'block',
    paddingBottom: '0.5em',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    textDecoration: 'none'
  },
  name: {
    ...makeTextStyle(fontWeights.medium, '0.875em', '0.01875em'),
    color: colors.cool,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingTop: '0.7em',
    paddingBottom: '0.7em',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    display: 'flex',
    height: '21px',
    boxSizing: 'content-box'
  },
  image: {
    width: '100%',
    paddingBottom: '100%',
    borderRadius: '0.125em',
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid rgba(34, 31, 38, 0.05)'
  },
  iconSettings: {
    marginLeft: 'auto'
  }
};

@localized
@hoverable
class Wishlist extends Component {
  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    hovered: PropTypes.bool.isRequired,
    item: ImmutablePropTypes.mapContains({
      fixed: PropTypes.bool.isRequired,
      image: ImmutablePropTypes.mapContains({
        url: PropTypes.string.isRequired
      }),
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      publicWishlist: PropTypes.bool.isRequired
    }),
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.onModalClose = ::this.onModalClose;
    this.onSettingsClick = ::this.onSettingsClick;
    this.state = {
      isSettingsOpened: false
    };
  }

  onModalClose () {
    this.setState({ isSettingsOpened: false });
  }

  onSettingsClick (e) {
    e.preventDefault();
    this.setState({ isSettingsOpened: true });
  }

  render () {
    const { baseUrl, item, style, t, hovered } = this.props;
    return (
      <BaseTile style={style}>
        <RadiumLink style={itemStyles.container} title={item.get('name') || t('profile.wishlists.unnamedWishlist')} to={`${baseUrl}/${slugify(item.get('name')) || 'wishlist'}/${item.get('id')}`}>
          <div style={itemStyles.name}>
            <span>{item.get('name') || t('profile.wishlists.unnamedWishlist')}</span>
            {item.get('name') && hovered && <div style={itemStyles.iconSettings} title={t('profile.wishlists.editWishlist')} onClick={this.onSettingsClick}><img src={iconSettings}/></div>}
          </div>
          <div style={{ ...itemStyles.image, backgroundImage: `url(${item.hasIn([ 'image', 'url' ]) ? item.getIn([ 'image', 'url' ]) : placeholderLargeImage })` }} />
        </RadiumLink>
        {item.get('name') && this.state.isSettingsOpened && <WishlistSettings wishlist={item} onClose={this.onModalClose} />}
      </BaseTile>
    );
  }
}

@localized
@connect(wishlistsOfCurrentUserSelector, (dispatch) => ({
  loadWishlistsOfUser: bindActionCreators(loadWishlistsOfUser, dispatch)
}))
export default class Wishlists extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    loadWishlistsOfUser: PropTypes.func.isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userSlug: PropTypes.string.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired,
    wishlists: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    })
  };

  constructor (props) {
    super(props);
    this.renderWishlists = ::this.renderWishlists;
  }

  componentWillMount () {
    // (Re)fetch the wishlists.
    this.props.loadWishlistsOfUser(this.props.params.userId);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.userId !== nextProps.params.userId) {
      this.props.loadWishlistsOfUser(nextProps.params.userId);
    }
  }

  renderWishlists () {
    const { currentLocale, params: { userId, userSlug }, wishlists } = this.props;
    if (wishlists.get('data').size > 0) {
      return (
        <VerticalTiles
          aspectRatio={1.1333866}
          horizontalSpacing={30}
          items={wishlists.get('data')}
          numColumns={{ extraSmall: 1, small: 2, medium: 4, large: 4, extraLarge: 5, extraExtraLarge: 6 }}
          tile={<Wishlist baseUrl={`/${currentLocale}/profile/${userSlug}/${userId}/wishlists`}/>}
          verticalSpacing={30} />
      );
    }
  }

  renderEmpty () {
    const { t } = this.props;
    return <Message>{t('profile.wishlists.empty')}</Message>;
  }

  render () {
    const { wishlists } = this.props;
    return load(wishlists, this.renderWishlists, null, null, null, this.renderEmpty);
  }
}

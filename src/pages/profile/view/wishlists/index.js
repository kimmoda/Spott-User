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

const placeholderLargeImage = require('./placeholderLarge.png');

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
    paddingLeft: '0.5em'
  },
  image: {
    width: '100%',
    paddingBottom: '100%',
    borderRadius: '0.125em',
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid rgba(34, 31, 38, 0.05)'
  }
};
@localized
class Wishlist extends Component {
  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    item: ImmutablePropTypes.mapContains({
      fixed: PropTypes.bool.isRequired,
      image: ImmutablePropTypes.mapContains({
        url: PropTypes.string.isRequired
      }),
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    }),
    style: PropTypes.object,
    t: PropTypes.func.isRequired
  }

  render () {
    const { baseUrl, item, style, t } = this.props;
    return (
      <BaseTile style={style}>
        <RadiumLink style={itemStyles.container} title={item.get('name') || t('profile.wishlists.unnamedWishlist')} to={`${baseUrl}/${slugify(item.get('name')) || 'wishlist'}/${item.get('id')}`}>
          <p style={itemStyles.name}>{item.get('name') || t('profile.wishlists.unnamedWishlist')}</p>
          <div style={{ ...itemStyles.image, backgroundImage: `url(${item.hasIn([ 'image', 'url' ]) ? item.getIn([ 'image', 'url' ]) : placeholderLargeImage })` }} />
        </RadiumLink>
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
          numColumns={{ 0: 1, 480: 2, 768: 3, 992: 4 }}
          tile={<Wishlist baseUrl={`/${currentLocale}/profile/${userSlug}/${userId}/wishlists`} />}
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

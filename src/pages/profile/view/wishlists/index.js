import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors, fontWeights, makeTextStyle } from '../../../_common/buildingBlocks';
import Tiles from '../../../_common/tiles';
import { wishlistsOfCurrentUserSelector } from '../../selector';
import { fetchWishlistsOfUser } from '../../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { slugify } from '../../../../utils';
import { FETCHING, LOADED, UPDATING } from '../../../../statusTypes';
import Spinner from '../../../_common/spinner';

const RadiumLink = Radium(Link);

const placeholderLargeImage = require('./placeholderLarge.png');

const itemStyles = {
  container: {
    border: `1px solid ${colors.whiteThree}`,
    backgroundColor: colors.white,
    display: 'block',
    padding: '1.25em',
    textDecoration: 'none',
    ':hover': {
      filter: 'brightness(1.05)'
    }
  },
  name: {
    ...makeTextStyle(fontWeights.medium, '0.875em'),
    color: colors.slateGray,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  image: {
    marginTop: '1.25em',
    width: '100%',
    paddingBottom: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
};
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
    style: PropTypes.object
  }

  render () {
    const { baseUrl, item, style } = this.props;
    return (
      <div style={style}>
        <RadiumLink style={itemStyles.container} title={item.get('name') || 'Wishlist'} to={`${baseUrl}/${slugify(item.get('name')) || 'wishlist'}/${item.get('id')}`}>
          <p style={itemStyles.name}>{item.get('name') || 'Wishlist'}</p>
          <div style={{ ...itemStyles.image, backgroundImage: `url(${item.get('image') === null ? placeholderLargeImage : item.getIn([ 'image', 'url' ]) })` }}></div>
        </RadiumLink>
      </div>
    );
  }
}

const styles = {
  emptyText: {
    ...makeTextStyle(fontWeights.medium, '0.875em'),
    color: colors.slateGray
  }
};
@connect(wishlistsOfCurrentUserSelector)
export default class Wishlists extends Component {
  static propTypes = {
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userSlug: PropTypes.string.isRequired
    }).isRequired,
    wishlists: ImmutablePropTypes.mapContains({
      _status: PropTypes.string.isRequired,
      data: ImmutablePropTypes.list
    })
  };

  static needs (props, store) {
    // (Re)fetch the profile.
    return store.dispatch(fetchWishlistsOfUser(props.params.userId));
  }

  render () {
    const { params: { userId, userSlug }, wishlists } = this.props;
    if (wishlists.get('_status') === FETCHING) {
      return (<Spinner />);
    } else if (wishlists.get('_status') === LOADED || wishlists.get('_status') === UPDATING) {
      if (wishlists.get('data').size > 0) {
        return (<Tiles horizontalSpacing={10} items={wishlists.get('data')} numColumns={{ 0: 1, 480: 2, 768: 3, 992: 4 }} tile={<Wishlist baseUrl={`/profile/${userSlug}/${userId}/wishlists`} />} verticalSpacing={60} />);
      }
      return (<p style={styles.emptyText}>You have no wishlists yet.</p>);
    }
    return (<div></div>);
  }
}
